// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': process.env.VITE_BACK_URL,  // Ensure the backend URL is correctly set
//     },
//   },
//   build: {
//     outDir: 'dist',
//   },
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
//   optimizeDeps: {
//     include: ['react-router-dom'],
//   },
//   // Add this part to configure the fallback for SPA
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//       },
//     },
//   },
//   // Ensure the fallback is correctly configured for history
//   historyApiFallback: {
//     index: '/index.html',
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': process.env.VITE_BACK_URL,  // Ensure this points to your backend
    },
  },
  build: {
    outDir: 'dist',  // Output directory for built files
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
