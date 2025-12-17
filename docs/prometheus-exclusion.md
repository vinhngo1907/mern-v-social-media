# Prometheus Endpoint Exclusion

This feature allows you to exclude specific endpoints from Prometheus monitoring and scraping.

## Configuration

Set the `MONITORING_EXCLUDED_ENDPOINTS` environment variable with a comma-separated list of endpoints to exclude:

```bash
# Example: Exclude metrics and health endpoints
MONITORING_EXCLUDED_ENDPOINTS=metrics,health,health/ready,health/live

# You can use absolute paths
MONITORING_EXCLUDED_ENDPOINTS=/api/metrics,/api/health

# Or relative paths (will be prefixed with /api/)
MONITORING_EXCLUDED_ENDPOINTS=metrics,health
```

## How it Works

1. **Performance Monitoring Exclusion**: The `PerformanceMonitoringInterceptor` will skip performance tracking for excluded endpoints.

2. **Prometheus Scraping Prevention**: The `PrometheusExclusionMiddleware` will:
   - Add `X-Prometheus-Exclude: true` header to responses from excluded endpoints
   - Return 404 status when Prometheus scraper (identified by User-Agent) tries to access excluded endpoints

## Implementation Details

### Components Modified

1. **AppConfig Interface** (`src/types/app-config.ts`):
   - Added `monitoring` configuration object with `excludedEndpoints` array

2. **Configuration** (`src/config/configuration.ts`):
   - Reads `MONITORING_EXCLUDED_ENDPOINTS` and parses it into an array

3. **PrometheusExclusionMiddleware** (`src/common/middleware/prometheus-exclusion.middleware.ts`):
   - Checks if request path matches excluded endpoints
   - Blocks Prometheus scraper access with 404 response
   - Adds exclusion header for other monitoring tools

4. **PerformanceMonitoringInterceptor** (`src/common/interceptors/performance-monitoring.interceptor.ts`):
   - Skips performance tracking for excluded endpoints

## Testing

Use the provided test script to verify the exclusion functionality:

```bash
# 1. Set environment variable
export MONITORING_EXCLUDED_ENDPOINTS=metrics,health

# 2. Start the application
pnpm run dev

# 3. Run the test script
node test-prometheus-exclusion.js
```

The test script will:

- Test all endpoints with a regular user agent
- Test excluded endpoints with Prometheus user agent
- Verify proper headers and status codes

## Environment-Specific Configuration

Different environments can have different exclusion settings:

```bash
# Development - exclude nothing
MONITORING_EXCLUDED_ENDPOINTS=

# Staging - exclude health checks
MONITORING_EXCLUDED_ENDPOINTS=health,health/ready,health/live

# Production - exclude metrics and health
MONITORING_EXCLUDED_ENDPOINTS=metrics,health,health/ready,health/live
```

## Monitoring Considerations

When endpoints are excluded:

- They won't appear in Prometheus metrics
- Performance data won't be collected
- They can still be accessed normally by non-Prometheus clients

This is useful for:

- Reducing monitoring overhead
- Preventing health check spam in metrics
- Complying with security requirements
