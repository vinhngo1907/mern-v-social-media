const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
    name: "vsm_http_requests_total",
    help: "Total HTTP requests",
    labelNames: ["method", "route", "status_code"],
});

const httpDuration = new client.Histogram({
    name: "vsm_http_request_duration_seconds",
    help: "HTTP request latency",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 3, 5],
});

module.exports = {
    client,
    httpRequestsTotal,
    httpDuration,
};
