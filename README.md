# Jobs App - Frontend

A React + Vite frontend application for AI-powered interview preparation. Users can upload their resume and a job description URL to get personalized interview questions and an elevator pitch.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4
- **Authentication:** Firebase Auth
- **Language:** JavaScript/JSX

## Prerequisites

- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Firebase Project** - For authentication

## Environment Variables

Create a `.env` file in the `jobs-app` directory:

```bash
# Backend API URL
VITE_API_URL=http://localhost:8080
```

**Note:** All environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

## Getting Started

### 1. Install Dependencies

```bash
cd jobs-app
npm install
```

### 2. Configure Environment

Create a `.env` file:
```bash
VITE_API_URL=http://localhost:8080
```

For production, set `VITE_API_URL` to your deployed backend URL:
```bash
VITE_API_URL=https://your-backend.railway.app
```

### 3. Configure Firebase

The app uses Firebase for authentication. Make sure your Firebase configuration is set up in `src/config/firebase.js`.

### 4. Run Development Server

```bash
npm run dev
```

The app will start on `http://localhost:5173` (Vite's default port).

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```
Builds the app for production to the `dist` folder. The build is optimized and minified.

The output will be in `dist/` directory:
- `dist/index.html` - Main HTML file
- `dist/assets/` - JavaScript, CSS, and other assets

### Preview Production Build

```bash
npm run preview
```
Preview the production build locally before deploying. Serves the `dist` folder.

### Lint Code

```bash
npm run lint
```
Runs ESLint to check for code quality issues.

## Project Structure

```
jobs-app/
├── public/
│   ├── fav.svg          # Favicon
│   └── vite.svg         # Vite logo
├── src/
│   ├── assets/
│   │   └── aiinterview.png
│   ├── components/
│   │   ├── Error.jsx        # Error display component
│   │   ├── Loading.jsx      # Loading spinner
│   │   ├── Login.jsx        # Login page
│   │   ├── Resume.jsx       # Main resume upload page
│   │   └── Signup.jsx       # Signup page
│   ├── config/
│   │   └── firebase.js      # Firebase configuration
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles
│   └── Navbar.jsx           # Navigation component
├── dist/                     # Build output (generated, not in git)
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel configuration (SPA routing)
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

## Building for Production

### Standard Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Build Configuration

The build is configured in `vite.config.js`. To customize:
- Output directory
- Build optimizations
- Asset handling

### Serving the Production Build

#### Option 1: Preview (local testing)
```bash
npm run preview
```

#### Option 2: Serve with a static server

**Using Python:**
```bash
cd dist
python3 -m http.server 8000
```

**Using Node.js serve:**
```bash
npm install -g serve
serve -s dist -l 8000
```

**Using nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/jobs-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Deployment

### Vercel (Current Production Setup)

This frontend is currently deployed to Vercel. Here's how to deploy:

#### Prerequisites

1. **Vercel Account:** Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository:** Push your code to GitHub (recommended)

#### Initial Setup

**Option 1: Via Vercel Dashboard (Recommended)**

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import project in Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `jobs-app` directory (if repo is monorepo)

3. **Configure build settings:**
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)

4. **Set environment variables:**
   - Go to Project Settings → Environment Variables
   - Add the following:
     ```
     VITE_API_URL=https://your-cloudfront-url.cloudfront.net
     ```
   - Or for local backend: `VITE_API_URL=http://localhost:8080`

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically

**Option 2: Via Vercel CLI**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd jobs-app
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? (No for first time)
   - Project name: `jobs-app` (or your choice)
   - Directory: `./` (if already in jobs-app)
   - Override settings? (No, use defaults)

4. **Set environment variables:**
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend URL when prompted
   ```

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

#### Environment Variables

**Required:**
- `VITE_API_URL` - Your backend API URL (e.g., `https://ds8f4k0khqfdn.cloudfront.net`)

**Optional (if using Firebase env vars):**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

**Setting via Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Click "Save"
5. **Redeploy** for changes to take effect

**Setting via CLI:**
```bash
vercel env add VITE_API_URL production
# Enter value when prompted
```

#### SPA Routing Configuration

The app uses `vercel.json` for SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes (like `/resume`, `/login`) serve `index.html` for client-side routing.

**Note:** `vercel.json` is already configured in the project root.

#### Build Configuration

Vercel automatically detects Vite projects. Default settings:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x (auto-detected)

To customize, create `vercel.json` with build settings:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

#### Firebase Configuration

The app uses Firebase for authentication. Configuration is in `src/config/firebase.js`:

- **Client keys are public** - Safe to commit to Git
- Firebase client keys are designed to be exposed in frontend code
- Only backend service account keys need to be secret

If you want to use environment variables instead:
1. Update `firebase.js` to use `import.meta.env.VITE_FIREBASE_*`
2. Set variables in Vercel dashboard
3. Redeploy

#### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `prep-jobs-ai.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

#### Preview Deployments

Every push to a branch creates a preview deployment:
- **Preview URL:** `https://jobs-app-git-branch-name.vercel.app`
- **Production URL:** `https://prep-jobs-ai.vercel.app` (or your custom domain)

Preview deployments use the same environment variables as production (unless overridden).

#### Troubleshooting

**Build fails:**
- Check build logs in Vercel dashboard
- Ensure `package.json` has correct build script
- Verify Node.js version (should be 18+)

**Environment variables not working:**
- **Important:** Vite env vars are embedded at **build time**
- After adding/changing env vars, you **must redeploy**
- Check variable names start with `VITE_`
- Verify variables are set for correct environment (Production/Preview)

**404 on page refresh:**
- Ensure `vercel.json` has rewrite rules (already configured)
- Check that SPA routing is enabled

**CORS errors:**
- Verify `VITE_API_URL` is correct
- Check backend CORS settings include your Vercel domain
- Backend should allow: `https://prep-jobs-ai.vercel.app`

**Firebase auth not working:**
- Verify Firebase config in `src/config/firebase.js`
- Check Firebase Console → Authentication is enabled
- Ensure Firebase project allows your Vercel domain

#### Updating Deployment

**After code changes:**
```bash
git add .
git commit -m "Your changes"
git push origin main
```
Vercel automatically deploys on push to main branch.

**After environment variable changes:**
1. Update in Vercel dashboard
2. Go to Deployments tab
3. Click "..." on latest deployment → "Redeploy"

**Manual redeploy:**
```bash
vercel --prod
```

#### Production URL

Your app is deployed at:
- **Production:** `https://prep-jobs-ai.vercel.app`
- Update backend `CORS_ORIGINS` to include this URL

### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Set environment variable in Netlify dashboard**

### Cloudflare Pages

1. Connect GitHub repository
2. Set build command: `cd jobs-app && npm run build`
3. Set build output directory: `jobs-app/dist`
4. Add `VITE_API_URL` environment variable

### AWS S3 + CloudFront

1. Build the app: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set environment variables via CloudFront or at build time

See the main [DEPLOYMENT.md](../DEPLOYMENT.md) for more deployment options.

## Environment Variables in Production

**Important:** Vite environment variables are embedded at build time, not runtime.

If you change `VITE_API_URL`:
1. Update the environment variable in your deployment platform
2. Rebuild the application: `npm run build`
3. Redeploy

For runtime environment variables, consider using a config service or injecting variables at container startup.

## Firebase Configuration

The app uses Firebase Authentication. Configure your Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password provider)
3. Copy your Firebase config and update `src/config/firebase.js`

## Features

- 🔐 User authentication (Sign up / Login) via Firebase
- 📄 Resume upload (PDF)
- 🔗 Job description URL input
- 🤖 AI-powered interview questions generation
- 📝 Elevator pitch generation
- 📋 Job summary extraction

## Troubleshooting

### Build fails

1. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version:** Ensure you're using Node.js 18+

### Environment variables not working

1. **Check prefix:** All env vars must start with `VITE_`
2. **Restart dev server:** Changes to `.env` require restart
3. **Rebuild for production:** Env vars are embedded at build time

### CORS errors

1. **Check backend CORS settings:** Ensure your frontend URL is allowed
   - CORS origin should be just the domain: `https://prep-jobs-ai.vercel.app`
   - **Not** the full path: `https://prep-jobs-ai.vercel.app/resume` ❌
2. **Verify API URL:** Make sure `VITE_API_URL` points to the correct backend
3. **Check backend logs:** Backend should log CORS debugging info if enabled

### Firebase auth not working

1. **Check Firebase config:** Verify `src/config/firebase.js` has correct credentials
2. **Check Firebase console:** Ensure Authentication is enabled
3. **Check browser console:** Look for Firebase error messages

### Routing issues after deployment

For SPAs, ensure your hosting provider is configured to serve `index.html` for all routes:
- **Vercel:** Configured via `vercel.json` (already set up)
- **Netlify:** Create `_redirects` file: `/* /index.html 200`
- **nginx:** Use `try_files $uri $uri/ /index.html;`

## Development Tips

- **Hot Module Replacement (HMR):** Vite provides instant updates during development
- **Fast Refresh:** React components update without losing state
- **ESLint:** Run `npm run lint` before committing
- **Browser DevTools:** Use React DevTools extension for debugging

## License

[Add your license here]
