import path from 'node:path'
import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Hot Toast',
  description: 'Smoking hot Vue notifications',
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],

  themeConfig: {
    // 导航上的logo
    logo: '/logo-small.svg',
    // 隐藏logo右边的标题
    // siteTitle: false,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/pinky-pig/vue3-hot-toast' },
      { text: 'NPM', link: 'https://www.npmjs.com/package/vue3-hot-toast' },
    ],

    sidebar: [
      {
        text: 'OVERVIEW',
        items: [{ text: 'Get Started', link: '/overview/get-started.md' }],
      },
      {
        text: 'API',
        items: [
          { text: 'toast', link: '/api/toast' },
          { text: 'Toaster', link: '/api/toaster' },
          { text: 'ToastBar', link: '/api/toast-bar' },
          { text: 'useToasterStore', link: '/api/use-toaster-store' },
        ],
      },
      {
        text: 'GUIDES',
        items: [{ text: 'Styling', link: '/guides/styling' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/pinky-pig' }],
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
