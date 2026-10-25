/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'lottie', test: /node_modules[\\/]lottie-web/ },
            { name: 'vendor', test: /node_modules[\\/](@vue|vue|vue-router|pinia)[\\/]/ }
          ]
        }
      }
    }
  },
  optimizeDeps: {
    include: ['lottie-web', 'jszip', '@lucide/vue']
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    testTimeout: 10000
  }
})
