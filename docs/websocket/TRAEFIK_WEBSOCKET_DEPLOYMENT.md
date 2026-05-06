# WebSocket/Socket.IO Deployment with K3s and Traefik

## Good News! 🎉

Traefik (the default ingress controller in K3s) has **excellent WebSocket support out of the box**! Unlike NGINX, Traefik automatically handles WebSocket upgrade headers without additional configuration.

## Current Status with Traefik

### ✅ What Works Automatically

1. **WebSocket Protocol Upgrade** - Traefik detects and handles `Upgrade: websocket` headers
2. **Connection Persistence** - Long-lived connections are maintained
3. **HTTP/2 and WebSocket** - Traefik properly handles both protocols

### ⚠️ What Still Needs Configuration

1. **Sticky Sessions** - Only required for Socket.IO polling fallback, NOT for WebSocket connections
2. **Timeouts** - Default timeouts might be too short
3. **Ingress Resource** - Need to add to your manifests.yml

**WebSocket Note**: WebSocket connections are persistent TCP connections that do NOT need sticky sessions. Sticky sessions are exclusively for the HTTP polling transport mechanism.

## Quick Fix for Your Deployment

### Option 1: Simple Ingress (Recommended for Quick Setup)

Add this to your `k8s/manifests.yml`:

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: social-api
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
spec:
  ingressClassName: traefik
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
  tls:
    - hosts:
        - social.api.ambercare.app
      secretName: social-api-tls
```

**This alone should be enough to get WebSockets working!**

### Option 2: Advanced Configuration with Sticky Sessions (Polling Fallback Only)

Use the IngressRoute CRD for more control (see `k8s/websocket-traefik-ingress.yaml`):

- Sticky sessions ONLY for Socket.IO polling fallback
- WebSocket connections do NOT require sticky sessions
- Custom timeouts for long-lived connections
- Header middleware for security

**Important**: Sticky sessions are a safety net for HTTP polling, not a requirement for WebSocket connections.

## Testing WebSocket Connection

1. **Deploy the Ingress**:

```bash
kubectl apply -f k8s/manifests.yml
```

2. **Test from Browser**:

```javascript
const socket = io("wss://social.api.ambercare.app", {
  transports: ["websocket"], // Force WebSocket only for testing
});

socket.on("connect", () => {
  console.log("Connected!", socket.id);
});
```

3. **Check Traefik Dashboard** (if enabled):

```bash
# Port-forward to Traefik dashboard
kubectl port-forward -n kube-system deployment/traefik 9000:9000
# Visit http://localhost:9000/dashboard/
```

## Traefik vs NGINX for WebSockets

| Feature            | Traefik             | NGINX                   |
| ------------------ | ------------------- | ----------------------- |
| WebSocket Support  | ✅ Automatic        | ❌ Requires annotations |
| Upgrade Headers    | ✅ Auto-handled     | ❌ Manual config        |
| HTTP/2 + WebSocket | ✅ Works            | ⚠️ Complex              |
| Configuration      | ✅ Minimal          | ❌ Verbose              |
| Sticky Sessions    | ⚠️ Via IngressRoute | ✅ Simple annotation    |

## Troubleshooting

### 1. Check if Traefik is Running

```bash
kubectl get pods -n kube-system | grep traefik
```

### 2. Check Ingress Status

```bash
kubectl get ingress social-api
kubectl describe ingress social-api
```

### 3. View Traefik Logs

```bash
kubectl logs -n kube-system deployment/traefik
```

### 4. Common Issues

**WebSocket Connection Fails:**

- Check TLS certificate is valid
- Ensure service is running: `kubectl get svc social-api`
- Verify endpoints: `kubectl get endpoints social-api`

**Connection Drops After ~30s:**

- Add ServersTransport with longer timeouts (see advanced config)

**Socket.IO Polling Fallback Issues:**

- Use IngressRoute with sticky sessions
- Or force WebSocket transport only in client

## Minimal Required Changes

For basic WebSocket support with Traefik, you only need to:

1. **Add the simple Ingress** to your manifests.yml
2. **Ensure your Service is type ClusterIP** (not NodePort):

```yaml
spec:
  type: ClusterIP # Change from NodePort
  selector:
    app: social-api
  ports:
    - name: http
      port: 3000
      targetPort: 3000
```

That's it! Traefik will handle the rest.

## Production Recommendations

1. **Use IngressRoute** for production for better control
2. **Enable Sticky Sessions** if using Socket.IO polling
3. **Monitor WebSocket Connections** via Traefik metrics
4. **Set Appropriate Timeouts** based on your use case
5. **Use Redis Adapter** for multi-pod deployments

## Summary

With K3s and Traefik, you're **much closer to WebSocket support** than with standard Kubernetes and NGINX. The main requirement is just adding an Ingress resource - Traefik handles WebSocket protocol automatically!
