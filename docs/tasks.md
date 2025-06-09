# Tasks

## 🛠 Backend (1 BE Engineer)
| Task                   | Description                          | Assigned To | Est. Time |
| ---------------------- | ------------------------------------ | ----------- | --------- |
| Auth & User Management | Basic auth, OAuth2, profile update   | 1 BE        | 2-3 days  |
| Posts CRUD             | Create, update, delete, get, explore | 1 BE        | 2-3 days  |
| Comments & Reactions   | Like, comment, reply                 | 1 BE        | 2 days    |
| Real-time Chat         | Socket.io: chat, call, video call    | 1 BE        | 3-5 days  |
| Notifications          | Events: like, follow, comment, etc.  | 1 BE        | 1-2 days  |
| Nearby & Explore       | Geo queries, trending posts          | 1 BE        | 1-2 days  |
| Stories (24h)          | Upload + time expiration             | 1 BE        | 1-2 days  |
| Ads Management         | Boost posts                          | 1 BE        | 2 days    |
| API for CMS            | Admin CRUD, moderation APIs          | 1 BE        | 2 days    |
| Integration            | Stripe, Twilio, file upload, etc.    | 1 BE        | 2-3 days  |

| **Total**              | **\~17-22 days**                     |             |           |

## 💻 Frontend Tasks (Client – packages/client)
| Task            | Description         | Assigned To | Est. Time |
| --------------- | ------------------- | ----------- | --------- |
| Admin Dashboard | User/posts overview | 1 FE        | 1 day     |
| Manage Posts    | Approve/delete      | 1 FE        | 1 day     |
| Manage Users    | Ban, view detail    | 1 FE        | 1 day     |
| Ads & Analytics | Boost stats, CTR    | 1 FE        | 1 day     |
| Reports         | Feedbacks, issues   | 1 FE        | 0.5–1 day |

| **Total**       | **\~11–15 FE days** |             |           |

## 🛠 CMS Tasks (Admin – packages/cms)
| Task            | Description         | Assigned To | Est. Time |
| --------------- | ------------------- | ----------- | --------- |
| Admin Dashboard | User/posts overview | 1 FE        | 1 day     |
| Manage Posts    | Approve/delete      | 1 FE        | 1 day     |
| Manage Users    | Ban, view detail    | 1 FE        | 1 day     |
| Ads & Analytics | Boost stats, CTR    | 1 FE        | 1 day     |
| Reports         | Feedbacks, issues   | 1 FE        | 0.5–1 day |
| **Total**       | ~4–5 FE days        |             |           |

## 📦 DevOps & Deployment
| Task          | Description         | Platform       | Est. Time |
| ------------- | ------------------- | -------------- | --------- |
| MongoDB Atlas | Cluster setup       | MongoDB Cloud  | 0.5 day   |
| Render        | API server deploy   | Render.com     | 0.5 day   |
| Netlify       | Client + CMS deploy | Netlify        | 0.5 day   |
| CI/CD         | Auto deploy on push | GitHub Actions | 1 day     |
| **Total**     | ~2.5 days           |                |           |

👥 Team & Time Estimation
| Role                  | Headcount    | Estimated Time                                  |
| --------------------- | ------------ | ----------------------------------------------- |
| Backend Engineer      | 1            | \~2.5 working days                              |
| Frontend Engineers    | 2 (parallel) | \~1.5 working days (shared \~3 days of FE work) |
| **Total for Phase 1** | —            | **\~2.5 – 3 working days**                      |

## 🚀 Project Phase Breakdown
### ✅ Phase 1: Core MVP Features
Goal: Launch quickly with core features to allow basic user activity and onboarding.

✔️ Features:
- [x] User Authentication (Sign up / Sign in with HTTP Basic & OAuth2)
- [x] Create, view, like, comment on posts
- [x] User search (by username, full name)
- [x] Basic CMS for admin control
- [x] Backend, Client, CMS setup (Docker + .env configs)

⏱ Time Estimate:
Backend: ~2.5 days

Frontend: ~1.5 days (with 2 devs in parallel)

Total: ~2.5 – 3 working days

### 🚧 Phase 2: Social Interactions & Realtime
Goal: Enhance social experience with interactive and real-time features.

✔️ Features:
- [x] Like & reply to comments
- [x] Follow / Unfollow users
- [x] Real-time chat (via socket.io)
- [x] Real-time notifications (likes, comments, follows)
- [ ] Group chat
- [x] Audio & video calls

⏱ Time Estimate:
- Backend: ~4–5 days

- Frontend: ~3–4 days

__=>Total:__ ~5–6 working days

### ✨ Phase 3: Stories, Explore & Business Tools
Goal: Expand social media capabilities and introduce engagement/monetization features.

✔️ Features:
- [ ] 24-hour stories (similar to Instagram)
- [ ]  People nearby (geo-based user suggestions)
- [x]  Explore page (trending content, discovery)
- [ ] Boost Post / Advertisements
- [ ] Advanced CMS (stats, reports, content moderation)
- [ ] Payment integration (Stripe or Momo if needed)

⏱ Time Estimate:
- Backend: ~5 days
- Frontend: ~4–5 days
__=>Total:__ ~6–7 working days

## 🛠 Suggested Add-ons (Phase 4+)

| Feature                                          | Purpose                                   |
| ------------------------------------------------ | ----------------------------------------- |
| 🎯 Push Notifications (Firebase Cloud Messaging) | Boost retention and engagement            |
| 📈 CMS Analytics Dashboard                       | Track user behaviors and content insights |
| 🌐 Multi-language Support (i18n)                 | Prepare for internationalization          |
| 🔐 Role-based Access Control (RBAC)              | Enhance security across CMS/API           |