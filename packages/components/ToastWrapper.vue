<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ToastWrapperProps } from '../core/types'

const props = defineProps<ToastWrapperProps>()
const emits = defineEmits(['onHeightUpdate'])

const toastWrapper = ref<HTMLElement | null>(null)

onMounted(() => {
  if (toastWrapper.value) {
    updateHeight()

    new MutationObserver(updateHeight).observe(
      toastWrapper.value as HTMLElement,
      {
        subtree: true,
        childList: true,
        characterData: true,
      },
    )
  }

  function updateHeight() {
    if (toastWrapper.value) {
      const height = toastWrapper.value.getBoundingClientRect().height
      emits('onHeightUpdate', props.id, height)
    }
  }
})
</script>

<template>
  <div ref="toastWrapper">
    <slot />
  </div>
</template>
