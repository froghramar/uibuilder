# Deployment Guide for GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Initial Setup

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**
   - Save the settings

3. **Verify the workflow**
   - Go to the **Actions** tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow
   - It will run automatically on every push to `main` or `master` branch

## How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Checkout** your code
2. **Setup Node.js** (version 20)
3. **Install dependencies** using `npm ci`
4. **Build** the project with the correct base path
5. **Deploy** to GitHub Pages

## Base Path Configuration

The workflow automatically sets the base path to match your repository name:
- If your repo is `https://github.com/username/tiptapdemo`
- The site will be at `https://username.github.io/tiptapdemo/`
- The base path is set to `/tiptapdemo/`

## Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select the branch (usually `main`)
5. Click **"Run workflow"**

## Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally

### 404 Errors on GitHub Pages
- Ensure the base path in `vite.config.ts` matches your repository name
- Check that the workflow completed successfully
- Wait a few minutes for GitHub Pages to update

### Assets Not Loading
- Verify the `base` path in `vite.config.ts` is correct
- Check browser console for 404 errors
- Ensure all assets are in the `dist` folder after build

## Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

This will build and serve the production version locally, which should match what's deployed to GitHub Pages.
