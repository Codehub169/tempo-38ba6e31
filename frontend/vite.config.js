import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000, // Ensure frontend dev server runs on port 9000
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'http://localhost:3000', // Default backend port if not specified otherwise, will be overridden by startup.sh
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // Ensure /api prefix is maintained for backend routes
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
