// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    // reporters: ['html']
  },
  optimizeDeps: {
    exclude: ['react-hook-form'],
  },
  esbuild: {
    drop: process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test' ? [] : ['console', 'debugger']
  },
  server: {
    watch: { usePolling: true },
    host: true,
    strictPort: true,
    port: 5173
  }
})
