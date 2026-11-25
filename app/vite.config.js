import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // Local preview stays at the site root. The GitHub Pages build uses the
  // repo's subfolder address so its CSS, JavaScript, and images load.
  base: command === 'build' && process.env.GITHUB_PAGES === 'true'
    ? '/stitch11-25-26/'
    : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
}))
