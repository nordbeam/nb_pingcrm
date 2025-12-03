import { defineConfig } from 'vite'
import phoenix from '@nordbeam/nb-vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import nodePrefixPlugin from './vite-plugins/node-prefix-plugin.js'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
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
      // SSR configuration
      ssr: 'js/ssr_prod.tsx',
      ssrOutputDirectory: '../priv/static',
      ssrDev: true,
    })
  ],
  server: {
    host: process.env.VITE_HOST || "127.0.0.1", // Force IPv4 for Elixir compatibility
    port: parseInt(process.env.VITE_PORT || "5173"),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './js')
    }
  }

})
