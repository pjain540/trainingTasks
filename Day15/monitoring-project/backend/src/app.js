const express = require("express");
const { register, httpRequestDuration } = require("./metrics/metrics");

const app = express();

// Middleware for latency tracking
app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = (Date.now() - start) / 1000;

        httpRequestDuration
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .observe(duration);
    });

    next();
});

// Sample route
app.get("/test", (req, res) => {
    setTimeout(() => {
        res.json({ message: "Hello world" });
    }, Math.random() * 500);
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

module.exports = app;