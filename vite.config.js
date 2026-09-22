import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This project is kept deliberately flat: every file sits in one folder, with
// no sub-directories at all. So there is no /public directory — images are
// imported as modules (see assets.js) and Vite bundles them.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
})
