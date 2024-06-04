<script lang="ts">
import { defineComponent, h } from 'vue'
import type { Toast } from '../core/types'

import type { LoaderTheme } from './Loader.vue'
import LoaderIcon from './Loader.vue'
import type { CheckmarkTheme } from './Checkmark.vue'
import CheckmarkIcon from './Checkmark.vue'
import type { ErrorTheme } from './Error.vue'
import ErrorIcon from './Error.vue'

export type IconThemes = Partial<{
  success: CheckmarkTheme
  error: ErrorTheme
  loading: LoaderTheme
}>
const StatusWrapper = defineComponent(
  (props, { slots }) => {
    return () => {
      return h(
        'div',
        {
          style: {
            position: 'absolute',
          },
        },
        slots.default?.(),
      )
    }
  },
)
const IndicatorWrapper = defineComponent(
  (props, { slots }) => {
    return () => {
      return h(
        'div',
        {
          class: 'indicator-wrapper ',
        },
        slots.default?.(),
      )
    }
  },
)
const AnimatedIconWrapper = defineComponent(
  (props, { slots }) => {
    return () => {
      return h(
        'div',
        {
          class: 'animated-icon-wrapper',
        },
        slots.default?.(),
      )
    }
  },
)
</script>

<script setup lang="ts">
interface ToastIconProps {
  toast: Toast
}

const props = defineProps<ToastIconProps>()
</script>

<template>
  <AnimatedIconWrapper v-if="props.toast.icon !== undefined && typeof props.toast.icon === 'string'">
    {{ props.toast.icon }}
  </AnimatedIconWrapper>

  <component :is="props.toast.icon" v-else-if="(props.toast.icon !== undefined) && (typeof props.toast.icon !== 'string')" />

  <div v-else-if="props.toast.type === 'blank'" />

  <IndicatorWrapper v-else-if="!props.toast.icon">
    <LoaderIcon :props="props.toast.iconTheme" />
    <StatusWrapper v-if="props.toast.type !== 'loading'">
      <ErrorIcon v-if="props.toast.type === 'error'" :props="props.toast.iconTheme" />
      <CheckmarkIcon v-else :props="props.toast.iconTheme" />
    </StatusWrapper>
  </IndicatorWrapper>
</template>

<style scoped>
.animated-icon-wrapper {
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: animated-icon-enter 0.3s 0.12s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.indicator-wrapper {
  position: 'relative';
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
}
@keyframes animated-icon-enter {
  from {
    transform: scale(0.6);
    opacity: 0.4;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
