class MonitoringController {
    performanceMetrics = new Map();
    maxMetricsPerEndpoint = 1000;

    async getMonitoringData(req, res) {
        try {
            const data = {
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage(),
            };
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Error fetching monitoring data:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }

    getPerformanceStats(req, res) {
        res.json({
            endpoints: this.getAllEndpointsStats(),
            systemInfo: {
                nodeVersion: process.version,
                platform: process.platform,
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage(),
            }
        })
    }

    getAllEndpointsStats() {
        const stats = [];
        this.performanceMetrics.forEach((_,endPoint) => {
            const endpointStats = this.getEndpointStats(endPoint);
            if (endpointStats) {
                stats.push(endpointStats);
            }
        });

        return stats;
    }

    getEndpointStats(endpoint) {
        const metrics = this.performanceMetrics.get(endpoint);
        if (!metrics || metrics.length === 0) {
            return null;
        }

        const responseTimes = metrics.map(m => m.responseTime);
        const sortedTimes = responseTimes.sort((a, b) => a - b);
        return {
            endpoint,
            totalRequests: metrics.length,
            averageResponseTime:
                responseTimes.reduce((a, b) => a + b, 0) / metrics.length,
            minResponseTime: Math.min(...responseTimes),
            maxResponseTime: Math.max(...responseTimes),
            p50: this.percentile(sortedTimes, 0.5),
            p90: this.percentile(sortedTimes, 0.9),
            p95: this.percentile(sortedTimes, 0.95),
            p99: this.percentile(sortedTimes, 0.99),
            successRate:
                (metrics.filter(m => m.statusCode < 400).length / metrics.length) * 100,
            recentMetrics: metrics.slice(-10), // Last 10 requests
        };
    }
    percentile(sortedArray, p) {
        const index = Math.ceil(p * sortedArray.length) - 1;
        return sortedArray[index] || 0;
    }
}

module.exports = MonitoringController;