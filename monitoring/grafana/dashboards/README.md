# Grafana Dashboards

This directory contains Grafana dashboard definitions in JSON format for the Social Media API monitoring.

## Dashboard Files

### 1. `v-social-media-api-infrastructure.json`

Infrastructure and performance monitoring dashboard that includes:

- HTTP request rates, latency, and error rates
- Pod resource usage (CPU and memory)
- Database query performance
- External API call monitoring

### 2. `v-social-media-api-business-metrics.json`

Business metrics dashboard that tracks:

- User activity metrics (DAU/WAU/MAU)
- Feature usage (mood checkins, streaks, deep chat)
- Subscription metrics and revenue
- Audio transcription statistics
- AI service usage and costs

### 3. `v-social-media-api-dashboard-enhanced.json` (Legacy)

Enhanced version of the original dashboard with additional panels and metrics.

### 4. `v-social-media-api-dashboard.json` (Legacy)

Original basic monitoring dashboard.

## Usage

### Local Development (Docker Compose)

The dashboards are automatically loaded when using docker-compose:

```bash
# Start monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d

# Access Grafana at http://localhost:3001
# Username: admin, Password: admin
```

### Kubernetes Deployment

1. Generate ConfigMaps from these JSON files:

```bash
./scripts/generate-dashboard-configmaps.sh
```

2. Apply to Kubernetes:

```bash
kubectl apply -f k8s/monitoring/grafana/
```

### Manual Import

To import a dashboard manually in Grafana:

1. Open Grafana UI
2. Navigate to Dashboards → Import
3. Either:
   - Upload the JSON file directly, or
   - Copy and paste the JSON content
4. Select your Prometheus datasource
5. Click Import

## Customization

You can customize these dashboards by:

1. Importing them into Grafana
2. Making changes using the Grafana UI
3. Exporting the updated dashboard as JSON
4. Replacing the file in this directory

## Dashboard IDs

- Infrastructure: `v-social-media-api-infra`
- Business Metrics: `v-social-media-api-business`

These UIDs are used for deep linking and API access to specific dashboards.
