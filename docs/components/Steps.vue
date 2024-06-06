<script setup lang="ts">
import { ref } from 'vue'

type StepType = {
  count: number
  title: string
  subTitle: string
  code: string
}

const steps = ref<StepType[]>([
  {
    count: 1,
    title: 'Install package',
    subTitle: 'It weighs less than 5kb',
    code: 'pnpm i vue3-hot-toast',
  },
  {
    count: 2,
    title: 'Add Toaster to your app',
    subTitle: "Make sure it's placed at the top",
    code: '<div><Toaster/></div>',
  },
  {
    count: 3,
    title: 'Start toasting!',
    subTitle: 'Call it from anywhere',
    code: 'toast("Hello World")',
  },
])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 my-12">
    <div
      v-for="step in steps"
      :key="step.count"
      class="flex flex-col gap-1 items-center"
    >
      <div
        class="h-6 w-6 mb-2 text-sm rounded-full bg-toast-900 text-toast-50 flex items-center justify-center"
      >
        {{ step.count }}
      </div>
      <div class="font-bold">{{ step.title }}</div>
      <div class="text-red-700 text-sm">{{ step.subTitle }}</div>
      <code
        class="mt-2 border border-toast-200 py-2 px-4 rounded font-bold bg-white w-full text-center"
      >
        {{ step.code }}
      </code>
    </div>
  </div>
</template>
