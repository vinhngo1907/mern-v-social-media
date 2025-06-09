# V-Social-Media – Tasks Breakdown

## 🛠 Backend Tasks (1 BE Engineer)

| Task                   | Description                          | Est. Time |
| ---------------------- | ------------------------------------ | --------- |
| Auth & User Management | Basic auth, OAuth2, profile update   | 2–3 days  |
| Posts CRUD             | Create, update, delete, get, explore | 2–3 days  |
| Comments & Reactions   | Like, comment, reply                 | 2 days    |
| Real-time Chat         | Socket.io: chat, call, video call    | 3–5 days  |
| Notifications          | Like, follow, comment, etc. events   | 1–2 days  |
| Nearby & Explore       | Geo queries, trending posts          | 1–2 days  |
| Stories (24h)          | Upload + auto-expire                 | 1–2 days  |
| Ads Management         | Boost posts                          | 2 days    |
| API for CMS            | Admin CRUD, moderation               | 2 days    |
| Integration            | Stripe, Twilio, file upload, etc.    | 2–3 days  |
| **Total**              | **~17–22 days**                      | —         |

---

## 💻 Frontend Tasks (Client App – `packages/client`)

| Task            | Description         | Est. Time |
| --------------- | ------------------- | --------- |
| Admin Dashboard | User/posts overview | 1 day     |
| Manage Posts    | Approve/delete      | 1 day     |
| Manage Users    | Ban, view details   | 1 day     |
| Ads & Analytics | Boost stats, CTR    | 1 day     |
| Reports         | Feedbacks, issues   | 0.5–1 day |
| **Total**       | **~4–5 days**       | —         |

---

## 🛠 CMS Tasks (Admin Panel – `packages/cms`)

📌 *Same features & structure as Client Admin.*

| Task            | Description         | Est. Time |
| --------------- | ------------------- | --------- |
| Admin Dashboard | User/posts overview | 1 day     |
| Manage Posts    | Approve/delete      | 1 day     |
| Manage Users    | Ban, view details   | 1 day     |
| Ads & Analytics | Boost stats, CTR    | 1 day     |
| Reports         | Feedbacks, issues   | 0.5–1 day |
| **Total**       | **~4–5 days**       | —         |

---

## ⚙️ DevOps & Deployment

| Task          | Description           | Platform       | Est. Time |
| ------------- | --------------------- | -------------- | --------- |
| MongoDB Atlas | Cluster setup         | MongoDB Cloud  | 0.5 day   |
| Render        | Deploy API server     | Render.com     | 0.5 day   |
| Netlify       | Deploy Client + CMS   | Netlify        | 0.5 day   |
| CI/CD         | GitHub Actions config | GitHub Actions | 1 day     |
| **Total**     | **~2.5 days**         | —              | —         |

---

## 👥 Team & Time Estimation

| Role                  | Headcount    | Time Estimate                                  |
| --------------------- | ------------ | --------------------------------------------- |
| Backend Engineer      | 1            | ~2.5 working weeks                             |
| Frontend Engineers    | 2 (parallel) | ~1.5 working weeks (shared workload)           |
| **Total (Phase 1)**   | —            | **~2.5 – 3 working weeks**                     |

---

## 🚀 Project Phases

### ✅ Phase 1: Core MVP

🎯 Goal: Deliver a working social app with basic user & content features.

**Included Features**
- [x] User Authentication (Basic + OAuth2)
- [x] Posts: Create, view, like, comment
- [x] User Search (by name/username)
- [x] CMS for admin moderation
- [x] Setup Backend, Client & CMS (Docker, env)

⏱ Estimate:
- Backend: ~2.5 days
- Frontend: ~1.5 days
- **Total:** ~2.5–3 working days

---

### 🚧 Phase 2: Social Interactions & Realtime

🎯 Goal: Build engagement with interactive & real-time experience.

**Included Features**
- [x] Like & reply to comments
- [x] Follow / Unfollow users
- [x] Real-time chat (Socket.io)
- [x] Real-time notifications
- [ ] Group chat
- [x] Audio & video calls

⏱ Estimate:
- Backend: ~4–5 days
- Frontend: ~3–4 days
- **Total:** ~5–6 working days

---

### ✨ Phase 3: Stories, Explore & Monetization

🎯 Goal: Add user engagement and business features.

**Included Features**
- [ ] 24-hour Stories (auto-delete)
- [ ] Nearby Users (geo-location)
- [x] Explore page (trending/discovery)
- [ ] Boost Post / Advertisements
- [ ] Advanced CMS (stats, moderation)
- [ ] Payment (Stripe, Momo)

⏱ Estimate:
- Backend: ~5 days
- Frontend: ~4–5 days
- **Total:** ~6–7 working days

---

## 🧩 Suggested Add-ons (Phase 4+)

| Feature                                          | Purpose                                   |
| ------------------------------------------------ | ----------------------------------------- |
| 🎯 Push Notifications (FCM)                     | Increase retention                        |
| 📈 CMS Analytics Dashboard                      | Insight into user behavior                |
| 🌐 Multi-language (i18n)                        | Prepare for global users                  |
| 🔐 Role-based Access Control (RBAC)             | Secure CMS and APIs                       |