import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Changed from 9000 to avoid conflict with backend on default port 9000
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'http://localhost:9000', // Point to the backend server running on port 9000
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
