import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@shared-components': path.resolve(__dirname, './src/shared/components'),
      '@shared-forms': path.resolve(__dirname, './src/shared/components/forms'),
      '@shared-fields': path.resolve(__dirname, './src/shared/components/forms/fields'),
      '@auth': path.resolve(__dirname, './src/modules/auth'),
      '@auth-components': path.resolve(__dirname, './src/modules/auth/components'),
      '@auth-pages': path.resolve(__dirname, './src/modules/auth/pages'),
      '@onboarding': path.resolve(__dirname, './src/modules/onboarding'),
      '@splash': path.resolve(__dirname, './src/modules/splash'),
      '@tabs': path.resolve(__dirname, './src/modules/tabs'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  plugins: [react(), tailwindcss()],
})
