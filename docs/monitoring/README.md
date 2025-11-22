# Monitoring Documentation

This directory contains comprehensive guides for monitoring the Murror API system.

## 📚 Available Guides

### [Setup Guide](setup-guide.md)

Initial setup and configuration of monitoring infrastructure.

### [Performance Guide](performance-guide.md)

Best practices for performance monitoring and optimization.

### [Production Guide](production-guide.md)

Production-specific monitoring strategies and alerts.

### [Enhanced Metrics](enhanced-metrics.md)

Advanced metrics configuration and custom dashboards.

### [Latency Breakdown](latency-breakdown.md)

Detailed analysis of request latency and optimization strategies.

### [InfluxDB Monitoring](influxdb-monitoring.md)

Request-level monitoring with InfluxDB, including multi-environment setup and resilience features.

### [API Endpoint Performance Dashboard](api-endpoint-performance-dashboard.md)

Detailed performance analysis dashboard for individual API endpoints with dynamic selection.

## 🎯 Quick Reference

### Key Metrics Endpoints

- `/metrics` - Prometheus metrics
- `/health` - Health checks (main application health)
- `/health/monitoring` - Extended health including InfluxDB status
- `/api/monitoring/metrics` - Custom business metrics
- `/api/monitoring/request-history` - Request history from InfluxDB

### Important Metrics

- `http_request_duration_seconds` - Request latency
- `database_query_duration_seconds` - Database performance
- `active_connections` - Current load
- `api_errors_total` - Error tracking

## 🔧 Common Tasks

### View Current Metrics

```bash
curl http://localhost:3000/metrics
```

### Check System Health

```bash
curl http://localhost:3000/health
```

### Generate Performance Report

```bash
npm run monitoring:report
```

## 📊 Monitoring Stack

- **Metrics Collection**: Prometheus + InfluxDB
- **Visualization**: Grafana (dual data sources)
- **Request Tracking**: InfluxDB with circuit breaker resilience
- **Logging**: Pino + Structured Logging
- **Tracing**: OpenTelemetry (optional)
- **Alerting**: Prometheus Alertmanager

## 🚨 Alert Thresholds

- Response time > 500ms
- Error rate > 1%
- Memory usage > 80%
- CPU usage > 70%
- Database query time > 100ms
