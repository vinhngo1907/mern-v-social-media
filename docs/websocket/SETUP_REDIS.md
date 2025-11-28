# Redis Configuration for WebSocket Scaling

Redis is required when scaling the Murror API to multiple pods to ensure Socket.IO events are properly distributed across all instances.

## When You Need Redis

- ✅ **Multiple API pods** (replicas > 1)
- ✅ **High availability** requirements
- ✅ **Load balanced WebSocket connections**
- ❌ **Single pod deployment** (Redis not needed)

## Configuration

The application now only supports external Redis services via the `REDIS_URL` environment variable.

### Environment Variable

Add to your `.env` file:

```bash
# External Redis URL with authentication
REDIS_URL=redis://:your-secure-password@your-redis-host:6379/0
```

### Example Redis URLs

```bash
# Local Redis with password
REDIS_URL=redis://:mypassword@localhost:6379/0

# Redis Cloud
REDIS_URL=redis://:password@redis-12345.cloud.redislabs.com:12345/0

# AWS ElastiCache
REDIS_URL=redis://your-cluster.cache.amazonaws.com:6379/0

# Azure Cache for Redis
REDIS_URL=redis://:password@your-cache.redis.cache.windows.net:6380/0

# DigitalOcean Managed Redis
REDIS_URL=redis://default:password@your-redis-cluster.db.ondigitalocean.com:25061/0
```

### Kubernetes Secrets

Create the Redis URL secret:

```bash
# Create the secret with your external Redis URL
kubectl create secret generic murror-api-secret \
  --from-literal=REDIS_URL="redis://:your-password@your-redis-host:6379/0" \
  --dry-run=client -o yaml | kubectl apply -f -
```

## Redis Adapter

The Redis adapter is already configured in `src/main.ts`:

```typescript
// Automatically enabled when REDIS_URL is provided
app.useWebSocketAdapter(new RedisIoAdapter(app));
```

## Testing Redis Connection

### 1. Check Application Logs

```bash
# Check API logs for Redis connection
kubectl logs -l app=murror-api | grep -i redis

# You should see:
# "Connecting to Redis: redis://***@your-redis-host:6379"
# "Redis pub client connected"
# "Redis sub client connected"
# "Redis adapter initialized successfully"
```

### 2. Test WebSocket with Multiple Pods

```javascript
// Connect from different clients
const socket1 = io('wss://your-api-domain.com');
const socket2 = io('wss://your-api-domain.com');

// They might connect to different pods
// But events will be synchronized via Redis
```

## Troubleshooting

### Missing REDIS_URL

```
Error: REDIS_URL is required for Redis connection
```

**Solution**: Ensure `REDIS_URL` is set in your environment variables.

### Authentication Error

```
Error: NOAUTH Authentication required
```

**Solution**: Ensure your Redis URL includes the correct password: `redis://:password@host:port/db`

### Connection Refused

```
Error: connect ECONNREFUSED host:port
```

**Solution**:

1. Verify your external Redis service is running and accessible
2. Check firewall/security group settings
3. Confirm the host and port in your REDIS_URL are correct

### Fallback Behavior

If Redis connection fails, the adapter will:

1. Log the error
2. Fall back to the default in-memory adapter
3. Continue working (but without multi-pod support)

## Production Considerations

### 1. Managed Redis Services

Use a managed Redis service for production:

- **AWS ElastiCache**: Fully managed Redis with automatic failover
- **Azure Cache for Redis**: Managed Redis with high availability
- **Google Cloud Memorystore**: Managed Redis service
- **Redis Cloud**: Official Redis managed service
- **DigitalOcean Managed Redis**: Simple managed Redis clusters

### 2. Security

- Use strong passwords (32+ characters)
- Enable TLS for Redis connections when supported
- Use VPC/private networks when possible
- Regularly rotate passwords

### 3. High Availability

Choose Redis services with:

- Automatic failover
- Multi-zone deployment
- Read replicas for scaling reads
- Backup and restore capabilities

### 4. Monitoring

Monitor your Redis service through:

- Cloud provider monitoring dashboards
- Redis metrics (connections, memory usage, ops/sec)
- Application-level monitoring for Redis connection health

## Socket.IO Redis Adapter Behavior

The Redis adapter uses Redis Pub/Sub to:

1. **Broadcast events** across all Socket.IO servers
2. **Synchronize rooms** between servers
3. **Handle disconnections** properly across pods

### How It Works

```
Client A → Pod 1 → Redis Pub/Sub → Pod 2 → Client B
                     ↓
                   Pod 3 → Client C
```

All pods subscribe to Redis channels and relay messages to their connected clients.

## Disabling Redis (Development)

For single-pod development, you can comment out the Redis adapter:

```typescript
// In src/main.ts, comment out:
// app.useWebSocketAdapter(new RedisIoAdapter(app));

// Use default adapter:
app.useWebSocketAdapter(new IoAdapter(app));
```

Or simply don't set the `REDIS_URL` environment variable and the application will fall back to the default adapter.

## Next Steps

1. Choose and configure an external Redis service
2. Set the `REDIS_URL` environment variable
3. Scale your API to multiple pods
4. Monitor Redis performance and connection health
5. Set up Redis backups and monitoring as needed
