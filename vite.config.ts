import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const resolvePath = (pathname: string) =>
  fileURLToPath(new URL(pathname, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
  '@': resolvePath('./src'),
  '@components': resolvePath('./src/components'),
  '@features': resolvePath('./src/features'),
  '@lib': resolvePath('./src/lib'),
  '@data': resolvePath('./src/data'),
  '@styles': resolvePath('./src/styles'),
  '@assets': resolvePath('./src/assets'),
    },
  },
  build: {
    // Code-splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Optimize for mobile
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: true,
  },
  server: {
    port: 3000,
    host: true, // Expose to network for mobile testing
  },
  preview: {
    port: 4173,
    host: true,
  },
});
