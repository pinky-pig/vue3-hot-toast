<script setup lang="ts">
import { type CSSProperties, ref, watch } from 'vue'
import { useToaster } from '../core/use-toaster'
import { prefersReducedMotion } from '../core/utils'
import { listeners } from '../core/store'
import ToastWrapper from './ToastWrapper.vue'
import ToastBar from './ToastBar.vue'
import type { ToastPosition, ToasterProps } from '../core/types'

/**
 * 1. 命令式 custom
 * 2. 直接 children
 * 3. 插槽 toastBar
 */

// const { reverseOrder, position, toastOptions, gutter } = withDefaults(
const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'top-center',
})

const DEFAULT_OFFSET = 16

const store = ref(useToaster(props.toastOptions))

watch(
  listeners,
  () => {
    store.value = useToaster(props.toastOptions)
  },
  {
    deep: true,
  },
)

function getPositionStyle(
  position: ToastPosition,
  offset: number,
): CSSProperties {
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
    }"
    @mouseenter="store.handlers.startPause"
    @mouseleave="store.handlers.endPause"
  >
    <ToastWrapper
      v-for="t in store.toasts"
      :id="t.id"
      :key="t.id"
      :style="
        getPositionStyle(
          t.position || props.position,
          store.handlers.calculateOffset(t, {
            reverseOrder,
            gutter,
            defaultPosition: props.position,
          }),
        )
      "
      :class="t.visible ? 'active-class' : ''"
      @on-height-update="store.handlers.updateHeight"
    >
      <component :is="t.message" v-if="t.type === 'custom'" :t="t" />
      <slot
        v-else-if="$slots.default"
        :toast="t"
        :position="t.position || props.position"
      />
      <slot
        v-else
        :toast="t"
        :position="t.position || props.position"
        name="toastBar"
      >
        <ToastBar :toast="t" :position="t.position || props.position" />
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
