<script setup lang="ts"></script>

<template>
  <footer
    class="container relative justify-center my-8 flex flex-col items-center space-y-4"
  >
    <div class="flex space-x-4">
      <a class="underline" href="https://github.com/pinky-pig/vue3-hot-toast">
        GitHub
      </a>
      <a href="/overview/get-started" class="underline"> Docs </a>
      <a class="underline" href="https://twitter.com/ArvinnWang"> Twitter </a>
    </div>
    <div class="text-toast-600">
      <span>© {{ new Date().getFullYear() }} vue3-hot-toast</span>
      {{ ' · ' }}
      <span>
        <span>Built by </span>
        <a class="underline" href="https://mmeme.me"> Arvin </a>
      </span>
    </div>
  </footer>
</template>
