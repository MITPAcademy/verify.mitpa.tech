# PRACTA User Verification Frontend

This is the official frontend for PRACTA’s user verification system. It allows users to verify their identity using a unique ID and optional email, protected by reCAPTCHA and enhanced with toast notifications for user feedback.

> 🧠 Used during onboarding and validation of new users on the PRACTA platform.

---

## 🌐 Live Demo

This component is typically embedded or opened via a verification link like:

```
https://verify.practa.tech/?id=USER_ID
```

---

## ⚙️ Features

- ✅ Secure email input with sanitization and validation
- 🧪 reCAPTCHA integration to block bots
- ✉️ Sends email verification code via API
- 🔐 Final user verification with code
- 🔄 Auto closes window after success
- 📱 Fully responsive design
- 🎨 Clean UX with toast feedback

---

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/practacademy/verify.practa.tech.git
cd verify.practa.tech
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_API_GENERATE_CODE_URL=https://api.practa.tech/generate-code
VITE_API_VERIFY_CODE_URL=https://api.practa.tech/verify-code
VITE_API_VERIFY_USER_URL=https://api.practa.tech/verify-user
VITE_RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
```

> 🔐 Never commit your `.env` file to version control.

### 4. Run locally

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧩 Tech Stack

- **React**
- **TypeScript**
- **reCAPTCHA v2**
- **React Toastify**
- **Custom API Integration**
- **CSS Modules**

---

## 🛠️ Contributing

We welcome contributions to improve user experience, accessibility, and performance.

1. Fork the repository
2. Create a new branch: `feature/my-feature`
3. Commit your changes
4. Open a pull request with a clear description

---

## 📫 Contact

If you have any suggestions, issues, or ideas:

- Join us at [practa.tech/discord](https://practa.tech/discord)
- Or email us: support@practa.tech