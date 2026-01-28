import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages, use the repository name as base path
  // For local development, use '/'
  base: process.env.BASE_URL || '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
