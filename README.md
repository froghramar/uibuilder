# TipTap UI Builder

A rich UI builder built with TipTap that supports drag-and-drop components, inline editing, and property customization.

## Features

- Drag and drop components from palette to canvas
- Inline editing for text and components
- Property panel for customizing component attributes
- Custom node views for interactive components
- Export to JSON, HTML, and React code
- Import JSON files to restore UI state

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is configured to deploy to GitHub Pages automatically via GitHub Actions.

### Setup for GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy on pushes to `main` or `master` branch

The site will be available at: `https://<username>.github.io/<repository-name>/`

### Manual Deployment

You can also trigger the deployment manually:
1. Go to the "Actions" tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
