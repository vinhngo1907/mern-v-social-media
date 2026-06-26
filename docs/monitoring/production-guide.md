# Production Monitoring Guide for Multiple Instances

This guide explains how to set up monitoring for production deployments with multiple instances of the Murror API service.

## Overview

When deploying multiple instances in production (e.g., Kubernetes pods, ECS tasks, or multiple VMs), you need:

1. Instance identification in metrics
2. Proper metric aggregation
3. Service discovery for Prometheus
4. Load balancer aware monitoring

## 1. Instance Identification

The monitoring module automatically adds instance labels to all metrics:

- `instance`: Unique identifier for each instance (defaults to hostname)
- `pod`: Pod name in Kubernetes deployments
- `namespace`: Kubernetes namespace
- `app`: Application name (server-api)

### Environment Variables

Set these environment variables on each instance:

```bash
# For Kubernetes deployments
INSTANCE_ID=$POD_NAME
POD_NAME=$POD_NAME
NAMESPACE=$NAMESPACE

# For ECS/Docker deployments
INSTANCE_ID=$(hostname)
HOSTNAME=$(hostname)

# For VM deployments
INSTANCE_ID="server-api-prod-1"
```

### Kubernetes Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: server-api
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: server-api
          env:
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: INSTANCE_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
```

## 2. Prometheus Configuration

### Service Discovery

For Kubernetes, use the Prometheus Operator or configure service discovery:

```yaml
# prometheus.yaml
scrape_configs:
  - job_name: 'server-api'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
            - production
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        action: keep
        regex: server-api
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: pod
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: namespace
```

### Static Configuration (for VMs)

```yaml
scrape_configs:
  - job_name: 'server-api'
    static_configs:
      - targets:
          - 'server-api-1.example.com:3000'
          - 'server-api-2.example.com:3000'
          - 'server-api-3.example.com:3000'
    relabel_configs:
      - source_labels: [__address__]
        regex: '([^:]+):\d+'
        target_label: instance
        replacement: '${1}'
```

## 3. Grafana Dashboard Updates

Update your Grafana queries to handle multiple instances:

### Request Rate (Aggregated across all instances)

```promql
sum(rate(http_requests_total{app="server-api"}[5m])) by (method, route, status_code)
```

### Request Rate (Per instance)

```promql
sum(rate(http_requests_total{app="server-api"}[5m])) by (instance, method, route, status_code)
```

### P95 Latency (Aggregated)

```promql
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket{app="server-api"}[5m])) by (le, method, route)
)
```

### Database Query Performance (Per instance)

```promql
histogram_quantile(0.95,
  sum(rate(database_query_duration_seconds_bucket{app="server-api"}[5m])) by (le, operation, table, instance)
)
```

### Active Connections (Total)

```promql
sum(active_connections{app="server-api"})
```

### Active Connections (Per instance)

```promql
active_connections{app="server-api"}
```

## 4. Load Balancer Considerations

### Health Check Endpoint

Ensure your load balancer health checks don't skew metrics:

```typescript
// In your health controller
@Get('health')
@Public()
async health() {
  // This endpoint is excluded from metrics by default
  return { status: 'ok' };
}
```

### X-Forwarded Headers

Configure your application to trust proxy headers:

```typescript
// main.ts
app.set('trust proxy', true);
```

## 5. Alerting Rules

Create alerts that consider multiple instances:

```yaml
# prometheus-rules.yaml
groups:
  - name: server-api
    rules:
      # Alert if more than 50% of instances are down
      - alert: MurrorAPIInstancesDown
        expr: |
          (
            count(up{app="server-api"} == 0)
            /
            count(up{app="server-api"})
          ) > 0.5
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: 'More than 50% of Murror API instances are down'

      # Alert on high error rate across all instances
      - alert: MurrorAPIHighErrorRate
        expr: |
          (
            sum(rate(http_requests_total{app="server-api",status_code=~"5.."}[5m]))
            /
            sum(rate(http_requests_total{app="server-api"}[5m]))
          ) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: 'High error rate detected (>5%)'

      # Alert on instance-specific issues
      - alert: MurrorAPIInstanceHighLatency
        expr: |
          histogram_quantile(0.95,
            rate(http_request_duration_seconds_bucket{app="server-api"}[5m])
          ) > 2
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: 'Instance {{ $labels.instance }} has high latency'
```

## 6. Dashboard Variables

Add these variables to your Grafana dashboard for better filtering:

```
# Instance selector
Variable: instance
Query: label_values(http_requests_total{app="server-api"}, instance)
Multi-value: true
Include All option: true

# Namespace selector (for Kubernetes)
Variable: namespace
Query: label_values(http_requests_total{app="server-api"}, namespace)
Multi-value: false

# Time range selector
Variable: time_range
Options: 5m, 15m, 30m, 1h, 3h, 6h, 12h, 24h
```

## 7. Best Practices

### 1. Use Consistent Labels

Always include these labels in your queries:

- `app="server-api"` - to filter only your application
- `namespace="$namespace"` - for environment separation
- `instance=~"$instance"` - for instance filtering

### 2. Aggregate Metrics Properly

- Use `sum()` for counters and gauges
- Use `histogram_quantile()` for histograms
- Always specify `by()` clauses to control aggregation

### 3. Monitor Both Individual and Aggregate Metrics

Create dashboard rows for:

- **Overview**: Aggregated metrics across all instances
- **Per Instance**: Individual instance performance
- **Comparison**: Side-by-side instance comparison

### 4. Set Up Recording Rules

For frequently used queries, create recording rules:

```yaml
# prometheus-recording-rules.yaml
groups:
  - name: murror_api_recording
    interval: 30s
    rules:
      - record: instance:http_requests:rate5m
        expr: |
          sum(rate(http_requests_total{app="server-api"}[5m])) by (instance)

      - record: route:http_request_duration:p95_5m
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket{app="server-api"}[5m])) by (le, route)
          )
```

### 5. Handle Instance Churn

For auto-scaling environments:

- Use shorter scrape intervals (15-30s)
- Configure proper service discovery
- Use `increase()` instead of `rate()` for short-lived instances

## 8. Debugging Multi-Instance Issues

### Check Instance Registration

```promql
# See all registered instances
up{app="server-api"}

# Count active instances
count(up{app="server-api"} == 1)
```

### Compare Instance Performance

```promql
# Compare request rates
sum(rate(http_requests_total{app="server-api"}[5m])) by (instance)

# Compare error rates
sum(rate(http_requests_total{app="server-api",status_code=~"5.."}[5m])) by (instance)

# Compare P95 latencies
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket{app="server-api"}[5m])) by (le, instance)
)
```

### Identify Problematic Instances

```promql
# Instances with high error rates
topk(3,
  sum(rate(http_requests_total{app="server-api",status_code=~"5.."}[5m])) by (instance)
)

# Instances with high latency
topk(3,
  histogram_quantile(0.95,
    sum(rate(http_request_duration_seconds_bucket{app="server-api"}[5m])) by (le, instance)
  )
)
```

## 9. Kubernetes-Specific Setup

### Service Monitor (for Prometheus Operator)

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: server-api
  namespace: production
spec:
  selector:
    matchLabels:
      app: server-api
  endpoints:
    - port: metrics
      path: /api/metrics
      interval: 30s
      scrapeTimeout: 10s
```

### Pod Annotations

```yaml
apiVersion: v1
kind: Service
metadata:
  name: server-api
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '3000'
    prometheus.io/path: '/api/metrics'
```

## 10. Monitoring Checklist

Before going to production, ensure:

- [ ] Instance identification is working (check `instance` label in metrics)
- [ ] Prometheus can discover all instances
- [ ] Grafana dashboards show both aggregate and per-instance views
- [ ] Alerts are configured for multi-instance scenarios
- [ ] Recording rules are set up for common queries
- [ ] Load balancer health checks are excluded from metrics
- [ ] Service discovery is tested with instance scaling
- [ ] Dashboards have proper instance filtering variables
- [ ] High cardinality labels are avoided
- [ ] Metrics retention is configured appropriately

## Example Queries for Common Scenarios

### 1. Find Unbalanced Load

```promql
# Coefficient of variation for request distribution
stddev(sum(rate(http_requests_total{app="server-api"}[5m])) by (instance))
/
avg(sum(rate(http_requests_total{app="server-api"}[5m])) by (instance))
```

### 2. Rolling Deployment Monitoring

```promql
# New vs old instance comparison during deployment
sum(rate(http_requests_total{app="server-api"}[2m])) by (instance, version)
```

### 3. Resource Saturation

```promql
# CPU saturation per instance
100 * (1 - avg(rate(process_cpu_seconds_total{app="server-api"}[5m])) by (instance))
```

### 4. Database Connection Pool Usage

```promql
# Per-instance database connection usage
sum(database_connections_active{app="server-api"}) by (instance)
/
sum(database_connections_max{app="server-api"}) by (instance)
```
