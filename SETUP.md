# AgriBloom Setup Guide

This guide explains how to set up, run, and deploy the AgriBloom platform (Backend, Web Dashboard, and Mobile App).

## 1. Prerequisites
- **Node.js** (v18+)
- **Git**
- **Expo CLI** (`npm install -g expo-cli eas-cli`)
- **PostgreSQL Database** (e.g., Neon Tech or local)
- **Vercel CLI** (optional, for manual web deployment)

## 2. Backend (Node.js/Express)
The backend powers the API, PostgreSQL database, and integrations (M-Pesa, SMS).

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file based on `.env.example`. Ensure `DATABASE_URL` is set to your PostgreSQL instance.
4. Run database migrations:
   ```bash
   npx prisma db push
   ```
5. Start the backend locally:
   ```bash
   npm run dev
   ```
   *The server runs on http://localhost:3000*

### Cloud Deployment (Railway/Render)
1. Push the repository to GitHub.
2. Link the repository to Railway or Render.
3. Set the Root Directory to `backend`.
4. Add the `DATABASE_URL` and other `.env` variables in the dashboard.
5. The build command (`npm run build`) and start command (`npm start`) will run automatically based on the `package.json`.

## 3. Web Dashboard (Next.js)
The Web Dashboard allows admins to view farm reports, KAMIS prices, and user analytics.

1. Navigate to the web directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
   *The dashboard is available at http://localhost:3000/dashboard*

### Vercel Deployment
1. Go to Vercel and Import your GitHub repo.
2. Set Root Directory to `web`.
3. Deploy!

## 4. Mobile App (React Native/Expo)
The Mobile app is the offline-first interface for Farmers.

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Expo development server:
   ```bash
   npx expo start
   ```
4. Download the **Expo Go** app on your Android/iOS device and scan the QR code to test.

### Generate APK (Android)
To build a standalone APK file (`<15MB`) for distribution to farmers:
```bash
npx eas-cli build --platform android --profile preview --local
```
*(Requires Android SDK to be installed on your machine. If not installed, remove `--local` to build on Expo's cloud servers).*
