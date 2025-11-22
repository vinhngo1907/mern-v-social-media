# Prometheus and Grafana Setup for API Monitoring

This guide explains how to set up Prometheus and Grafana locally to monitor your Social Media API performance.

## Prerequisites

- Docker and Docker Compose installed
- Social Media API running on port 5001

## Quick Start

1. **Start the monitoring stack:**

   ```bash
   docker-compose -f docker-compose.monitoring.yml up -d
   ```

2. **Access the services:**

   - Prometheus: <http://localhost:9090>
   - Grafana: <http://localhost:3001> (admin/admin)

3. **Stop the monitoring stack:**

   ```bash
   docker-compose -f docker-compose.monitoring.yml down
   ```

## Services Overview

### Prometheus (Port 9090)

- Collects metrics from your API
- Scrapes `/api/metrics` endpoint every 5 seconds
- Stores time-series data
- Provides query interface

### Grafana (Port 3001)

- Visualizes metrics from Prometheus
- Pre-configured with Social Media API dashboard
- Default credentials: admin/admin

### Node Exporter (Port 9100)

- Collects system-level metrics
- CPU, memory, disk, network statistics

## Dashboard Features

The pre-configured Social Media API Performance Dashboard includes:

1. **Request Rate by Endpoint** - Shows requests per second for each API endpoint
2. **Response Time P95 by Endpoint** - Table showing 95th percentile response times
3. **Response Time Percentiles** - Line chart with P50, P90, P95, P99 latencies
4. **Error Rate by Endpoint** - Percentage of failed requests per endpoint
5. **Daily Goal Progress P95** - Gauge showing performance of the daily goal endpoint
6. **Response Size by Endpoint** - Pie chart of response sizes
7. **Node.js Memory Usage** - Heap and external memory usage over time

## Configuration Files

```
monitoring/
├── prometheus/
│   └── prometheus.yml          # Prometheus configuration
├── grafana/
│   ├── provisioning/
│   │   ├── datasources/
│   │   │   └── prometheus.yml  # Datasource configuration
│   │   └── dashboards/
│   │       └── dashboard.yml   # Dashboard provisioning
│   └── dashboards/
│       └── social-media-api-dashboard.json  # Pre-built dashboard
└── README.md
```

## Customization

### Adding New Metrics

1. Update your application to expose new metrics
2. They will automatically be collected by Prometheus

### Creating Custom Dashboards

1. Access Grafana at <http://localhost:3001>
2. Create new dashboard
3. Save and export as JSON
4. Place in `monitoring/grafana/dashboards/`

### Modifying Scrape Intervals

Edit `monitoring/prometheus/prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'social-media-api'
    scrape_interval: 5s # Change this value
```

## Troubleshooting

### Cannot connect to host machine from Docker

If Prometheus can't reach your API:

1. Ensure your API is running on port 5001
2. Check that metrics endpoint is accessible: `curl http://localhost:3000/api/metrics`
3. On Linux, you might need to use your machine's IP instead of `host.docker.internal`

### No data in Grafana

1. Check Prometheus targets: <http://localhost:9090/targets>
2. Ensure all targets are "UP"
3. Verify metrics are being exposed: <http://localhost:3000/api/metrics>

### Permission issues

If you get permission errors:

```bash
sudo chown -R $USER:$USER monitoring/
```

## Advanced Usage

### Adding PostgreSQL Monitoring

1. Add PostgreSQL exporter to docker-compose:

```yaml
postgres-exporter:
  image: prometheuscommunity/postgres-exporter
  environment:
    DATA_SOURCE_NAME: 'postgresql://user:password@host:5432/dbname?sslmode=disable'
  ports:
    - '9187:9187'
```

2. Uncomment PostgreSQL job in `prometheus.yml`

### Setting Up Alerts

1. Create alert rules in `monitoring/prometheus/rules/`
2. Configure Alertmanager in docker-compose
3. Update `prometheus.yml` to include rule files

### Persistent Storage

The docker-compose file already includes volumes for persistent storage:

- `prometheus_data`: Stores metrics data
- `grafana_data`: Stores dashboards and settings

To backup:

```bash
docker run --rm -v social-media-api_prometheus_data:/data -v $(pwd):/backup alpine tar czf /backup/prometheus-backup.tar.gz -C /data .
```

## Performance Tips

1. **Reduce metric cardinality**: Avoid high-cardinality labels
2. **Optimize queries**: Use recording rules for complex queries
3. **Set retention**: Configure data retention in Prometheus
4. **Use downsampling**: For long-term storage, consider Thanos or Cortex

## Integration with CI/CD

Add health checks to your pipeline:

```bash
# Check if metrics are accessible
curl -f http://localhost:3000/api/metrics || exit 1

# Query Prometheus for high error rates
curl -s http://localhost:9090/api/v1/query?query=rate(api_errors_total[5m]) | \
  jq -e '.data.result | length == 0 or (.[0].value[1] | tonumber) < 0.05'
```
