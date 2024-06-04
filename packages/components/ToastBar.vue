<script lang="ts">
import type { CSSProperties, Slots } from 'vue'
import { defineComponent, h } from 'vue'
import type { Toast, ToastPosition } from '../core/types'
import { prefersReducedMotion } from '../core/utils'
import ToastIcon from './ToastIcon.vue'

const ToastBarBase = defineComponent(
  (props, { slots }) => {
    // 这里是 setup
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
        slots.default?.(),
      )
    }
  },
)
const Message = defineComponent(
  (
    props: { ariaProps: Toast['ariaProps'] },
    { slots }: { slots: Slots },
  ) => {
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
          ...props.ariaProps,
        },
        slots.default?.(),
      )
    }
  },
  // 其他选项，例如声明 props 和 emits。
  {
    props: ['ariaProps'],
  },
)
</script>

<script setup lang="ts">
interface ToastBarProps {
  toast: Toast
  position?: ToastPosition
  style?: CSSProperties
}
const props = defineProps<ToastBarProps>()

const animationStyle: ComputedRef<CSSProperties> = computed(() => {
  return props.toast.height
    ? getAnimationStyle(
      props.toast.position || props.position || 'top-center',
      props.toast.visible,
    )
    : { opacity: 0 }
})

const enterFactor = ref('0%')
const exitFactor = ref('0%')

function getAnimationStyle(position: ToastPosition, visible: boolean): CSSProperties {
  // 这里需要根据 prefersReducedMotion() 设置不同的动画效果
  const top = position.includes('top')
  const factor = top ? 1 : -1

  const hasReduce = prefersReducedMotion()

  if (!hasReduce) {
    enterFactor.value = `${factor * -200}%`
    exitFactor.value = `${factor * -150}%`
  }

  return {
    animation: visible
      ? hasReduce ? 'fadeInAnimation' : 'enterAnimation 0.35s cubic-bezier(.21,1.02,.73,1) forwards'
      : hasReduce ? 'fadeOutAnimation' : 'exitAnimation 0.4s forwards cubic-bezier(.06,.71,.55,1)',
  }
}
</script>

<template>
  <ToastBarBase
    class="toast-bar"
    :style="{
      ...animationStyle,
      ...style,
      ...toast.style,
    }"
  >
    <ToastIcon :toast="toast" />
    <!-- eslint-disable -->
    <Message :ariaProps="toast.ariaProps">
      {{ toast.message }}
    </Message>
  </ToastBarBase>
</template>

<style>
.toast-bar {
  --enterFactor: v-bind(enterFactor);
  --exitFactor: v-bind(exitFactor);
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOutAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes enterAnimation {
  0% {
    transform: translate3d(0, var(--enterFactor), 0) scale(0.6);
    opacity: 0.5;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}
@keyframes exitAnimation {
  0% {
    transform: translate3d(0, 0, -1px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, var(--exitFactor), -1px) scale(0.6);
    opacity: 0;
  }
}
</style>
