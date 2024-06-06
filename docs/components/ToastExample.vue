<script setup lang="ts">
import toast from 'vue3-hot-toast'
import { defineAsyncComponent, defineComponent, h, markRaw, ref } from 'vue'
import { Toast } from 'vue3-hot-toast/core/types'
import { useCopyCode } from '../utils/useCopyCode'
import EmojiButton from './EmojiButton.vue'
import ToastExampleCustom from './ToastExampleCustom.vue'

const Code = defineAsyncComponent(() => import('./Code.vue'))

type ExampleType = {
  title: string
  action: () => void
  emoji: string
  snippet: string
}
const examples: Array<ExampleType> = [
  {
    title: 'Success',
    emoji: '✅',
    snippet: "toast.success('Successfully toasted!')",
    action: () => {
      toast.success('Successfully toasted!')
    },
  },
  {
    title: 'Error',
    emoji: '❌',
    snippet: `toast.error("This didn't work.")`,

    action: () => {
      toast.error("This didn't work.")
    },
  },
  {
    title: 'Promise',
    emoji: '⏳',
    snippet: `toast.promise(
  saveSettings(settings),
   {
     loading: 'Saving...',
     success: <b>Settings saved!</b>,
     error: <b>Could not save.</b>,
   }
 );`,
    action: () => {
      const promise = new Promise((res, rej) => {
        setTimeout(Math.random() > 0.5 ? res : rej, 1000)
      })

      toast.promise(
        promise,
        {
          loading: 'Saving...',
          success: 'Settings saved!',
          error: 'Could not save.',
        },
        {
          style: {
            width: '200px',
            paddingRight: '10px',
          },
        },
      )
    },
  },
  {
    title: 'Multi Line',
    emoji: '↕️',
    snippet: `toast(
  "This toast is super big. I don't think anyone could eat it in one bite.\\n\\nIt's larger than you expected. You eat it but it does not seem to get smaller.",
  {
    duration: 6000,
  }
);`,
    action: () => {
      toast(
        "This toast is super big. I don't think anyone could eat it in one bite.\n\n It's larger than you expected. You eat it but it does not seem to get smaller.",
        {
          duration: 6000,
        },
      )
    },
  },
  {
    title: 'Emoji',
    emoji: '👏',
    snippet: `toast('Good Job!', {
  icon: '👏',
});`,
    action: () => {
      toast('Good Job!', {
        icon: '👏',
      })
    },
  },
  {
    title: 'Dark Mode',
    emoji: '🌚',
    snippet: `toast('Hello Darkness!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);`,
    action: () => {
      toast('Hello Darkness!', {
        icon: '👏',

        style: {
          borderRadius: '200px',
          background: '#333',
          color: '#fff',
        },
      })
    },
  },

  {
    title: 'Component Content',
    emoji: '🔩',
    snippet: `const component = defineComponent(() => {
return () => {
  return h(
    'span',
    {
      class: 'px-2',
    },
    [
      'Custom and',
      h('b', {}, 'bold'),
      h(
        'button',
        {
          class:
            'ml-2 py-1 rounded px-2 border bg-gray-100 text-gray-900',
          onClick: () => toast.dismiss(toastId),
        },
        'Dismiss',
      ),
    ],
  )
}
})
const toastId = toast(markRaw(component))`,

    action: () => {
      const component = defineComponent(() => {
        return () => {
          return h(
            'span',
            {
              class: 'px-2',
            },
            [
              'Custom and',
              h('b', {}, 'bold'),
              h(
                'button',
                {
                  class:
                    'ml-2 py-1 rounded px-2 border bg-gray-100 text-gray-900',
                  onClick: () => toast.dismiss(toastId),
                },
                'Dismiss',
              ),
            ],
          )
        }
      })
      // 其实组件中 props 会有一个 t ，这个就是当前的 toast 组件状态
      const toastId = toast(markRaw(component))
    },
  },
  {
    title: 'Themed',
    emoji: '🎨',
    snippet: `toast.success('Look at my styles.', {
  style: {
    border: '1px solid #713200',
    padding: '16px',
    color: '#713200',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
});`,

    action: () => {
      toast.success('Look at my styles.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      })
    },
  },
  {
    title: 'Custom Position',
    emoji: '⬆️',
    snippet: `toast.success('Always at the bottom.', {
  position: "bottom-center"
})`,
    action: () => {
      toast.success('Always at the bottom.', {
        position: 'bottom-center',
        duration: 10000,
      })
    },
  },
  {
    title: 'TailwindCSS',
    emoji: '️💨',
    snippet: `toast.custom(markRaw(ToastExampleCustom), { duration: 10000 })`,
    action: () => {
      toast.custom(markRaw(ToastExampleCustom), { duration: 10000 })
    },
  },
]
const snippet = ref<string>(examples[0].snippet)

function handleToggleToast(t: ExampleType) {
  snippet.value = t.snippet
  t.action()
}
</script>

<template>
  <section className="grid md:grid-cols-2 gap-4">
    <div className="flex items-center">
      <div
        className="w-full grid grid-cols-2 gap-2 bg-toast-100  rounded-xl p-4"
      >
        <div v-for="e in examples" :key="e.title" @click="handleToggleToast(e)">
          <EmojiButton :key="e.title">
            <template #emoji>
              {{ e.emoji }}
            </template>

            {{ e.title }}
          </EmojiButton>
        </div>
      </div>
    </div>
    <div className="md:h-72 w-full overflow-auto rounded-lg">
      <Suspense>
        <Code :code="snippet" lang="javascript" />
      </Suspense>
    </div>
  </section>
</template>

<style scoped></style>
