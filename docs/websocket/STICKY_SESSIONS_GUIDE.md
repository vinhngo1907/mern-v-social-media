# Sticky Sessions Configuration for Socket.IO with Traefik

## Overview

Sticky sessions (session affinity) are specifically designed for Socket.IO's HTTP polling fallback mechanism. They ensure that all polling requests from a client are routed to the same backend pod. **Important: Sticky sessions do NOT apply to WebSocket connections, which maintain their own persistent state.**

## Why Sticky Sessions Matter (for Polling Fallback)

1. **Polling Transport Only**: Sticky sessions are exclusively for HTTP long-polling scenarios
2. **WebSocket Connections**: Do NOT require sticky sessions
3. **Polling Session Management**: Ensures polling requests hit the same backend pod
4. **Without Sticky Sessions**: Polling fallback may experience connection disruptions

## Current Configuration Options

### Option 1: Basic Ingress (Limited Support)

The standard Kubernetes Ingress with Traefik has limited sticky session support:

```yaml
annotations:
  traefik.ingress.kubernetes.io/affinity: "true"
  traefik.ingress.kubernetes.io/session-cookie-name: "socketio"
```

⚠️ **Limitations**: Basic cookie-based affinity, limited configuration options

### Option 2: IngressRoute CRD (Recommended)

Use Traefik's IngressRoute for full sticky session control:

```yaml
# Located at: k8s/traefik-ingressroute.yml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: social-api
spec:
  routes:
    - match: Host(`social.api.ambercare.app`)
      services:
        - name: social-api
          port: 3000
          sticky:
            cookie:
              name: socketio-affinity
              secure: true
              httpOnly: true
              sameSite: none
```

## Deployment

### Integrated IngressRoute (Current Setup)

The IngressRoute is now integrated directly into `k8s/manifests.yml` with:

- Sticky sessions for `/socket.io/*` paths only
- Regular load balancing for all other API endpoints

```bash
# Deploy normally - IngressRoute is included
kubectl apply -f k8s/manifests.yml

# Or via CI/CD - automatically handled
git push
```

### Verify Deployment

```bash
# Check if IngressRoute is created
kubectl get ingressroute social-api

# Check route details
kubectl describe ingressroute social-api
```

## Testing Sticky Sessions

### 1. Browser DevTools Test

```javascript
// Force polling transport to test sticky sessions
const socket = io("wss://social.api.ambercare.app", {
  transports: ["polling"], // Force polling instead of websocket
});

socket.on("connect", () => {
  console.log("Connected via polling:", socket.id);
});
```

Check for the `socketio-affinity` cookie in:

- Chrome: DevTools → Application → Cookies
- Firefox: DevTools → Storage → Cookies

### 2. Multiple Connection Test

```javascript
// Create multiple connections
const sockets = [];
for (let i = 0; i < 5; i++) {
  const socket = io("wss://social.api.ambercare.app", {
    transports: ["polling"],
    forceNew: true,
  });

  socket.on("connect", () => {
    console.log(`Socket ${i} connected:`, socket.id);
  });

  sockets.push(socket);
}
```

### 3. Pod Verification

```bash
# Scale to multiple pods
kubectl scale deployment social-api --replicas=3

# Watch pod logs to verify same client hits same pod
kubectl logs -f -l app=social-api --all-containers --prefix=true
```

## Configuration Details

### Cookie Settings

- **name**: `socketio-affinity` - Identifies the sticky session cookie
- **secure**: `true` - Cookie only sent over HTTPS
- **httpOnly**: `true` - Cookie not accessible via JavaScript (security)
- **sameSite**: `none` - Allows cross-site requests (for APIs)

### Timeout Configuration

The IngressRoute also includes timeout settings for long-lived connections:

```yaml
forwardingTimeouts:
  dialTimeout: 30s
  responseHeaderTimeout: 3600s # 1 hour
  idleConnTimeout: 3600s # 1 hour
```

## Troubleshooting

### Issue: Cookie Not Being Set

**Symptoms**: No `socketio-affinity` cookie in browser

**Solutions**:

1. Ensure using HTTPS (cookies have `secure: true`)
2. Check CORS configuration allows credentials
3. Verify IngressRoute is active: `kubectl get ingressroute`

### Issue: Still Hitting Different Pods

**Symptoms**: Connection failures, different pod logs for same client

**Solutions**:

1. Clear browser cookies and retry
2. Check if Service has `sessionAffinity: None` (should be)
3. Verify only one Ingress/IngressRoute exists for the host

### Issue: WebSocket Works but Polling Fails

**Symptoms**: WebSocket connects fine, but forcing polling fails

**Solutions**:

1. This indicates sticky sessions aren't working
2. Switch to IngressRoute configuration
3. Ensure all pods are healthy

## WebSocket vs Polling: Connection Handling

### WebSocket Connections

- **Persistent TCP Connection**: WebSocket maintains a single, long-lived connection
- **State Management**: Connection state is inherently maintained by the WebSocket protocol
- **No Sticky Sessions Needed**: Each WebSocket connection is a dedicated, stateful channel

### Polling Fallback

- **Short-Lived HTTP Requests**: Polling uses multiple short HTTP requests
- **Requires Session Affinity**: Each polling request needs to reach the same backend pod
- **Sticky Sessions Help**: Ensure polling requests maintain session context

## Best Practices

1. **Prefer WebSocket Transport**: Configure clients to use WebSocket when possible

   ```javascript
   const socket = io({
     transports: ["websocket", "polling"], // WebSocket first
   });
   ```

2. **WebSocket-Only Configuration**: For environments with stable WebSocket support

   ```javascript
   const socket = io({
     transports: ["websocket"], // No polling fallback
     upgrade: false, // Prevent automatic fallback
   });
   ```

3. **Monitor Cookie Expiry**: Default session cookies expire on browser close

4. **Health Checks**: Ensure all pods pass health checks to prevent routing to unhealthy pods

5. **Scaling Considerations**: Sticky sessions mean uneven load distribution - monitor pod resources

## Production Checklist

- [ ] Deploy using IngressRoute for full sticky session control
- [ ] Configure appropriate timeouts for your use case
- [ ] Test with multiple replicas before production
- [ ] Monitor pod resource usage for imbalances
- [ ] Set up alerts for connection failures
- [ ] Document cookie name for debugging

## Alternative: Force WebSocket Only

If sticky sessions prove problematic, consider WebSocket-only mode:

```javascript
const socket = io({
  transports: ["websocket"], // No fallback to polling
  upgrade: false, // Don't upgrade from polling
});
```

This eliminates the need for sticky sessions but requires reliable WebSocket support.
