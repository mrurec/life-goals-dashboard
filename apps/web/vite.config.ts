import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Rolldown (Rust bundler) is the default in Vite 8 — no opt-in needed
})
