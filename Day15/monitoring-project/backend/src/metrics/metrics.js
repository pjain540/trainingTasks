const client = require("prom-client");

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Histogram → HTTP latency
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.3, 0.5, 1, 2]
});

// Counter → cache hits/misses
const cacheCounter = new client.Counter({
    name: "cache_operations_total",
    help: "Cache hits and misses",
    labelNames: ["type"] // hit / miss
});

// Gauge → active socket connections
const activeConnections = new client.Gauge({
    name: "active_socket_connections",
    help: "Active socket connections"
});

register.registerMetric(httpRequestDuration);
register.registerMetric(cacheCounter);
register.registerMetric(activeConnections);

module.exports = {
    register,
    httpRequestDuration,
    cacheCounter,
    activeConnections
};