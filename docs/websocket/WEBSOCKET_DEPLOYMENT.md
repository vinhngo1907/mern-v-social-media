# WebSocket/Socket.IO Deployment Guide

## Current Status: ❌ NOT Production Ready

The current deployment configuration does NOT support Socket.IO WebSocket connections due to missing infrastructure configuration.

## Issues Found:

1. **No Ingress Resource**: The k8s/manifests.yml only contains Deployment and Service, no Ingress
2. **Service Type**: Using NodePort which requires external load balancer configuration
3. **No WebSocket Headers**: Missing upgrade headers and timeout configuration
4. **No Session Affinity**: Required for Socket.IO fallback transports

## Required Steps for Production Socket.IO:

### 1. Add Ingress Resource

Since your k8s/manifests.yml doesn't have an Ingress, you need to add one:

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: social-api
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"

    # WebSocket Support
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
    nginx.ingress.kubernetes.io/websocket-services: "social-api"

    # WebSocket Headers
    nginx.ingress.kubernetes.io/configuration-snippet: |
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";

    # Session Affinity for Socket.IO
    nginx.ingress.kubernetes.io/affinity: "cookie"
    nginx.ingress.kubernetes.io/session-cookie-name: "socketio"
spec:
  rules:
    - host: social.api.ambercare.app
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: social-api
                port:
                  number: 3000
    - host: preview.api.social.app
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: social-api
                port:
                  number: 3000
  tls:
    - hosts:
        - social.api.ambercare.app
        - preview.api.social.app
      secretName: social-api-tls
```

### 2. Update Service (Optional)

For better clarity, update the service port name:

```yaml
spec:
  type: NodePort
  selector:
    app: social-api
  ports:
    - name: websocket # Changed from 'http'
      port: 3000
      targetPort: 3000
      protocol: TCP
```

### 3. For Multi-Pod Deployments

If scaling beyond 1 replica, you MUST use Redis adapter:

1. Install dependencies:

```bash
pnpm add @socket.io/redis-adapter redis
```

2. Use the Redis adapter created in `src/websocket/adapters/redis-io.adapter.ts`

3. Update main.ts:

```typescript
import { RedisIoAdapter } from "./websocket/adapters/redis-io.adapter";

// Replace the default adapter
app.useWebSocketAdapter(new RedisIoAdapter(app));
```

4. Add Redis to your k8s deployment

### 4. Environment Variables

Add Socket.IO specific configs:

```yaml
- name: SOCKETIO_TRANSPORTS
  value: "websocket,polling"
- name: SOCKETIO_PING_TIMEOUT
  value: "60000"
- name: SOCKETIO_PING_INTERVAL
  value: "25000"
```

### 5. Health Check for WebSocket

Add a health endpoint that checks WebSocket status:

```typescript
@Get('health/websocket')
async checkWebSocket() {
  const stats = this.systemGateway.getConnectionStats();
  return {
    status: 'ok',
    connections: stats.totalConnections,
    namespaces: Object.keys(stats.connectionsByNamespace),
  };
}
```

## Testing Production Setup:

1. **Deploy with new Ingress**
2. **Test WebSocket connection**:

   ```javascript
   const socket = io("wss://social.api.ambercare.app", {
     transports: ["websocket", "polling"],
   });
   ```

3. **Verify sticky sessions** work for polling fallback
4. **Test reconnection** scenarios
5. **Monitor connection metrics**

## Alternative: Use Load Balancer Annotations

If using a cloud provider's load balancer directly:

### For AWS ALB:

```yaml
service.beta.kubernetes.io/aws-load-balancer-type: "alb"
service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "arn:aws:acm:..."
service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "http"
```

### For GCP:

```yaml
cloud.google.com/neg: '{"ingress": true}'
cloud.google.com/backend-config: '{"default": "websocket-backendconfig"}'
```

### For Azure:

```yaml
service.beta.kubernetes.io/azure-load-balancer-internal: "false"
```

## Conclusion

To enable Socket.IO in production, you MUST:

1. ✅ Add an Ingress resource with WebSocket annotations
2. ✅ Configure proper timeouts (3600s recommended)
3. ✅ Enable session affinity
4. ✅ Add WebSocket upgrade headers
5. ✅ Use Redis adapter for horizontal scaling

Without these changes, WebSocket connections will fail in production!
