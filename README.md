# Vue3 Hot Toast

> Add beautiful notifications to your Vue app with [vue3-hot-toast](https://github.com/pinky-pig/vue3-hot-toast).

## Preview

https://private-user-images.githubusercontent.com/42307398/337541025-48a05ccc-d3f8-4433-ba1c-2376151ab69b.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTc3NDAzNjYsIm5iZiI6MTcxNzc0MDA2NiwicGF0aCI6Ii80MjMwNzM5OC8zMzc1NDEwMjUtNDhhMDVjY2MtZDNmOC00NDMzLWJhMWMtMjM3NjE1MWFiNjliLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MDclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjA3VDA2MDEwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRjYTUzNTVkYjIyZjFlZGQ1NjZlNDcxMGJiYzJhZTJkNTBlZTU0MmEzYmEzM2ZjMzA3ZWJkYTliZGM0ODExMTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.xRSIR3kQSv5IGHH0aOJwhL0ryUXUY_NVCvFnA_35kQc

## Website
Docs: <https://https://vue3-hot-toast.netlify.app//>  
NPM: <https://www.npmjs.com/package/vue3-hot-toast>

## Inspiration
[react-hot-toast](https://github.com/timolins/react-hot-toast) - Smoking Hot React Notifications.

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
