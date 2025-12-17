const { httpRequestsTotal, httpDuration } = require("../utils/prometheus/metrics");

function prometheusMiddleware(req, res, next) {
    const start = process.hrtime();

    res.on("finish", () => {
        const diff = process.hrtime(start);
        const duration = diff[0] + diff[1] / 1e9;

        const route = req.route?.path || req.path;

        httpRequestsTotal.inc({
            method: req.method,
            route,
            status_code: res.statusCode,
        });

        httpDuration.observe(
            {
                method: req.method,
                route,
                status_code: res.statusCode,
            },
            duration,
        );
    });

    next();
};

module.exports = prometheusMiddleware