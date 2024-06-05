import { type Ref, ref } from 'vue'
import type { DefaultToastOptions, Toast, ToastType } from './types'

const TOAST_LIMIT = 20

export enum ActionType {
  ADD_TOAST,
  UPDATE_TOAST,
  UPSERT_TOAST,
  DISMISS_TOAST,
  REMOVE_TOAST,
  START_PAUSE,
  END_PAUSE,
}

type Action =
  | {
      type: ActionType.ADD_TOAST
      toast: Toast
    }
  | {
      type: ActionType.UPSERT_TOAST
      toast: Toast
    }
  | {
      type: ActionType.UPDATE_TOAST
      toast: Partial<Toast>
    }
  | {
      type: ActionType.DISMISS_TOAST
      toastId?: string
    }
  | {
      type: ActionType.REMOVE_TOAST
      toastId?: string
    }
  | {
      type: ActionType.START_PAUSE
      time: number
    }
  | {
      type: ActionType.END_PAUSE
      time: number
    }
interface State {
  toasts: Toast[]
  pausedAt: number | undefined
}

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>()

export const TOAST_EXPIRE_DISMISS_DELAY = 1000

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId,
    })
  }, TOAST_EXPIRE_DISMISS_DELAY)

  toastTimeouts.set(toastId, timeout)
}

function clearFromRemoveQueue(toastId: string) {
  const timeout = toastTimeouts.get(toastId)
  if (timeout) {
    clearTimeout(timeout)
  }
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case ActionType.UPDATE_TOAST:
      //  ! Side effects !
      if (action.toast.id) {
        clearFromRemoveQueue(action.toast.id)
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case ActionType.UPSERT_TOAST: {
      const { toast } = action
      return state.toasts.some((t) => t.id === toast.id)
        ? reducer(state, { type: ActionType.UPDATE_TOAST, toast })
        : reducer(state, { type: ActionType.ADD_TOAST, toast })
    }

    case ActionType.DISMISS_TOAST: {
      const { toastId } = action

      // ! Side effects ! - This could be execrated into a dismissToast() action, but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                visible: false,
              }
            : t,
        ),
      }
    }
    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }

    case ActionType.START_PAUSE:
      return {
        ...state,
        pausedAt: action.time,
      }

    case ActionType.END_PAUSE: {
      const diff = action.time - (state.pausedAt || 0)

      return {
        ...state,
        pausedAt: undefined,
        toasts: state.toasts.map((t) => ({
          ...t,
          pauseDuration: t.pauseDuration + diff,
        })),
      }
    }
  }
}

export const defaultTimeouts: {
  [key in ToastType]: number
} = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: Number.POSITIVE_INFINITY,
  custom: 4000,
}

// 这个是所有的 toast 数组状态
let memoryState: State = { toasts: [], pausedAt: undefined }

// 这个目的是触发事件监听，watch 这个值
export const listeners: Ref<Array<number>> = ref([])

// 分发事件，将 action 传递给 reducer 函数，然后更新 memoryState
export function dispatch(action: Action) {
  const reduceMemoryState = reducer(memoryState, action)

  if (!areEqual(reduceMemoryState, memoryState)) {
    memoryState = reduceMemoryState
    if (memoryState.toasts.length === 0) {
      listeners.value.splice(0, listeners.value.length)
    } else {
      listeners.value.push(0)
    }
  }
}

function areEqual(obj1: State, obj2: State) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

// 创建一个 store ，每个 toast 都有一个
export function useStore(toastOptions: DefaultToastOptions = {}): State {
  const mergedToasts = memoryState.toasts.map((t) => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t,
    duration:
      t.duration ||
      toastOptions[t.type]?.duration ||
      toastOptions?.duration ||
      defaultTimeouts[t.type],
    style: {
      ...toastOptions.style,
      ...toastOptions[t.type]?.style,
      ...t.style,
    },
  }))

  return {
    ...memoryState,
    toasts: mergedToasts,
  }
}
