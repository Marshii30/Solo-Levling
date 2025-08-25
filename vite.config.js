import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy to https://github.com/<you>/<REPO_NAME>
// set base to "/<REPO_NAME>/". For Netlify/Vercel keep base: "/".
const base = process.env.VITE_PAGES_BASE || "/REPO_NAME/"

export default defineConfig({
  plugins: [react()],
  base // change to "/" if using Netlify/Vercel
})
