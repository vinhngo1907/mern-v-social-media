# V Social Media Documentation

Welcome to the V Social Media documentation. This directory contains comprehensive guides and references for various aspects of the system.

## 📁 Documentation Structure

### 🗄️ [Database](/docs/database/)

Database optimization, indexing strategies, and query management.

- **[Index Management Guide](database/index-management-guide.md)** - Complete guide for managing database indexes
- **[Query Inventory](database/query-inventory.md)** - Tracking and optimization of all database queries

### 📊 [Monitoring](/docs/monitoring/)

System monitoring, metrics collection, and performance tracking.

- **[Setup Guide](monitoring/setup-guide.md)** - Initial monitoring setup
- **[Performance Guide](monitoring/performance-guide.md)** - Performance monitoring best practices
- **[Production Guide](monitoring/production-guide.md)** - Production monitoring strategies
- **[Enhanced Metrics](monitoring/enhanced-metrics.md)** - Advanced metrics configuration
- **[Latency Breakdown](monitoring/latency-breakdown.md)** - Detailed latency analysis

### 🧪 [Testing](/docs/testing/)
Testing strategies and tools.

- **[StepCI Guide](testing/stepci-guide.md)** - API testing with StepCI

### 🚀 [Deployment](/docs/deployment/)

Deployment configurations and guides.

- **[K3S Monitoring Setup](deployment/k3s-monitoring-setup.md)** - Kubernetes monitoring configuration

### 🔧 [API](/docs/api/)

API-specific documentation and examples.

- **[Daily Goal Progress](api/daily-goal-progress/)** - Daily goal tracking API
  - [Overview](api/daily-goal-progress/README.md)
  - [API Reference](api/daily-goal-progress/api-reference.md)
  - [Examples](api/daily-goal-progress/examples.md)
  - [Timezone Guide](api/daily-goal-progress/timezone-guide.md)

## 🚀 Quick Start

### For Database Optimization

1. Start with the [Index Management Guide](database/index-management-guide.md)
2. Review the [Query Inventory](database/query-inventory.md)
3. Use the monitoring tools to track performance

### For Monitoring Setup

1. Follow the [Setup Guide](monitoring/setup-guide.md)
2. Configure metrics using [Enhanced Metrics](monitoring/enhanced-metrics.md)
3. Deploy to production with [Production Guide](monitoring/production-guide.md)

### For Testing

1. Set up API tests with [StepCI Guide](testing/stepci-guide.md)
2. Integrate with CI/CD pipeline

## 📝 Contributing

When adding new documentation:

1. Place files in the appropriate subdirectory
2. Use kebab-case for file names (e.g., `my-new-guide.md`)
3. Update this README with links to new documents
4. Include a clear title and purpose at the top of each document

## 🔍 Finding Information

- **Database Performance Issues?** → Check [Database](database/) folder
- **Monitoring Setup?** → Check [Monitoring](monitoring/) folder
- **API Documentation?** → Check [API](api/) folder
- **Testing Strategies?** → Check [Testing](testing/) folder
- **Deployment Guides?** → Check [Deployment](deployment/) folder
