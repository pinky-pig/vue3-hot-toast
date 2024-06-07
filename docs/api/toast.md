
# `toast()` API

Call it to create a toast from anywhere, Make sure you add the [`<Toaster/>`](/api/toaster) component to your app first.

## Available toast options

You can provide `ToastOptions` as the second argument. They will overwrite all options received from [`<Toaster/>`](/api/toaster).

```js
toast('Hello World', {
  duration: 4000,
  position: 'top-center',

  // Styling
  style: {},
  className: '',

  // Custom Icon
  icon: '👏',

  // Change colors of success/error/loading icon
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },

  // Aria
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
});
```

## Creating a toast

### Blank

```js
toast('Hello World');
```

The most basic variant. It does not have an icon by default, but you can provide one via the options. If you don't want any default styles, use `toast.custom()` instead.

### Success

```js
toast.success('Successfully created!');
```

Creates a notification with an animated checkmark. It can be themed with the `iconTheme` option.

### Error

```js
toast.error('This is an error!');
```

Creates a notification with an animated error icon. It can be themed with the `iconTheme` option.

### Custom (Component context)

```vue
<!-- Custom component -->
<template>
  <div>Hello World</div>
</template>
```

```js
toast(markRaw(component))
```

Creates a custom notification with vue component without default styles.

### Loading

```js
toast.loading('Waiting...');
```

This will create a loading notification. Most likely, you want to update it afterwards. For a friendly alternative, check out `toast.promise()`, which takes care of that automatically.

### Promise

This shorthand is useful for mapping a promise to a toast. It will update automatically when the promise resolves or fails.

#### Simple Usage

```js
const myPromise = fetchData();

toast.promise(myPromise, {
  loading: 'Loading',
  success: 'Got the data',
  error: 'Error when fetching',
});
```

It's recommend to add min-width to your `toast.promise()` calls to **prevent jumps** from different message lengths.

#### Advanced

You can provide a function to the success/error messages to incorporate the result/error of the promise. The third argument are `toastOptions` similiar to [`<Toaster />`](/api/toaster)

```js
toast.promise(
  myPromise,
  {
    loading: 'Loading',
    success: (data) => `Successfully saved ${data.name}`,
    error: (err) => `This just happened: ${err.toString()}`,
  },
  {
    style: {
      minWidth: '250px',
    },
    success: {
      duration: 5000,
      icon: '🔥',
    },
  }
);
```

## Default durations

Every type has its own duration. You can overwrite them `duration` with the toast options. This can be done per toast options or globally by the [`<Toaster/>`](/api/toaster).

| type      | duration |
| --------- | -------- |
| `blank`   | 4000     |
| `error`   | 4000     |
| `success` | 2000     |
| `custom`  | 4000     |
| `loading` | Infinity |

### Dismiss toast programmatically

You can manually dismiss a notification with `toast.dismiss`. Be aware that it triggers the exit animation and does not remove the Toast instantly. Toasts will auto-remove after 1 second by default.

#### Dismiss a single toast

```js
const toastId = toast.loading('Loading...');

// ...

toast.dismiss(toastId);
```

You can dismiss all toasts at once, by leaving out the `toastId`.

#### Dismiss all toasts at once

```js
toast.dismiss();
```

To remove toasts instantly without any animations, use `toast.remove`.

#### Remove toasts instantly

```js
toast.remove(toastId);

// or

toast.remove();
```

### Update an existing toast

Each toast call returns a unique id. Use in the toast options to update the existing toast.

```js
const toastId = toast.loading('Loading...');

// ...

toast.success('This worked', {
  id: toastId,
});
```

### Prevent duplicate toasts

To prevent duplicates of the same kind, you can provide a unique permanent id.

```js
toast.success('Copied to clipboard!', {
  id: 'clipboard',
});
```

### Render JSX custom content

You can provide a React component instead of text. If you don't want any default styles use `toast.custom()` instead.

```jsx
const component = defineComponent(() => {
  return () => {
    return h(
      'div',
      {
        style: {
          fontSize: '16px',
          color: '#fff',
          background: '#000',
          padding: '10px',
          borderRadius: '10px',
        },
      },
      'Custom message with component',
    )
  }
})
toast(markRaw(component), {
  icon: '🤩',
})
```

You can also supply a function that receives the `Toast` as an argument, giving you access to all properties. This allows you to access the toast id, which can be used to add a dismiss button.

```jsx
const component = defineComponent(() => {
  return () => {
    return h(
      'span',
      {
        class: 'px-2',
      },
      [
        'Custom and',
        h('b', {}, 'bold'),
        h(
          'button',
          {
            class:
              'ml-2 py-1 rounded px-2 border bg-gray-100 text-gray-900',
            onClick: () => toast.dismiss(toastId),
          },
          'Dismiss',
        ),
      ],
    )
  }
})
// 其实组件中 props 会有一个 t ，这个就是当前的 toast 组件状态
const toastId = toast(markRaw(component))
```

Using custom toast in a single vue component file.

```vue
<!-- ToastExampleCustom.vue -->
<script setup lang="ts">
import toast from 'vue3-hot-toast'
import type { Toast } from 'vue3-hot-toast/core/types'
defineProps<{
  t: Toast
}>()
</script>

<template>
  <div
    :class="t?.visible ? 'animate-enter' : 'animate-leave'"
    class="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
  >
    <div class="flex-1 w-0 p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0 pt-0.5">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
          />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">Emilia Gates</p>
          <p class="mt-1 text-sm text-gray-500">Sure! 8:30pm works great!</p>
        </div>
      </div>
    </div>
    <div class="flex border-l border-gray-200">
      <button
        class="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @click="toast.dismiss(t?.id)"
      >
        Close
      </button>
    </div>
  </div>
</template>
```

```js
import ToastExampleCustom from './ToastExampleCustom.vue'

toast.custom(markRaw(ToastExampleCustom), { duration: 10000 })
```
