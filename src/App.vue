<script setup lang="ts">
import toast, { Toaster } from '@arvinn/vue-hot-toast'

function notify() {
  toast('Here is your toast.')
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <button @click="notify">
      Make me a toast
    </button>
  </main>
  <Toaster />
</template>
