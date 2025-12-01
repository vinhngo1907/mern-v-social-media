const router = require("express").Router();
const {MonitoringController} = require("../controllers");
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

router.get("performance", monitoringCtrl.getPerformanceStats);

router.get("health/performance", async(req, res) => {

});

module.exports = router;