/// <reference types="vite/client" />

/**
 * @see https://vitejs.dev/config
 */

import path, { resolve } from 'node:path'

import mdx from '@mdx-js/rollup'
import storylite from '@storylite/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

// import mdx from 'vite-plugin-mdx'

console.log('Starting storylite...', process.env.PORT)

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'canvas.html'),
      },
    },
  },
  server: {
    port: Number(process.env.PORT || 0) || 7707,
    host: '0.0.0.0',
    proxy: {
      // @see https://vitejs.dev/config/server-options.html#server-proxy
      '/supereffective-assets': {
        target: 'https://itsjavi.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/supereffective-assets/, '/supereffective-assets/assets'),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          // 'Access-Control-Allow-Headers': '*',
          // 'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
          // 'Cross-Origin-Resource-Policy': 'cross-origin',
          // 'Cross-Origin-Embedder-Policy': 'require-corp',
        },
      },
    },
    watch: {
      // atomic: 200,
      ignored: ['**/coverage/**', '**/styled-system/**'],
      // cwd: resolve(path.join(__dirname, '..')),
      // interval: 1000,
      // usePolling: true,
      // ignoreInitial: true,
    },
  },
  plugins: [
    {
      enforce: 'pre', // this ensures that .md/mdx files are processed before react & storylite plugins
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    } as any,
    storylite({
      stories: 'stories/**/*.stories.{tsx,md,mdx}', // relative to the CWD
    }),
    react(),
  ],
  // assetsInclude: ['**/*.md', '**/*.mdx'],
  resolve: {
    alias: {
      '@/packages': path.resolve(__dirname, '../..'),
      '@/': path.resolve(__dirname),
    },
  },
})
