import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  preview: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: ['punya-kelompok-5.up.railway.app'], // Ganti sesuai domain kamu di Railway
  },
});
