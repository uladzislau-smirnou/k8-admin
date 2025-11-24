import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(
      'https://k8-admin.vercel.app'
    ),
  },
  build: {
    lib: {
      entry: resolve(__dirname, './index.tsx'),
      name: 'SK8Widget',
      fileName: () => 'pipelines.js',
      formats: ['iife'], // output as <script> browser file
    },
    outDir: resolve(__dirname, '../public/widgets'),
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
