
---

# 📗 `query-inventory.md`

```md
# Query Inventory

This document tracks **important MongoDB/Mongoose queries**
used in the **v-social-media** application.

Purpose:
- Understand query patterns
- Ensure index coverage
- Identify performance risks

---

## 🧑 Users Collection

### Find user by email
```js
User.findOne({ email })
```
- Frequency: High
- Index: ✅ email_1
- Risk: Low

### Search user profile:
```js
User.findOne({ username })
```
- Frequency: High
- Index: ✅ username_1

## 📝 Posts Collection
### User feed
```js
Post.find({ authorId })
  .sort({ createdAt: -1 })
  .limit(20)
```
- Frequency: Very High
- Index: ✅ { authorId: 1, createdAt: -1 }
- Critical: Yes

### Post detail
```js
Post.findById(postId)
```
- Frequency: High
- Index: ✅ _id

## 💬 Comments Collection
### Fetch comments by post
```js
Comment.find({ postId })
  .sort({ createdAt: -1 })
```
- Frequency: Medium
- Index: ✅ { postId: 1, createdAt: -1 }

## ❤️ Likes Collection
### Check user liked post
```js
Like.findOne({ userId, postId })
```
- Frequency: High
- Index: ✅ { userId: 1, postId: 1 }
- Unique: Yes

## 🚨 High-Risk Queries
| Query              | Risk   | Reason           |
| ------------------ | ------ | ---------------- |
| Global search      | High   | Regex, no index  |
| Feed without limit | High   | Large result set |
| Aggregations       | Medium | CPU intensive    |