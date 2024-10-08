import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Adjusted the proxy path based on your backend route structure
      '/auth': {
        target: process.env.VITE_BACK_URL,  // Use process.env to access the variable
        changeOrigin: true,
      },
      '/admin': {
        target: process.env.VITE_BACK_URL,
        changeOrigin: true,
      },
      '/api': {
        target: process.env.VITE_BACK_URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  // Important: Configure for SPA routing fallback
  historyApiFallback: true,
});
