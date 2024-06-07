# `<Toaster />` API

This component will render all toasts.

## Available options

```vue
<Toaster
  position="top-center"
  :reverse-order="false"
  :toast-options="{
    // Define default options
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }"
/>
```

### `position` Prop

You can change the position of all toasts by modifying supplying `positon` prop.

| Positions   |               |              |
| ----------- | ------------- | ------------ |
| top-left    | top-center    | top-right    |
| bottom-left | bottom-center | bottom-right |

### `reverseOrder` Prop

Toasts spawn at top by default. Set to `true` if you want new toasts at the end.

### `gutter` Prop

Changes the gap between each toast. Defaults to `8`.

### `toastOptions` Prop

These will act as default options for all toasts. See [`toast()`](/api/toast) for all available options.

#### Type specific options

You can change the defaults for a specific type by adding, `success: {}`, `error: {}`, `loading: {}` or `custom: {}`.



### Add custom content

```vue
<Toaster position="bottom-center" :toast-options="{ duration: 500000 }">
  <div>Custom toast bar</div>
</Toaster>
```

Or:
```vue
<Toaster position="bottom-center" :toast-options="{ duration: 500000 }">
  <template #toastbar>
    ToastBar Slot
  </template> 
</Toaster>
```

Or:
```vue
<Toaster position="bottom-center" :toast-options="{ duration: 500000 }">
  <template #toastBar="{ toast, position }">
    <ToastBar
      :toast="toast"
      :position="position"
    >
      <button @click="handleDismiss(toast)">
        X
      </button>
    </ToastBar>
  </template>
</Toaster>
```
