<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'
import type { Toast, ToastPosition } from '../core/types'
import { prefersReducedMotion } from '../core/utils'
import ToastIcon from './ToastIcon.vue'

const ToastBarBase = defineComponent(
  () => {
    return () => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            color: '#363636',
            lineHeight: 1.3,
            willChange: 'transform',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)',
            maxWidth: '350px',
            pointerEvents: 'auto',
            padding: '8px 10px',
            borderRadius: '8px',
          },
        },
        h('slot', null),
      )
    }
  },
)
const Message = defineComponent(
  () => {
    return () => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            margin: '4px 10px',
            color: 'inherit',
            flex: '1 1 auto',
            whiteSpace: 'pre-line',
          },
        },
        h('slot', null),
      )
    }
  },
)
</script>

<script setup lang="ts">
interface ToastBarProps {
  toast: Toast
  position?: ToastPosition
  style?: CSSProperties
}

const { toast, position, style } = defineProps<ToastBarProps>()

function enterAnimation(factor: number) {
  return `
    0% {transform: translate3d(0,${factor * -200}%,0) scale(.6); opacity:.5;}
    100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
  `
}

function exitAnimation(factor: number) {
  return `
    0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
    100% {transform: translate3d(0,${factor * -150}%,-1px) scale(.6); opacity:0;}
  `
}

const fadeInAnimation = `0%{opacity:0;} 100%{opacity:1;}`
const fadeOutAnimation = `0%{opacity:1;} 100%{opacity:0;}`

const animationStyle: CSSProperties = toast.height
  ? getAnimationStyle(
    toast.position || position || 'top-center',
    toast.visible,
  )
  : { opacity: 0 }

function getAnimationStyle(position: ToastPosition, visible: boolean): CSSProperties {
  const top = position.includes('top')
  const factor = top ? 1 : -1

  const [enter, exit] = prefersReducedMotion()
    ? [fadeInAnimation, fadeOutAnimation]
    : [enterAnimation(factor), exitAnimation(factor)]

  return {
    animation: visible
      ? `enter 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
      : `exit 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
  }
}
</script>

<template>
  <ToastBarBase
    :style="{
      ...animationStyle,
      ...style,
      ...toast.style,
    }"
  >
    <slot name="icon">
      <ToastIcon :toast="toast" />
    </slot>
    <slot name="message">
      <Message :props="toast.ariaProps">
        {{ toast.message }}
      </Message>
    </slot>
  </ToastBarBase>
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
