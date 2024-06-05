import type { CSSProperties, Component } from 'vue'

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom'
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type Renderable = Component | string | null

export interface IconTheme {
  primary: string
  secondary: string
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>

function isFunction<TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
): valOrFunction is ValueFunction<TValue, TArg> {
  return typeof valOrFunction === 'function'
}

export function resolveValue<TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg,
): TValue {
  return isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction
}

export interface Toast {
  type: ToastType
  id: string
  message: ValueOrFunction<Renderable, Toast>
  icon?: Renderable
  duration?: number
  pauseDuration: number
  position?: ToastPosition

  ariaProps: {
    role: 'status' | 'alert'
    'aria-live': 'assertive' | 'off' | 'polite'
  }

  style?: CSSProperties
  className?: string
  iconTheme?: IconTheme

  createdAt: number
  visible: boolean
  height?: number
}

export type ToastOptions = Partial<
  Pick<
    Toast,
    | 'id'
    | 'icon'
    | 'duration'
    | 'ariaProps'
    | 'className'
    | 'style'
    | 'position'
    | 'iconTheme'
  >
>
export type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions
}

export interface ToasterProps {
  position?: ToastPosition
  toastOptions?: DefaultToastOptions
  reverseOrder?: boolean
  gutter?: number
}

export interface ToastWrapperProps {
  id: string
}
export interface ToastWrapperEmits {
  onHeightUpdate: (id: string, height: number) => void
}

export interface ToastBarProps {
  toast: Toast
  position?: ToastPosition
  style?: CSSProperties
}

export interface ToastIconProps {
  toast: Toast
}
