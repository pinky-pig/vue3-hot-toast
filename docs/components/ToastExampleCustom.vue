<script setup lang="ts">
import toast from 'vue3-hot-toast'
import type { Toast } from 'vue3-hot-toast/core/types'
defineProps<{
  t: Toast
}>()
</script>

<template>
  <div
    :class="t?.visible ? 'animate-enter' : 'animate-leave'"
    class="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
  >
    <div class="flex-1 w-0 p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0 pt-0.5">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
          />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">Emilia Gates</p>
          <p class="mt-1 text-sm text-gray-500">Sure! 8:30pm works great!</p>
        </div>
      </div>
    </div>
    <div class="flex border-l border-gray-200">
      <button
        class="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @click="toast.dismiss(t?.id)"
      >
        Close
      </button>
    </div>
  </div>
</template>
