import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: false,  // Prevents Vite from automatically opening the browser
    port: 5173,   // Set the port to 5173
  },
  build: {
    outDir: 'dist',
  },
});

