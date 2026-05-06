# Enhanced WebSocket Connection Management & Monitoring

## Overview

This document outlines the implementation plan for comprehensive WebSocket connection management and monitoring in the Social API. The solution provides real-time visibility into active connections, user information tracking, and integration with existing monitoring systems.

## Architecture Components

### 1. WebSocket Connection Service

A centralized service to track and manage all active Socket.IO connections with detailed metadata.

#### Features:

- Track all active connections with metadata
- Store user profile information (username, email, etc.)
- Provide query methods for connection statistics
- Integrate with Prometheus monitoring
- Handle connection lifecycle events

#### Implementation: `src/websocket/websocket-connection.service.ts`

```typescript
@Injectable()
export class WebSocketConnectionService {
  private connections = new Map<string, ConnectionInfo>();
  private userConnections = new Map<string, Set<string>>();

  // Add connection with metadata
  addConnection(socketId: string, connectionInfo: ConnectionInfo): void;

  // Remove connection and cleanup
  removeConnection(socketId: string): void;

  // Get all active connections
  getAllConnections(): ConnectionInfo[];

  // Get connections by user
  getUserConnections(userId: string): ConnectionInfo[];

  // Get connection statistics
  getConnectionStats(): ConnectionStats;

  // Force disconnect a specific socket
  forceDisconnect(socketId: string): boolean;
}
```

### 2. Connection Metadata Collection

Enhanced authentication guard to collect comprehensive user and connection information.

#### Data Collected:

- **User Information**:
  - User ID, email, username
  - Profile data from Supabase
  - User roles and permissions
- **Connection Details**:
  - Socket ID
  - Connection timestamp
  - Last activity timestamp
  - Connection duration
- **Client Information**:
  - IP address
  - User agent (browser/device)
  - Geographic location (via IP)
  - Client version

#### Type Definitions: `src/websocket/interfaces/connection-info.interface.ts`

```typescript
interface ConnectionInfo {
  socketId: string;
  userId: string;
  user: {
    id: string;
    email: string;
    username?: string;
    avatarUrl?: string;
  };
  connection: {
    connectedAt: Date;
    lastActivityAt: Date;
    namespace: string;
    rooms: string[];
  };
  client: {
    ipAddress: string;
    userAgent: string;
    device?: {
      type: "mobile" | "desktop" | "tablet";
      os: string;
      browser: string;
    };
    location?: {
      country: string;
      city: string;
      region: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
  };
  metrics: {
    messagesReceived: number;
    messagesSent: number;
    eventsEmitted: Map<string, number>;
  };
}
```

### 3. Monitoring Integration

Integration with Prometheus for comprehensive WebSocket metrics.

#### Metrics to Track:

```typescript
// WebSocket-specific Prometheus metrics
websocket_connections_total; // Counter: Total connections established
websocket_active_connections; // Gauge: Current active connections
websocket_connection_duration_seconds; // Histogram: Connection duration
websocket_messages_total; // Counter: Messages sent/received
websocket_rooms_active; // Gauge: Active rooms count
websocket_events_total; // Counter: Events by type
websocket_auth_failures_total; // Counter: Authentication failures
websocket_disconnections_total; // Counter: Disconnections by reason
```

#### Implementation: `src/websocket/websocket-monitoring.service.ts`

```typescript
@Injectable()
export class WebSocketMonitoringService {
  constructor(
    @InjectMetric("websocket_connections_total")
    private connectionsTotal: Counter,
    @InjectMetric("websocket_active_connections")
    private activeConnections: Gauge,
    // ... other metrics
  ) {}

  recordConnection(userId: string, namespace: string): void;
  recordDisconnection(userId: string, reason: string): void;
  recordMessage(direction: "in" | "out", eventType: string): void;
  recordAuthFailure(reason: string): void;
}
```

### 4. Admin API Endpoints

RESTful API endpoints for administrators to monitor and manage WebSocket connections.

#### Endpoints: `src/admin/websocket-admin.controller.ts`

```typescript
@Controller('api/v1/admin/websocket')
@UseGuards(AdminAuthGuard)
@ApiTags('WebSocket Admin')
export class WebSocketAdminController {

  @Get('connections')
  @ApiOperation({ summary: 'List all active WebSocket connections' })
  async listConnections(
    @Query() filters: ConnectionFiltersDto
  ): Promise<ConnectionInfo[]>;

  @Get('connections/:userId')
  @ApiOperation({ summary: 'Get specific user connections' })
  async getUserConnections(
    @Param('userId') userId: string
  ): Promise<ConnectionInfo[]>;

  @Get('stats')
  @ApiOperation({ summary: 'Get WebSocket statistics' })
  async getStats(): Promise<ConnectionStats>;

  @Post('disconnect/:socketId')
  @ApiOperation({ summary: 'Force disconnect a client' })
  async forceDisconnect(
    @Param('socketId') socketId: string,
    @Body() reason: DisconnectReasonDto
  ): Promise<void>;

  @Post('broadcast')
  @ApiOperation({ summary: 'Broadcast message to users/rooms' })
  async broadcast(
    @Body() message: BroadcastMessageDto
  ): Promise<BroadcastResult>;
}
```

### 5. Real-time Admin Dashboard Events

WebSocket events for administrative monitoring dashboards.

#### Admin Events:

```typescript
// Admin namespace: /admin-events
interface AdminWebSocketEvents {
  // Connection lifecycle
  connection_added: (connection: ConnectionInfo) => void;
  connection_removed: (connection: ConnectionInfo) => void;
  connection_updated: (connection: ConnectionInfo) => void;

  // Statistics updates
  stats_update: (stats: ConnectionStats) => void;
  metrics_update: (metrics: WebSocketMetrics) => void;

  // Alerts
  connection_anomaly: (alert: ConnectionAnomaly) => void;
  performance_alert: (alert: PerformanceAlert) => void;
}
```

## Implementation Steps

### Phase 1: Core Infrastructure

1. Create WebSocket module and connection service
2. Define interfaces and DTOs
3. Implement connection tracking in gateway
4. Add user metadata collection to auth guard

### Phase 2: Monitoring Integration

1. Add Prometheus metrics for WebSocket
2. Create monitoring service
3. Integrate with existing monitoring module
4. Add metric collection to gateway events

### Phase 3: Admin API

1. Create admin module and controller
2. Implement connection query endpoints
3. Add force disconnect functionality
4. Create broadcast messaging system

### Phase 4: Real-time Dashboard

1. Create admin WebSocket gateway
2. Implement real-time event emission
3. Add connection statistics aggregation
4. Create alert system for anomalies

## Usage Examples

### Client Connection with Metadata

```typescript
// Client-side connection
const socket = io("ws://localhost:3000/log-events", {
  auth: {
    token: "Bearer jwt-token",
  },
  query: {
    clientVersion: "1.0.0",
    deviceId: "unique-device-id",
  },
});
```

### Admin Dashboard Integration

```typescript
// Admin dashboard connection
const adminSocket = io("ws://localhost:3000/admin-events", {
  auth: {
    token: "Bearer admin-jwt-token",
  },
});

adminSocket.on("connection_added", (connection) => {
  console.log("New connection:", connection);
  updateDashboard(connection);
});

adminSocket.on("stats_update", (stats) => {
  console.log("Stats update:", stats);
  updateCharts(stats);
});
```

### Querying Connections

```typescript
// Get all active connections
GET /api/v1/admin/websocket/connections

// Filter connections
GET /api/v1/admin/websocket/connections?country=US&device=mobile

// Get user connections
GET /api/v1/admin/websocket/connections/user-123

// Get statistics
GET /api/v1/admin/websocket/stats
```

## Security Considerations

1. **Admin Authentication**: All admin endpoints require admin role
2. **Data Privacy**: Mask sensitive user data in responses
3. **Rate Limiting**: Implement rate limiting for admin endpoints
4. **Audit Logging**: Log all admin actions
5. **CORS**: Restrict admin dashboard origins

## Performance Considerations

1. **Memory Management**: Implement connection data expiry
2. **Efficient Queries**: Use indexed maps for fast lookups
3. **Batch Updates**: Aggregate metrics before sending
4. **Pagination**: Paginate large connection lists
5. **Caching**: Cache statistics for performance

## Monitoring Dashboard Mockup

```
┌─────────────────────────────────────────────────────────────┐
│                  WebSocket Connection Monitor                │
├─────────────────────────────────────────────────────────────┤
│ Active Connections: 1,234  │  Total Today: 45,678           │
│ Unique Users: 567          │  Avg Duration: 12m 34s         │
├─────────────────────────────────────────────────────────────┤
│                    Geographic Distribution                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [World Map with Connection Density Heat Map]            │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Active Connections List                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ User         │ Location    │ Device    │ Duration      │ │
│ │ john@example │ New York    │ iOS       │ 5m 23s        │ │
│ │ jane@example │ London      │ Android   │ 2h 15m        │ │
│ │ ...          │ ...         │ ...       │ ...           │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Benefits

1. **Complete Visibility**: Real-time view of all connections
2. **User Insights**: Understand user behavior and patterns
3. **Performance Monitoring**: Track connection health
4. **Security**: Detect and respond to anomalies
5. **Debugging**: Quickly identify connection issues
6. **Scalability Planning**: Data-driven scaling decisions

## Future Enhancements

1. **Machine Learning**: Anomaly detection using ML
2. **Predictive Analytics**: Forecast connection patterns
3. **Auto-scaling**: Trigger scaling based on metrics
4. **Integration**: Connect with external monitoring tools
5. **Mobile SDK**: Native connection tracking for mobile apps
