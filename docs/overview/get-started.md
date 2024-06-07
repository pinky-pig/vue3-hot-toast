# Getting Started

Add beautiful notifications to your Vue app with [vue3-hot-toast](https://github.com/pinky-pig/vue3-hot-toast).

## Install 

```sh
pnpm install vue3-hot-toast
or 
npm install vue3-hot-toast
or 
yarn add vue3-hot-toast
```

## Basic usage

```vue
<script setup lang="ts">
import toast, { Toaster } from 'vue3-hot-toast'

function notify() {
  toast('Here is your toast.')
}
</script>

<template>
  <div>
    <button @click="notify">Make me a toast</button>
    <Toaster />
  </div>
</template>
```

## Inspiration
[react-hot-toast](https://github.com/timolins/react-hot-toast) - Smoking Hot React Notifications.
