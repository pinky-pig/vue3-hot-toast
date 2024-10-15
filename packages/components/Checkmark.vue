<script lang="ts">
export interface CheckmarkTheme {
  primary?: string
  secondary?: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<CheckmarkTheme>(), {
  primary: '#61d345',
  secondary: '#fff',
})
</script>

<template>
  <div class="checkmark">
    <slot />
  </div>
</template>

<style scoped>
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

@keyframes checkmarkAnimation {
  0% {
    height: 0;
    width: 0;
    opacity: 0;
  }

  40% {
    height: 0;
    width: 6px;
    opacity: 1;
  }

  100% {
    opacity: 1;
    height: 10px;
  }
}

.checkmark {
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

.checkmark::after {
  content: '';
  box-sizing: border-box;

  animation: checkmarkAnimation 0.2s ease-out forwards;
  opacity: 0;
  animation-delay: 200ms;
  position: absolute;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-color: v-bind(secondary);
  bottom: 6px;
  left: 6px;
  height: 10px;
  width: 6px;
}
</style>
