import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '/@': pathResolve('./src/'),
}

 defineConfig({
  plugins: [vue()],
  server: {
    port: 4200
  }
})

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
  const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
    assets: pathResolve('./src/assets'),
  }

  return {
    plugins: [vue()],
    root: process.cwd(),
    resolve: { alias },
    base: './',
    server: {
      host: '0.0.0.0',
      port: 4200,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        '/supervisor': {
          target: 'http://95.163.12.113',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      cssCodeSplit: false,
      sourcemap: false,
      outDir: '../server/public',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            echarts: ['echarts'],
          },
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }
}

export default viteConfig
