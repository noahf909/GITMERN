import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
          '/api': {
              target: 'http://www.aab.run:5000', // Backend server
              changeOrigin: true,
              secure: false,
          },
      },
  },
});
/*
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000,  // backend server url
  },
})
*/ 
