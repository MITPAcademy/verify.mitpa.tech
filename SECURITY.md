# Security Policy

## 🔐 Overview

This user verification interface is part of the MITPA ecosystem and is designed with security and user trust in mind. It interacts with sensitive endpoints related to email and identity verification. This document outlines the key security practices we follow.

---

## ✅ Current Security Measures

### 1. **CAPTCHA Verification**
- Uses **Google reCAPTCHA v2** to prevent automated and malicious access.

### 2. **Input Sanitization**
- All inputs (email, code) are sanitized client-side to block potential XSS or injection attempts.
- Disallowed characters are stripped before sending to API.

### 3. **Toast-based Feedback**
- No use of `alert()` to prevent UI disruption and injection abuse.
- Secure, inline toast notifications are used for all user feedback.

### 4. **Environment Variables**
- API URLs and reCAPTCHA keys are stored securely in `.env` files.
- These are never exposed or committed to version control.

### 5. **HTTPS Usage**
- All production deployments must use **HTTPS** for secure data transmission.

### 6. **Responsive Layout**
- Interface is built with mobile-first principles to avoid layout manipulation and maintain consistency.

---

## ⚠️ Potential Vulnerabilities (monitored)

- Brute-force attempts on code input (rate-limiting suggested server-side)
- Abuse of verification endpoint with spoofed `id` (handled server-side)

---

## 🧪 Secure Development Tips

- Always validate inputs server-side as well.
- Use rate-limiting and CAPTCHA score thresholds.
- Log suspicious activity (e.g., failed attempts or unusual request volume).
- Regularly rotate email and verification code secrets.

---

## 🤝 Report a Vulnerability

If you find a security vulnerability:

1. **Do not open a public issue.**
2. Report it **privately and responsibly** via:
    - 📧 Email: security@mitpa.tech

We respond to all security reports within **48 hours**.

---

## 🛠️ Planned Improvements

- Add OTP length enforcement and lockout mechanism on frontend.
- Visual feedback on password strength for future auth pages.
- Optional biometric authentication (WebAuthn) support in 2025.
- Integration with MITPA SSO.

---

Thank you for helping keep MITPA secure for all students and contributors. 🔒