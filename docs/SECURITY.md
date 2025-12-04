# Security Policy

We take security very seriously.
If you find a vulnerability or unusual behavior, please report it using the instructions below.

---

## 🔒 1. Supported Versions

| Version | Status |
|--------|--------|
| main (production) | ✓ supported |
| dev (pre-release) | ✓ supported |
| old release | ✗ not supported |

---

## 🛑 2. Do not create a public issue for a security bug

⚠️ **Never post a security bug on GitHub Issues.**

Please report it privately:

📧 Security email: **security@yourdomain.com**
(or your personal email)

---

## 📩 3. How to report a security bug

When sending an email, please provide:

- A clear description of the vulnerability
- Reproduction steps
- Illustrative photos / videos
- POC code (if available)
- Impact of the vulnerability (data leak? RCE? privilege escalation?)
- Suggested fix (if available)

We will respond within **48 hours**.

---

## 🏆 4. Bounty / Credit (optional)

If the vulnerability is serious, you will receive:

- Credit in the release note
- Security contributor badge
- (If there is a bounty program) cash or gift reward

---

## 🔐 5. Security testing policy

Periodic testing projects:

- OWASP Top-10
- JWT / session check
- Rate-limit check
- SQL/NoSQL Injection check
- Dependency vulnerabilities check

---

## 🛡 6. What is considered a security flaw?

✓ Data leakage (email, token, password)
✓ Bypass authentication / authorization
✓ NoSQL/SQL injection
✓ RCE / SSRF / CSRF / XSS
✓ File upload vulnerability
✓ Publicly accessible sensitive endpoints

---

## 🚫 7. Not considered security flaws

✗ UI, layout, typo errors
✗ API returns ugly messages
✗ Small debug info that does not affect security
✗ Feature breakage but not security-related

---

Thank you for helping keep the project safe and secure! 🔐