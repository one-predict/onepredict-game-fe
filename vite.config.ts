import { defineConfig, loadEnv } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      remix({
        ssr: false,
        ignoredRouteFiles: ['**/*.scss'],
      }),
      svgr(),
      tsconfigPaths(),
    ],
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
