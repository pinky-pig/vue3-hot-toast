import { genId } from './utils'
import { ActionType, dispatch } from './store'
import {
  type DefaultToastOptions,
  type Renderable,
  type Toast,
  type ToastOptions,
  type ToastType,
  type ValueOrFunction,
  resolveValue,
} from './types'

type Message = ValueOrFunction<Renderable, Toast>

type ToastHandler = (message: Message, options?: ToastOptions) => string

function createToast(
  message: Message,
  type: ToastType = 'blank',
  opts?: ToastOptions,
): Toast {
  return {
    createdAt: Date.now(),
    visible: true,
    type,
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
    message,
    pauseDuration: 0,
    ...opts,
    id: opts?.id || genId(),
  }
}

function createHandler(type?: ToastType): ToastHandler {
  return (message, options) => {
    const toast = createToast(message, type, options)
    dispatch({ type: ActionType.UPSERT_TOAST, toast })
    return toast.id
  }
}

function toast(message: Message, opts?: ToastOptions) {
  return createHandler('blank')(message, opts)
}

toast.error = createHandler('error')
toast.success = createHandler('success')
toast.loading = createHandler('loading')
toast.custom = createHandler('custom')

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: ActionType.DISMISS_TOAST,
    toastId,
  })
}

toast.remove = (toastId?: string) =>
  dispatch({ type: ActionType.REMOVE_TOAST, toastId })

toast.promise = <T>(
  promise: Promise<T>,
  msgs: {
    loading: Renderable
    success: ValueOrFunction<Renderable, T>
    error: ValueOrFunction<Renderable, any>
  },
  opts?: DefaultToastOptions,
) => {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading })

  promise
    .then((p) => {
      toast.success(resolveValue(msgs.success, p), {
        id,
        ...opts,
        ...opts?.success,
      })
      return p
    })
    .catch((error) => {
      toast.error(resolveValue(msgs.error, error), {
        id,
        ...opts,
        ...opts?.error,
      })
    })

  return promise
}

export { toast }
