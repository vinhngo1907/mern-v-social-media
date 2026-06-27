## 1. Dashboard Overview (Home)

- Total users, groups, posts, comments, active users today
- Recent activities (new groups, reported content, new registrations)
- Quick stats charts (user growth, post engagement, group activity)
- Pending items (join requests, reports, verification)

## 2. User Management

- List all users with search, filter (by role, status, registration date)
- View user profile + activity history
- Edit user info (name, email, avatar, bio, etc.)
- Ban / Suspend / Delete user
- Assign global roles
- Manage user settings (notification preferences, privacy)
- Export user data

## 3. Group / Community Management

- List all groups with search & filters
- Create / Edit / Delete groups
- View group details (members count, posts count, settings)
- Approve or reject group creation requests (if needed)
- Change group privacy, settings
- Manage group members (add/remove, change roles)
- Archive / Restore groups

## 4. Role & Permission Management (Very Important)
- **This is one of the strongest parts of your system.**

- **Capacity Management**
  - CRUD for Capacities (name, slug, resource, description)
  - Filter by resource (group, post, comment, user...)

- **Role Management**
  - Create / Edit / Delete Roles
  - Assign resource + group (for group-specific roles)
  - Assign multiple capacities to a role
  - View which users have this role

- **Policy Management**
  - Create direct policies for users
  - View all policies (filter by subject, resource, resourceId)
  - Override role permissions when needed


## 5. Content Management

- **Posts Management**
  - List all posts (global or per group)
  - Filter by group, author, status, date
  - View, Edit, Delete, Pin posts
  - Moderate reported posts

- **Comments Management**
  - List comments with parent post
  - Bulk delete, hide, or approve comments

- **Media Management**
  - View all uploaded images/videos
  - Moderate inappropriate media


## 6. Moderation Tools

- Reported Content (posts, comments, users, groups)
- Moderation Queue (pending join requests, post approvals)
- Ban list / Blacklist management
- Moderation logs (who deleted what, when)

## 7. Analytics & Reports

- User engagement analytics
- Group performance (most active groups)
- Content performance (top posts)
- Moderation statistics (reports resolved, actions taken)
- Export reports (CSV / PDF)

## 8. System Settings

- Global app settings (using your settingSchema)
- Email / Notification configuration
- Security settings (API rate limiting, etc.)
- Feature flags (enable/disable certain features)

## 9. Advanced / Nice-to-have Features

- Audit Log (track all admin actions)
- Multi-admin management with different permission levels
- Bulk actions (delete multiple posts, assign role to many users)
- Search across everything
- Dark mode + responsive design
- Activity timeline / Feed for admins

# Example Data (Ready to Seed)
```js 
// A. Resources
const resources = [
    { name: "group", description: "Social media group / community" },
    { name: "post", description: "Post in group or feed" },
    { name: "comment", description: "Comment on a post" },
    { name: "user", description: "User account & profile" }
];

```

```js
// B. Capacities

const capacities = [
    // Group Capacities
    { name: "View Group", slug: "view_group", resource: "group" },
    { name: "Join Group", slug: "join_group", resource: "group" },
    { name: "Create Post", slug: "create_post", resource: "group" },
    { name: "Delete Any Post", slug: "delete_any_post", resource: "group" },
    { name: "Manage Group Settings", slug: "manage_group_settings", resource: "group" },
    { name: "Remove Member", slug: "remove_member", resource: "group" },
    { name: "Invite Member", slug: "invite_member", resource: "group" },

    // Post Capacities
    { name: "Delete Own Post", slug: "delete_own_post", resource: "post" },
    { name: "Pin Post", slug: "pin_post", resource: "post" },
    { name: "Like Post", slug: "like_post", resource: "post" },

    // Comment Capacities
    { name: "Create Comment", slug: "create_comment", resource: "comment" },
    { name: "Delete Any Comment", slug: "delete_any_comment", resource: "comment" },

    // User Capacities
    { name: "Follow User", slug: "follow_user", resource: "user" },
    { name: "Send Message", slug: "send_message", resource: "user" },
    { name: "View Profile", slug: "view_profile", resource: "user" }
];

```

```js
// C. Roles
const roles = [
    // === Group Roles (group-specific) ===
    {
        name: "Group Admin",
        slug: "group_admin",
        resource: "group",
        group: groupId1,                    // specific group
        capacities: [/* all group capacities */]
    },
    {
        name: "Group Moderator",
        slug: "group_moderator",
        resource: "group",
        group: groupId1,
        capacities: [/* view_group, delete_any_post, remove_member, etc. */]
    },
    {
        name: "Group Member",
        slug: "group_member",
        resource: "group",
        group: groupId1,
        capacities: ["view_group", "create_post", "create_comment", "like_post"]
    },

    // === Global Roles ===
    {
        name: "Post Moderator",
        slug: "post_moderator",
        resource: "post",
        group: null,
        capacities: ["delete_any_post", "pin_post"]
    },
    {
        name: "Verified User",
        slug: "verified_user",
        resource: "user",
        group: null,
        capacities: ["follow_user", "send_message"]
    }
];
```

# Permission Considerations for CMS Dashboard
- Since you have Roles + Capacities, you should create these Admin Capacities:

```access_cms_dashboard```
```manage_users```
```manage_groups```
```manage_roles```
```manage_policies```
```moderate_content```
```view_analytics```
```manage_settings```

- Then create roles like:

  - Super Admin → All capacities
  - Content Moderator → Only moderate_content + view reports
  - Group Manager → manage_groups + manage_roles (limited)