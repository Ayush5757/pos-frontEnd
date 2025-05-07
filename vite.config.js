import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // env variables ko load karo
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_WEB_SOCKET_BACKEND,
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: env.VITE_WEB_SOCKET_BACKEND,
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
