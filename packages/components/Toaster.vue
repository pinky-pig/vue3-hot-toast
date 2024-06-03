<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ToastPosition, ToasterProps } from '../core/types'
import { useToaster } from '../core/useToast'
import { prefersReducedMotion } from '../core/utils'
import { memoryState } from '../core/store'
import ToastWrapper from './ToastWrapper.vue'
import ToastBar from './ToastBar.vue'

const {
  reverseOrder,
  position,
  toastOptions,
  gutter,
  containerStyle,
} = withDefaults(
  defineProps<ToasterProps>(),
  {
    position: 'top-center',
  },
)

const DEFAULT_OFFSET = 16

const store = ref(useToaster(toastOptions))

watch(memoryState, () => {
  store.value = useToaster(toastOptions)
})

function getPositionStyle(position: ToastPosition, offset: number): CSSProperties {
  const top = position.includes('top')
  const verticalStyle: CSSProperties = top ? { top: 0 } : { bottom: 0 }
  const horizontalStyle: CSSProperties = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
      ? {
          justifyContent: 'flex-end',
        }
      : {}
  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    transition: prefersReducedMotion()
      ? undefined
      : `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  }
}
</script>

<template>
  <div
    :style="{
      position: 'fixed',
      zIndex: 9999,
      top: `${DEFAULT_OFFSET}px`,
      left: `${DEFAULT_OFFSET}px`,
      right: `${DEFAULT_OFFSET}px`,
      bottom: `${DEFAULT_OFFSET}px`,
      pointerEvents: 'none',
      ...containerStyle,
    }"
    @mouseenter="store.handlers.startPause"
    @mouseleave="store.handlers.endPause"
  >
    {{ store.toasts.length }}
    <ToastWrapper
      v-for="t in store.toasts"
      :id="t.id"
      :key="t.id"
      :style="getPositionStyle(
        t.position || position,
        store.handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        }),
      )"
      :class="t.visible ? 'active-class' : '' "
      @on-height-update="store.handlers.updateHeight"
    >
      <!-- {{ t.type === 'custom' && resolveValue(t.message, t) }} -->
      <slot v-if="t.type !== 'custom'">
        <!-- <ToastBar :toast="t" :position="t.position || position" /> -->
        {{ t.message }}
      </slot>
    </ToastWrapper>
  </div>
</template>

<style scoped>
.active-class {
  z-index: 9999;
}

.active-class > * {
  pointer-events: auto;
}
</style>
