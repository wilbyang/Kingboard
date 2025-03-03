import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      env: {
        VITE_API_URL: 'http://localhost:3000'
      }
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __USE_MOCK__: env.VITE_USE_MOCK === 'true',
    },
  };
});
