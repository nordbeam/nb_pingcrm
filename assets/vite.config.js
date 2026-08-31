import { defineConfig, lazyPlugins } from 'vite-plus';
import phoenix from '@nordbeam/nb-vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import nodePrefixPlugin from './vite-plugins/node-prefix-plugin.js';

export default defineConfig(({ isSsrBuild }) => {
  const isSSR = isSsrBuild || process.env.BUILD_SSR === 'true';

  if (isSSR) {
    return {
      plugins: [
        react({
          babel: {
            plugins: ['babel-plugin-react-compiler'],
          },
        }),
        nodePrefixPlugin(),
      ],
      build: {
        ssr: true,
        outDir: '../priv/static',
        rollupOptions: {
          input: 'js/ssr_prod.tsx',
          output: {
            format: 'esm',
            entryFileNames: 'ssr.js',
            footer: 'globalThis.render = render;',
          },
          external: (id) => id.startsWith('node:'),
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './js'),
        },
      },
      ssr: {
        noExternal: true,
        target: 'neutral',
      },
    };
  }

  return {
    fmt: {
      ignorePatterns: ['dist/**'],
      singleQuote: true,
      semi: true,
      sortPackageJson: true,
    },

    plugins: [
      react({
        babel: {
          plugins: lazyPlugins(() => ['babel-plugin-react-compiler']),
        },
      }),
      tailwindcss(),
      nodePrefixPlugin(),
      phoenix({
        input: ['js/app.ts', 'js/app.tsx', 'css/app.css'],
        publicDirectory: '../priv/static',
        buildDirectory: 'assets',
        hotFile: '../priv/hot',
        manifestPath: '../priv/static/assets/manifest.json',
        refresh: true,
        ssrDev: {
          enabled: true,
          path: '/ssr',
          healthPath: '/ssr-health',
          entryPoint: './js/ssr.tsx',
          hotFile: '../priv/ssr-hot',
        },

        // SSR configuration - unified entry for dev and prod
        // Setting `ssr` automatically enables ssrDev with the same entry point
        ssr: 'js/ssr.tsx',
        ssrOutputDirectory: '../priv/static',
      }),
    ],
    server: {
      host: process.env.VITE_HOST || '127.0.0.1', // Force IPv4 for Elixir compatibility
      port: parseInt(process.env.VITE_PORT || '5173'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './js'),
      },
    },
  };
});
