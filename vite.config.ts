import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// For custom domain deployment, we'll use root path
// If no custom domain is set up yet, we'd use: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/'
const base = '/';

export default defineConfig({
  // Set the correct base path for GitHub Pages
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4000, // Changed from default 3000 to 4000
    open: true, // Automatically open the app in the browser
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'ui-components': ['lucide-react'],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name?.split('.').at(1) || 'asset';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,
      },
    },
    sourcemap: false,
    reportCompressedSize: false,
  },
});
