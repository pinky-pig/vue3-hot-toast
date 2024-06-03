<script lang="ts">
export interface LoaderTheme {
  primary?: string
  secondary?: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<LoaderTheme>(), {
  primary: '#616161',
  secondary: '#e0e0e0',
})
</script>

<template>
  <div class="loader">
    <slot />
  </div>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loader {
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: v-bind(secondary);
  border-right-color: v-bind(primary);
  animation: rotate 1s linear infinite;
}
</style>
