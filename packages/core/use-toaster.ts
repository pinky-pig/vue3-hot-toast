/* eslint-disable array-callback-return */
import { watchEffect } from 'vue'
import { ActionType, dispatch, useStore } from './store'
import { toast } from './toast'
import type { DefaultToastOptions, Toast, ToastPosition } from './types'

function updateHeight(toastId: string, height: number) {
  dispatch({
    type: ActionType.UPDATE_TOAST,
    toast: { id: toastId, height },
  })
}
function startPause() {
  dispatch({
    type: ActionType.START_PAUSE,
    time: Date.now(),
  })
}

export function useToaster(toastOptions?: DefaultToastOptions) {
  const { toasts, pausedAt } = useStore(toastOptions)

  nextTick(() => {
    if (pausedAt) {
      return
    }

    const now = Date.now()
    toasts.map((t) => {
      if (t.duration === Number.POSITIVE_INFINITY) {
        return
      }

      const durationLeft =
        (t.duration || 0) + t.pauseDuration - (now - t.createdAt)

      if (durationLeft < 0) {
        if (t.visible) {
          toast.dismiss(t.id)
        }
      } else {
        return setTimeout(() => toast.dismiss(t.id), durationLeft)
      }
    })
  })

  const endPause = watchEffect(() => {
    if (pausedAt) {
      dispatch({ type: ActionType.END_PAUSE, time: Date.now() })
    }
  })

  const calculateOffset = (
    toast: Toast,
    opts?: {
      reverseOrder?: boolean
      gutter?: number
      defaultPosition?: ToastPosition
    },
  ) => {
    const { reverseOrder = false, gutter = 8, defaultPosition } = opts || {}

    const relevantToasts = toasts.filter(
      (t) =>
        (t.position || defaultPosition) ===
          (toast.position || defaultPosition) && t.height,
    )
    const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id)
    const toastsBefore = relevantToasts.filter(
      (toast, i) => i < toastIndex && toast.visible,
    ).length

    const offset = relevantToasts
      .filter((t) => t.visible)
      .slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
      .reduce((acc, t) => acc + (t.height || 0) + gutter, 0)

    return offset
  }

  return {
    toasts,
    handlers: {
      updateHeight,
      startPause,
      endPause,
      calculateOffset,
    },
  }
}
