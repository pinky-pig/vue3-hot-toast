<script setup lang="ts">
import { getHighlighter } from 'shiki'
import { ref, watch } from 'vue'
import toast from 'vue3-hot-toast'
import { useCopyCode } from '../utils/useCopyCode'

// 所有的主题：import { bundledThemes } from 'shiki'
// 支持的语言：import { bundledLanguages } from 'shiki'

const props = withDefaults(
  defineProps<{
    code: string
    // 代码语言类型
    lang?: string
    // 浅色主题
    theme?: string
    // 深色主题
    darkTheme?: string
  }>(),
  {
    lang: 'javascript',
    theme: 'min-dark',
  },
)

const highlighter = await getHighlighter({
  themes: ['min-dark'],
  langs: [
    'js',
    'javascript',
    'bash',
    'vue',
    'vue-html',
    'ts',
    'typescript',
    'tsx',
    'jsx',
    'html',
    'css',
  ],
})

const renderCode = ref('')
watch(
  () => props.code,
  () => {
    renderCode.value = highlighter.codeToHtml(props.code, {
      lang: props.lang,
      themes: {
        light: 'min-dark',
      },
      defaultColor: 'light',
    })
  },
  {
    immediate: true,
  },
)

const showCheckIcon = ref(false)
async function handleCopyCode() {
  await useCopyCode({ code: renderCode.value, checkIconRef: showCheckIcon })
  toast.success('Copied to your clipboard!!!')
}
</script>

<template>
  <div
    style="background-color: rgb(53, 30, 17); color: rgb(214, 206, 255)"
    class="relative !h-auto min-h-full prism-code language-jsx w-full rounded-lg p-4 overflow-x-auto flex flex-col items justify-center"
  >
    <div class="w-full h-full absolute top-0 left-0" v-html="renderCode" />
    <button
      aria-label="Copy code"
      title="Copy code"
      class="absolute btn-border w-[26px] h-[26px] rounded-[5px] p-1 top-1 right-2 flex justify-center items-center"
      @click="handleCopyCode"
    >
      <svg
        v-if="showCheckIcon"
        class="text-[14px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 6L9 17l-5-5"
        />
      </svg>

      <svg
        v-else
        class="text-[14px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </g>
      </svg>
    </button>
  </div>
</template>
