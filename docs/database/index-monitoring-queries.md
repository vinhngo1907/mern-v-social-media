
---

# 📙 `index-monitoring-queries.md`

```md
# Index Monitoring Queries (MongoDB / Mongoose)

This document contains **ready-to-use MongoDB queries**
to monitor index health and query performance.

---

## 📋 List All Indexes
- Get index:
```js
db.posts.getIndexes()
```
- Mongoose:
```js
await Post.collection.indexes();
```
## 📊 Index Usage Statistics
```js
db.posts.aggregate([{ $indexStats: {} }])
```
- Fields to check:
    + accesses.ops
    + accesses.since

## 🐌 Slow Query Detection

- Enable profiler:
```js
db.setProfilingLevel(1, { slowms: 100 })
```

### View slow queries:
```js
db.system.profile.find().sort({ ts: -1 }).limit(10)
```
### 🔍 Explain Query Plan
```js
db.posts.find({ authorId }).explain("executionStats")
```
- Expected:
+ IXSCAN
+ Low docsExamined

### 🧹 Identify Unused Indexes
```js
db.posts.aggregate([
  { $indexStats: {} },
  { $match: { "accesses.ops": 0 } }
])
```

### 🔄 Validate Collection
```js 
    db.posts.validate({ full: true })
```

## 📈 Atlas Metrics (Optional)

- If using MongoDB Atlas:
    + Query Execution Time
    + Index Hit Ratio
    + Slow Query Logs

## 🏁 Summary
- Use these queries to:
    + Detect unused indexes
    + Prevent performance regressions
    + Keep MongoDB healthy in production