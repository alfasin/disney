import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/pglite/' : '/',
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
})
