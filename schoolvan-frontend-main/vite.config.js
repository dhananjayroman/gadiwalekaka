import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // default build output
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['lucide-react', 'sweetalert2'],
          'vendor-maps': ['@react-google-maps/api'],
          'vendor-socket': ['socket.io-client'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173, // optional for local
  },
  preview: {
    port: 4173, // for preview builds
  },
});

