<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, h, ref } from 'vue'
import type { Toast, ToastPosition } from '../core/types'
import { prefersReducedMotion } from '../core/utils'

import type { LoaderTheme } from './Loader.vue'
import LoaderIcon from './Loader.vue'
import type { CheckmarkTheme } from './Checkmark.vue'
import CheckmarkIcon from './Checkmark.vue'
import type { ErrorTheme } from './Error.vue'
import ErrorIcon from './Error.vue'

const StatusWrapper = defineComponent(
  () => {
    return () => {
      return h(
        'div',
        {
          style: {
            position: 'absolute',
          },
        },
        h('slot', null),
      )
    }
  },
)
const IndicatorWrapper = defineComponent(
  () => {
    return () => {
      return h(
        'div',
        {
          style: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '20px',
            minHeight: '20px',
          },
        },
        h('slot', null),
      )
    }
  },
)
const AnimatedIconWrapper = defineComponent(
  () => {
    return () => {
      return h(
        'div',
        {
          style: {
            position: 'relative',
            transform: 'scale(0.6)',
            opacity: '0.4',
            minWidth: '20px',
            animation: `enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
          },
        },
        h('slot', null),
      )
    }
  },
)

export type IconThemes = Partial<{
  success: CheckmarkTheme
  error: ErrorTheme
  loading: LoaderTheme
}>
</script>

<script setup lang="ts">
interface ToastIconProps {
  toast: Toast
}

const { toast } = defineProps<ToastIconProps>()

const { icon, type, iconTheme } = toast
</script>

<template>
  <AnimatedIconWrapper v-if="icon !== undefined && typeof icon === 'string'">
    {{ icon }}
  </AnimatedIconWrapper>
  <div v-else-if="icon !== undefined && typeof icon !== 'string'" v-html="icon" />
  <div v-else-if="type === 'blank'" />
  <IndicatorWrapper v-else>
    <LoaderIcon :props="iconTheme" />
    {type !== 'loading' && (
    <StatusWrapper>
      <ErrorIcon v-if="type === 'error'" :props="iconTheme" />
      <CheckmarkIcon v-else :props="iconTheme" />
    </StatusWrapper>
    )}
  </IndicatorWrapper>
</template>

<style scoped>
@keyframes enter {
  0% {
    transform: translate3d(0, 80px, 0) scale(0.6);
    opacity: 0.5;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}
</style>
