<script lang="ts">
export interface ErrorTheme {
  primary?: string
  secondary?: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<ErrorTheme>(), {
  primary: '#ff4b4b',
  secondary: '#fff',
})
</script>

<template>
  <div class="error">
    <slot />
  </div>
</template>

<style scoped>
.error {
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: v-bind(primary);
  position: relative;
  transform: rotate(45deg);

  animation: circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 100ms;
}

.error::after {
  content: '';
  animation: firstLineAnimation 0.15s ease-out forwards;
  animation-delay: 150ms;
  position: absolute;
  border-radius: 3px;
  opacity: 0;
  background: v-bind(secondary);
  bottom: 9px;
  left: 4px;
  height: 2px;
  width: 12px;
}

.error::before {
  content: '';
  animation: firstLineAnimation 0.15s ease-out forwards;
  animation-delay: 150ms;
  position: absolute;
  border-radius: 3px;
  opacity: 0;
  background: v-bind(secondary);
  bottom: 9px;
  left: 4px;
  height: 2px;
  width: 12px;
  animation: secondLineAnimation 0.15s ease-out forwards;
  animation-delay: 180ms;
  transform: rotate(90deg);
}

@keyframes circleAnimation {
  from {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }

  to {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
}

@keyframes firstLineAnimation {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes secondLineAnimation {
  from {
    transform: scale(0) rotate(90deg);
    opacity: 0;
  }

  to {
    transform: scale(1) rotate(90deg);
    opacity: 1;
  }
}
</style>
