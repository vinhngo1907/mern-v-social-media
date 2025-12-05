const router = require("express").Router();
const { MonitoringController } = require("../controllers");
const monitoringCtrl = new MonitoringController();

router.get("/status", (req, res) => {
    res.json({ status: "Monitoring service is running" });
});

router.get("/metrics", (req, res) => {
    // Example metrics data
    const metrics = {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
    };
    res.json(metrics);
});

router.get("/performance", monitoringCtrl.getPerformanceStats);
router.get("/performance/:endpoint", (req, res) => {
    const endpoint = req.params.endpoint;
    const stats = monitoringCtrl.getEndpointStats(endpoint);
    if (!stats) {
        return res.status(404).json({
            success: false,
            message: "No performance data found for the specified endpoint"
        });
    }

    res.json({
        success: true,
        message: "Get performance statistics for specific endpoint",
        data: stats
    });
});

router.get("health/performance", async (req, res) => {
    try {
        const allStats = monitoringCtrl.getAllEndpointsStats();
        const criticalEndpoints = allStats.filter(stat =>
            stat.p95 > 3000 || stat.averageResponseTime > 1000
        );

        const poorEndpoints = allStats.filter(
            stat => stat.p95 > 1000 && stat.p95 <= 3000,
        );
        
        const healthStatus =
            criticalEndpoints.length > 0
                ? 'critical'
                : poorEndpoints.length > 3
                    ? 'poor'
                    : poorEndpoints.length > 0
                        ? 'fair'
                        : 'healthy';


        const data = {
            status: healthStatus,
            summary: {
                totalEndpoints: allStats.length,
                criticalEndpoints: criticalEndpoints.length,
                poorEndpoints: poorEndpoints.length,
                averageResponseTime:
                    allStats.reduce((sum, stat) => sum + stat.averageResponseTime, 0) /
                    (allStats.length || 1),
            },
            criticalEndpoints: criticalEndpoints.map(e => ({
                endpoint: e.endpoint,
                averageResponseTime: e.averageResponseTime,
                p95: e.p95,
            })),
            recommendations: monitoringCtrl.generatePerformanceRecommendations(allStats),
        };

        res.status(200).json({
            success: true,
            data,
            message: "Performance health data fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching monitoring data:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.get("requests", async (req,res) => {
    const filters = req.query;
    const parsedFilters = {
        ...filters,
        startTime: filters.startTime ? new Date(filters.startTime) : undefined,
        endTime: filters.endTime ? new Date(filters.endTime) : undefined,
        limit: filters.limit ? parseInt(filters.limit) : 100,
    }
    const data = await monitoringCtrl.getRequestHistory(parsedFilters);
    res.status(200).json({
        success: true,
        data,
        message: "Request logs fetched successfully"
    });
});

module.exports = router;