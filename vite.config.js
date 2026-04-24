import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        'C:/Users/kpras/OneDrive/Desktop/ingrain-system',
        'C:/Users/kpras/.gemini/antigravity/brain/7638729a-6807-4da5-8172-0ca4d6c0c7a3'
      ]
    }
  }
})
