import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      react(),
      mkcert(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@providers': path.resolve(__dirname, './src/providers'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@components': path.resolve(__dirname, './src/components'),
        '@boosting-game': path.resolve(__dirname, './src/boosting-game'),
        '@pages': path.resolve(__dirname, './src/pages'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_TARGET_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
