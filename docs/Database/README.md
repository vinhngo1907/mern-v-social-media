# Database Documentation

This directory contains **database-related documentation** for the **v-social-media** project, focusing on **MongoDB** and **Mongoose** usage, optimization, indexing, and query analysis.

The goal is to ensure:
- Efficient query performance
- Proper index usage
- Scalable database design
- Easy maintenance and monitoring

---

## 📚 Available Guides

### 📘 [Index Management Guide](index-management-guide.md)

Comprehensive guide for managing **MongoDB indexes using Mongoose**, including:

- Index creation strategies
- Compound vs single-field indexes
- Index naming conventions
- Index lifecycle (create, monitor, drop)
- Best practices for production MongoDB

---

### 📗 [Query Inventory](query-inventory.md)

Centralized inventory of **MongoDB/Mongoose queries** used across the application:

- Common query patterns
- Query frequency and usage
- Collection-level access overview
- Index coverage tracking
- High-risk / performance-critical queries

---

### 📙 [Index Monitoring Queries](index-monitoring-queries.md)

Ready-to-use **MongoDB & Mongoose queries** for index monitoring and performance analysis:

- Index usage statistics (`$indexStats`)
- Slow query detection
- Query execution plans (`explain`)
- Unused index identification
- Collection-level performance insights

---

## 🎯 Quick Reference

### Current Index Focus Areas

#### Users Collection
- ✅ `email_1` — Unique index for authentication
- ✅ `username_1` — Unique index for profile lookup
- ✅ `createdAt_-1` — Sorting recent users

#### Posts Collection
- ✅ `authorId_1` — Fetch posts by user
- ✅ `createdAt_-1` — Timeline / feed sorting
- ✅ `{ authorId: 1, createdAt: -1 }` — User feed optimization

#### Comments Collection
- ✅ `postId_1` — Fetch comments per post
- ✅ `{ postId: 1, createdAt: -1 }` — Sorted comment listing

---

## 🚀 Performance Improvements (Examples)

- User feed loading: **~90% faster** after compound indexing
- Post detail queries: **~85% fewer scanned documents**
- Comment pagination: **Stable response time under load**

---

## 🔧 Common Tasks

### 🔍 Check Index Usage

```js
db.posts.aggregate([{ $indexStats: {} }])
```
or via Mongoose:
```js
    await Post.aggregate([{ $indexStats: {} }]);
```

### 🧪 Analyze a Query
```js
await Post.find({ authorId: userId })
  .sort({ createdAt: -1 })
  .limit(10)
  .explain("executionStats");
```
- Look for:
    ✅ IXSCAN
    ❌ COLLSCAN

### 🐌 Monitor Slow Queries
#### Enable profiler:
```js
db.setProfilingLevel(1, { slowms: 100 })
```
#### View logs:
```js
db.system.profile.find().sort({ ts: -1 }).limit(10)
```
### 🧩 Example Index Definition (Mongoose)
```js
const postSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

postSchema.index({ authorId: 1, createdAt: -1 });
```

### 📋 Maintenance Schedule

- Daily
    + Monitor slow query logs (MongoDB profiler / Atlas)
- Weekly
    + Review index usage via $indexStats
    + Check new query patterns
- Monthly
    + Identify and remove unused indexes
    + Review high-traffic collections
- Quarterly
    + Full index & query audit
    + Re-evaluate schema and access patterns

### 🏁 Notes
- Always test index changes in staging before production
- Avoid over-indexing (writes become slower)
- Prefer compound indexes for frequent multi-field queries
- Keep documentation in this directory up to date