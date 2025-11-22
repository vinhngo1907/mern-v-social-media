# Murror API Monitoring Setup

This document describes the comprehensive monitoring setup for the Murror API service.

## Overview

The monitoring system provides:

- **Real-time metrics collection** using Prometheus
- **Business metrics tracking** for application-specific KPIs
- **Health checks** for service dependencies
- **Alerting rules** for proactive issue detection
- **Grafana dashboards** for visualization

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Murror API │────▶│  Prometheus  │────▶│   Grafana   │
│   Service   │     │    Server    │     │ Dashboards  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                     │
       │                    │                     │
       ▼                    ▼                     ▼
  /api/metrics         Alertmanager           Visualize
   endpoint             for alerts             metrics
```

## Metrics Categories

### 1. Infrastructure Metrics

#### HTTP Request Metrics

- `http_requests_total` - Total number of HTTP requests
- `http_request_duration_seconds` - Request duration histogram
- `http_request_size_bytes` - Request payload size
- `http_response_size_bytes` - Response payload size
- `active_connections` - Current active connections

#### Database Metrics

- `database_query_duration_seconds` - Database query performance
- Connection pool metrics from default Prometheus metrics

#### External API Metrics

- `external_api_duration_seconds` - External API call duration
- `api_errors_total` - API error tracking

### 2. Business Metrics

#### Daily Mood Checkin

- `daily_mood_checkins_total` - Total checkins by user, mood type, and status
- `daily_mood_checkin_duration_seconds` - Processing time per step
- `daily_mood_checkin_progress` - Current progress gauge

#### Streaks

- `streaks_created_total` - New streaks created
- `streaks_broken_total` - Broken streaks with days achieved
- `active_streaks_count` - Currently active streaks
- `streak_duration_days` - Histogram of streak durations

#### Deep Chat

- `deep_chat_sessions_total` - Chat session counts
- `deep_chat_session_duration_seconds` - Session duration
- `deep_chat_messages_total` - Message counts by type
- `deep_chat_ai_response_time_seconds` - AI response latency

#### Subscriptions

- `subscriptions_created_total` - New subscriptions
- `subscriptions_cancelled_total` - Cancelled subscriptions with reasons
- `active_subscriptions_count` - Active subscription gauge
- `subscription_lifetime_days` - Subscription duration histogram
- `subscription_revenue_total` - Revenue tracking

#### Audio Processing

- `audio_transcriptions_total` - Transcription counts
- `audio_transcription_duration_seconds` - Processing time
- `audio_file_size_bytes` - File size distribution

#### User Activity

- `daily_active_users` - DAU gauge
- `weekly_active_users` - WAU gauge
- `monthly_active_users` - MAU gauge
- `user_session_duration_seconds` - Session duration histogram

## Health Checks

### Endpoints

- `/health` - Comprehensive health check
- `/health/ready` - Readiness probe for Kubernetes
- `/health/live` - Liveness probe for Kubernetes

### Health Indicators

1. **Memory Health**

   - Heap usage monitoring
   - RSS (Resident Set Size) monitoring
   - Configurable thresholds

2. **Disk Health**

   - Available disk space percentage
   - Configurable threshold

3. **Database Health**

   - Legacy database connectivity
   - Main database connectivity
   - Response time tracking

4. **RabbitMQ Health**
   - Queue connectivity
   - Message handling capability

## Deployment

### 1. Kubernetes Resources

Apply the monitoring resources:

```bash
# Apply ServiceMonitor for Prometheus discovery
kubectl apply -f k8s/monitoring/servicemonitor.yaml

# Apply PrometheusRule for alerting
kubectl apply -f k8s/monitoring/prometheusrule.yaml

# Apply Grafana dashboard
kubectl apply -f k8s/monitoring/grafana/dashboard-configmap.yaml
```

### 2. Environment Variables

The following environment variables are automatically injected:

```yaml
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
    value: '$(POD_NAME)'
  - name: HOSTNAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName
  - name: POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
```

### 3. Pod Annotations

Required annotations for Prometheus scraping:

```yaml
annotations:
  prometheus.io/scrape: 'true'
  prometheus.io/port: '3000'
  prometheus.io/path: '/api/metrics'
```

## Using Business Metrics in Code

### 1. Inject the Service

```typescript
import { BusinessMetricsService } from '@monitoring/business-metrics.service';

constructor(
  private readonly businessMetrics: BusinessMetricsService,
) {}
```

### 2. Record Metrics

```typescript
// Record a daily mood checkin
this.businessMetrics.recordDailyMoodCheckin(userId, 'happy', 'success');

// Track processing duration
const startTime = Date.now();
// ... process checkin ...
this.businessMetrics.recordDailyMoodCheckinDuration(
  'ai_processing',
  Date.now() - startTime,
);

// Update progress
this.businessMetrics.updateDailyMoodCheckinProgress(userId, 0.75);
```

## Alerting Rules

### Critical Alerts

1. **Service Down**

   - Triggers when service is unreachable for 2+ minutes
   - Severity: critical

2. **Database Connection Errors**
   - Triggers on database connection failures
   - Severity: critical

### Warning Alerts

1. **High Error Rate** (>5% for 5 minutes)
2. **High Latency** (P95 > 2s for 5 minutes)
3. **High Memory Usage** (>80% of limit)
4. **High CPU Usage** (>80% of limit)
5. **External API Failures** (>10% failure rate)
6. **Pod Restarts** (>3 in 1 hour)
7. **Low Pod Count** (<2 pods running)

## Grafana Dashboards

### Available Dashboards

#### 1. Infrastructure Dashboard (`murror-api-infrastructure.json`)

- **Request Rate by Pod** - Requests per second per pod
- **P95 Latency by Pod** - 95th percentile latency
- **Error Rate by Status Code** - 4xx and 5xx errors
- **Pod Resource Usage** - CPU and memory usage
- **Database Query Performance** - Query latency by operation
- **External API Calls** - External service performance

#### 2. Business Metrics Dashboard (`murror-api-business-metrics.json`)

- **User Activity** - DAU/WAU/MAU statistics
- **Daily Mood Checkins** - Checkin rates and statuses
- **Active Streaks** - Current streak counts
- **Deep Chat Sessions** - Session metrics and AI response times
- **Subscriptions** - Active subscriptions and revenue
- **Audio Transcriptions** - Processing rates and providers
- **User Session Duration** - Session length distribution
- **AI Token Consumption** - Token usage by model and endpoint
- **Streak Duration** - P50/P95 streak lengths
- **KOL Conversion Rates** - Affiliate performance table

### Local Testing with Docker Compose

1. Start the monitoring stack:

```bash
docker-compose -f docker-compose.monitoring.yml up -d
```

2. Access Grafana at <http://localhost:3001>

   - Username: admin
   - Password: admin

3. Dashboards are automatically loaded from `monitoring/grafana/dashboards/`

### Kubernetes Deployment

1. Generate ConfigMaps from JSON files:

```bash
./scripts/generate-dashboard-configmaps.sh
```

2. Apply the ConfigMaps:

```bash
kubectl apply -f k8s/monitoring/grafana/
```

3. Access Grafana:

```bash
kubectl port-forward -n monitoring svc/kube-prometheus-stack-grafana 3000:80
```

### Importing Dashboards Manually

If you need to import dashboards manually:

1. Open Grafana UI
2. Go to Dashboards → Import
3. Upload the JSON file from `monitoring/grafana/dashboards/`
4. Select the Prometheus datasource
5. Click Import

## Troubleshooting

### Metrics Not Appearing

1. Check ServiceMonitor is created:

```bash
kubectl get servicemonitor -n your-namespace
```

2. Verify Prometheus configuration:

```bash
kubectl get prometheus -n monitoring -o yaml | grep serviceMonitorSelector
```

3. Check metrics endpoint:

```bash
kubectl port-forward svc/murror-api 3000:3000
curl http://localhost:3000/api/metrics
```

### High Cardinality Issues

Monitor metric cardinality:

```promql
count(count by (__name__)({app="murror-api"}))
```

If cardinality is high:

1. Review label usage
2. Avoid high-cardinality labels (user_id, request_id)
3. Use sampling for detailed metrics

### Memory Usage

If monitoring overhead is high:

1. Reduce metric retention
2. Decrease scrape frequency
3. Review histogram bucket configurations

## Best Practices

1. **Label Usage**

   - Use consistent label names
   - Avoid high-cardinality labels in production
   - Keep label values bounded

2. **Metric Naming**

   - Follow Prometheus naming conventions
   - Use descriptive metric names
   - Include units in metric names (e.g., `_seconds`, `_bytes`)

3. **Performance**

   - Batch metric updates when possible
   - Use histograms for latency measurements
   - Set appropriate bucket boundaries

4. **Security**
   - Secure metrics endpoint in production
   - Use RBAC for ServiceMonitor access
   - Encrypt metrics in transit

## Integration with CI/CD

The monitoring setup is automatically deployed through the CI/CD pipeline:

1. **Development** - Metrics available for testing
2. **Staging** - Full monitoring with test alerts
3. **Production** - Complete monitoring with production alerts

## Future Enhancements

1. **Distributed Tracing** - OpenTelemetry integration
2. **Log Aggregation** - Centralized logging with Loki
3. **SLO Monitoring** - Service Level Objectives tracking
4. **Custom Dashboards** - Business-specific visualizations
5. **Cost Monitoring** - Resource usage and cost tracking
