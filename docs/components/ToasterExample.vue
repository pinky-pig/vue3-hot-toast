<script setup lang="ts">
import toast from 'vue3-hot-toast'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  markRaw,
  ref,
  watch,
} from 'vue'
// @ts-ignore
import Arrow from '../assets/arrow.svg?raw'
import EmojiButton from './EmojiButton.vue'
import type { ToastPosition } from 'vue3-hot-toast/core/types'

const Code = defineAsyncComponent(() => import('./Code.vue'))

const props = defineProps<{
  position: ToastPosition
  reverse: boolean
}>()

const emits = defineEmits<{
  (e: 'onPosition', pos: ToastPosition): void
  (e: 'onReverse', rev: boolean): void
}>()

const positions: Array<ToastPosition> = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]
function reverseIt() {
  setTimeout(() => {
    toast('Notification 1', {
      icon: '1️⃣',
      id: 'reverse-1',
    })
  }, 10)

  setTimeout(
    () =>
      toast('Notification 2', {
        icon: '2️⃣',
        id: 'reverse-2',
      }),
    250,
  )
  setTimeout(
    () =>
      toast('Notification 3', {
        icon: '3️⃣',
        id: 'reverse-3',
      }),
    500,
  )
  setTimeout(
    () =>
      toast('Notification 4', {
        icon: '4️⃣',
        id: 'reverse-4',
      }),
    750,
  )

  emits('onReverse', !props.reverse)
}

function handleToggleToast(p: ToastPosition) {
  const component = defineComponent(() => {
    return () => {
      return h('span', { class: ' px-2' }, [
        'Position set to',
        h('b', { class: 'px-2' }, p),
      ])
    }
  })

  emits('onPosition', p)

  toast.success(markRaw(component), {
    id: 'position',
  })
}

const codeContent = computed(
  () => `<Toaster
  position="${props.position}"
  :reverseOrder="${props.reverse}"
/>`,
)
</script>

<template>
  <section className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-2">
    <Suspense>
      <Code :code="codeContent" lang="html" />
    </Suspense>
    <div
      className="order-first md:order-none col-span-2 grid grid-cols-3 justify-between bg-toast-100 rounded-xl gap-x-2 gap-y-4 p-2 md:p-4"
    >
      <button
        v-for="item in positions"
        :id="item"
        :key="item"
        class="rounded-xl text-center text-xs md:text-sm py-2 px- flex items-center justify-center cursor-pointer flex-col md:flex-row"
        :class="
          position === item
            ? 'bg-toast-900 text-toast-100 '
            : 'bg-white shadow-small-button'
        "
        @click="handleToggleToast(item)"
      >
        <span className="mr-2">{{ item }}</span>
      </button>
    </div>
    <div
      className="col-start-2 col-span-2 flex justify-center my-4"
      @click="reverseIt"
    >
      <EmojiButton class="max-w-[200px]">
        <template #emoji>
          <div
            class="transform transition-transform"
            :class="
              ((position.includes('bottom') && !reverse) ||
                (position.includes('top') && reverse)) &&
              'rotate-180'
            "
            v-html="Arrow"
          />
        </template>
        Toggle Direction
      </EmojiButton>
    </div>
  </section>
</template>
