# Index Management Guide (MongoDB + Mongoose)

This guide explains how to **design, create, monitor, and maintain indexes**
for the **v-social-media** project using **MongoDB** and **Mongoose**.

---

## 🎯 Goals

- Improve query performance
- Avoid unnecessary collection scans
- Reduce memory and write overhead
- Keep indexes aligned with real query patterns

---

## 📌 When to Create an Index

Create an index when:
- A field is frequently used in `find`, `sort`, or `filter`
- Queries scan many documents
- Pagination or sorting is slow
- A field must be unique (email, username)

Avoid indexing:
- Low-cardinality fields (`isActive`, `status`)
- Fields rarely used in queries

---

## 🧱 Index Types
- Single-field Index
```js
postSchema.index({ authorId: 1 });
```

- Compound Index
```js
postSchema.index({ authorId: 1, createdAt: -1 });
```
✔ Best for queries filtering by authorId and sorting by createdAt.

- Unique Index
```js
userSchema.index({ email: 1 }, { unique: true });
```
- Partial Index
```js
postSchema.index(
  { createdAt: -1 },
  { partialFilterExpression: { isDeleted: false } }
);
```
## 🧪 Validate Index Usage
```js
Use explain():

await Post.find({ authorId })
  .sort({ createdAt: -1 })
  .explain("executionStats");
```

- Expected:
    + IXSCAN
    + Low totalDocsExamined
    + ❌ Avoid: COLLSCAN

## 🧹 Removing Unused Indexes

- Check index stats:
```js
db.posts.aggregate([{ $indexStats: {} }])
```
- If accesses.ops === 0, consider removing:
```js
db.posts.dropIndex("old_index_name");
```

## ⚠️ Always verify in staging first.