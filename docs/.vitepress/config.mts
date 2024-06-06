import path from 'node:path'
import { defineConfig } from 'vitepress'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { loadEnv } from 'vite'

const ENV = { ...loadEnv('development', process.cwd()) }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: ENV.VITE_PKG_NAME,
  description: 'Smoking hot Vue notifications',
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],

  themeConfig: {
    // 导航上的logo
    logo: '/logo-small.svg',
    // 隐藏logo右边的标题
    siteTitle: false,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/props' },
    ],

    sidebar: [
      {
        text: 'API',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Emits', link: '/api/emits' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pinky-pig/vue3-hot-toast' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, '../..', 'src')}/`,
      },
    },
    plugins: [
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        dts: './.vitepress/typings/auto-imports.d.ts',
        dirs: ['../src/composables'],
        vueTemplate: true,
      }),
    ],
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
})
