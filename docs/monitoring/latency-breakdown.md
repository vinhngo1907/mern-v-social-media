# Implementing Latency Breakdown Monitoring

This guide explains how to implement latency breakdown monitoring to track database queries and external API calls.

## Overview

The latency breakdown panel in Grafana shows you where time is being spent in your application:

- Database queries (automatically tracked)
- External API calls (requires using MonitoredHttpService)

## 1. Database Query Monitoring (Automatic)

Database queries are automatically tracked through Prisma middleware. No code changes needed!

### What's Tracked

- Query type (findMany, create, update, delete, etc.)
- Table/Model name
- Query duration

### Example Metrics

```
database_query_duration_seconds{operation="findMany", table="User"}
database_query_duration_seconds{operation="create", table="DailyMoodCheckin"}
database_query_duration_seconds{operation="update", table="legacy_Streak"}
```

## 2. External API Call Monitoring

To track external API calls, use the `MonitoredHttpService` instead of axios directly.

### Basic Usage

```typescript
import {Injectable} from '@nestjs/common';
import {MonitoredHttpService} from '../common/services/monitored-http.service';

@Injectable()
export class MyService {
  constructor(private readonly httpService: MonitoredHttpService) {}

  async fetchDataFromExternalAPI() {
    // The service name will be automatically extracted from the hostname
    const response = await this.httpService.get('https://api.example.com/data');
    return response.data;
  }

  async callWithCustomServiceName() {
    // Specify a custom service name for better grouping
    const response = await this.httpService.post(
      'https://api.example.com/users',
      {name: 'John'},
      {
        service: 'ExampleAPI', // Custom service name
        headers: {Authorization: 'Bearer token'},
      },
    );
    return response.data;
  }
}
```

### Converting Existing Code

**Before (using axios):**

```typescript
import axios from 'axios';

const response = await axios.post(createTaskUrl, formData, {
  headers: {
    ...formData.getHeaders(),
    keyId: this.keyId,
    keySecret: this.keySecret,
  },
});
```

**After (using MonitoredHttpService):**

```typescript
constructor(
  private readonly httpService: MonitoredHttpService,
) {}

const response = await this.httpService.post(
  createTaskUrl,
  formData,
  {
    service: 'Speechflow',  // Service name for metrics
    headers: {
      ...formData.getHeaders(),
      keyId: this.keyId,
      keySecret: this.keySecret,
    },
  }
);
```

### What's Tracked

- Service name (hostname or custom)
- Endpoint path
- HTTP status code
- Response time

### Example Metrics

```
external_api_duration_seconds{service="Speechflow", endpoint="/asr/file/v1/create", status_code="200"}
external_api_duration_seconds{service="RevenueCat", endpoint="/v2/subscribers", status_code="200"}
external_api_duration_seconds{service="OneSignal", endpoint="/notifications", status_code="201"}
```

## 3. Real Implementation Examples

### Example 1: Speech Transcription Service

```typescript
@Injectable()
export class SpeechflowService {
  constructor(
    private readonly httpService: MonitoredHttpService,
    private readonly configService: ConfigService,
  ) {}

  async createTranscriptionTask(
    filePath: string,
    lang = 'en',
  ): Promise<string> {
    const formData = new FormData();
    formData.append('audio', fs.createReadStream(filePath));
    formData.append('lang', lang);

    const response = await this.httpService.post<SpeechflowTaskResponse>(
      `${this.baseUrl}/create`,
      formData,
      {
        service: 'Speechflow',
        headers: {
          ...formData.getHeaders(),
          keyId: this.keyId,
          keySecret: this.keySecret,
        },
      },
    );

    if (response.data.code !== 10000 || !response.data.taskId) {
      throw new Error(`Failed to create task: ${response.data.msg}`);
    }

    return response.data.taskId;
  }
}
```

### Example 2: Revenue Cat Integration

```typescript
@Injectable()
export class RevenueCatService {
  constructor(
    private readonly httpService: MonitoredHttpService,
    private readonly configService: ConfigService,
  ) {}

  async getSubscriptionStatus(userId: string): Promise<SubscriptionInfo> {
    const response = await this.httpService.get(
      `${this.baseUrl}/subscribers/${userId}`,
      {
        service: 'RevenueCat',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return this.mapSubscriptionInfo(response.data);
  }
}
```

### Example 3: OneSignal Notifications

```typescript
@Injectable()
export class OneSignalService {
  constructor(private readonly httpService: MonitoredHttpService) {}

  async sendNotification(
    userIds: string[],
    title: string,
    message: string,
  ): Promise<void> {
    const response = await this.httpService.post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: this.appId,
        include_external_user_ids: userIds,
        headings: {en: title},
        contents: {en: message},
      },
      {
        service: 'OneSignal',
        headers: {
          Authorization: `Basic ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.data.id) {
      throw new Error('Failed to send notification');
    }
  }
}
```

## 4. Advanced Usage

### Using Axios Instance for Complex Scenarios

If you need more control, you can get the underlying axios instance:

```typescript
const axiosInstance = this.httpService.getAxiosInstance();

// Add custom interceptors
axiosInstance.interceptors.request.use(config => {
  // Custom logic
  return config;
});
```

### Batch Operations

For multiple API calls, metrics are tracked individually:

```typescript
async batchOperation() {
  const [users, posts, comments] = await Promise.all([
    this.httpService.get('https://api.example.com/users', { service: 'ExampleAPI' }),
    this.httpService.get('https://api.example.com/posts', { service: 'ExampleAPI' }),
    this.httpService.get('https://api.example.com/comments', { service: 'ExampleAPI' }),
  ]);

  // Each call is tracked separately in metrics
}
```

## 5. Viewing Metrics in Grafana

Once implemented, you'll see data in the "Latency Breakdown" panel:

1. **Database Operations**: Automatically shows all Prisma queries
2. **External APIs**: Shows all HTTP calls made through MonitoredHttpService

The panel displays:

- P95 latency for each operation
- Stacked view to see total latency composition
- Separate lines for each service/operation

## 6. Best Practices

1. **Always specify service names** for external APIs for better grouping
2. **Use consistent service names** across your application
3. **Monitor critical paths** - focus on user-facing operations
4. **Set up alerts** for slow queries or API calls
5. **Review regularly** to identify optimization opportunities

## 7. Troubleshooting

### No Data Showing?

1. Check if MonitoringModule is imported in your module
2. Verify the service is using MonitoredHttpService
3. Check Prometheus is scraping metrics (`/api/metrics`)
4. Ensure queries are being executed (for database metrics)

### Metrics Not Grouped Correctly?

1. Use consistent service names
2. Check the endpoint paths are normalized
3. Verify the Grafana query is using the correct labels

### High Latency Detected?

1. Check database query optimization (indexes, N+1 queries)
2. Review external API response times
3. Consider caching frequently accessed data
4. Implement request batching where possible
