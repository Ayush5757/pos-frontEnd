import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.vite_web_socket_backend, 
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: import.meta.env.vite_web_socket_backend,
        ws: true,
        changeOrigin: true,
      }
    }
  }
});
