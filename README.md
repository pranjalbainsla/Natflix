# Natflix - Movie Review and Browsing App

A React application for movie search and real-time anonymous community reviews — optimized for performance and accessibility.

## Features

- Movie search via Cloud Run API
- Anonymous comments backed by **Firebase Firestore** (no login required)
- Fully responsive design

## Tech stack

`React.js` · `Vite` · `Firebase Firestore` · `Tailwind CSS`

## Setup

1. Copy environment variables:
  ```bash
   cp .env.example .env.local
  ```
2. Fill in Firebase and API values in `.env.local` (see `.env.example` for all keys).
3. Install and run:
  ```bash
   npm install
   npm run dev
  ```

## Firestore security rules

Deploy the rules in `[firestore.rules](firestore.rules)`:

```bash
firebase deploy --only firestore:rules
```

Rules enforce:

- Public read access to comments
- Create-only writes with `userName: "Anonymous"`, text length 1–500 chars, and no extra fields
- No update or delete

## Firebase App Check (recommended)

App Check helps block automated abuse of anonymous comment writes.

1. In [Firebase Console](https://console.firebase.google.com) → **App Check**, register your web app with **reCAPTCHA v3**.
2. Add the site key to `.env.local` as `VITE_RECAPTCHA_SITE_KEY`.
3. For local development, use a [debug token](https://firebase.google.com/docs/app-check/web/debug-provider):
  - In the browser console: `self.FIREBASE_APPCHECK_DEBUG_TOKEN = true` (or your registered debug token).
  - Register the debug token in Firebase Console → App Check → Manage debug tokens.

App Check initializes automatically when `VITE_RECAPTCHA_SITE_KEY` is set (see `[firebase.js](firebase.js)`).

## Project structure

```
src/
├── constants/config.js      # Environment variable reads
├── services/
│   ├── moviesApi.js         # Movie fetch API
│   └── commentsService.js   # Firestore comment read/write
├── hooks/
│   ├── useMovies.js         # Search + debounced movie loading
│   └── useComments.js       # Real-time comments + submit
└── components/
    ├── Search.jsx
    ├── Movie.jsx
    └── Chat.jsx
```

## Escalation path (if spam becomes an issue)

Move comment writes behind your Cloud Run backend with IP rate limiting, while keeping Firestore reads client-side or via API.