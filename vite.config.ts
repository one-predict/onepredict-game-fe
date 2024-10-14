import { defineConfig, loadEnv } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      remix({
        ssr: false,
        ignoredRouteFiles: ['**/*.scss'],
      }),
      svgr(),
      tsconfigPaths(),
      sentryVitePlugin({
        org: process.env.VITE_SENTRY_ORG,
        project: process.env.VITE_SENTRY_PROJECT,
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
        disable: process.env.NODE_ENV !== 'production',
      }),
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
