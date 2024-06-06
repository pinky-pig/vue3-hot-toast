<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import Checkmark from '../assets/checkmark.svg?raw'

const features = ref([
  'Hot by default',
  'Easy to use',
  'Accessible',
  'Emoji Support',
  'Customizable',
  'Promise API',
  'Lightweight',
  'Pause on hover',
  'Headless Hooks',
])
</script>

<template>
  <div class="my-12 grid gap-x-8 gap-y-5 grid-cols-2 md:grid-cols-3">
    <div v-for="item in features" :key="item" class="flex gap-1 items-center">
      <div v-html="Checkmark" />
      <span class="font-bold">{{ item }}</span>
    </div>
  </div>
</template>
