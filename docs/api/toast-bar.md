# `<ToastBar />` API

This is the **default toast component** rendered by the [Toaster](/api/toaster). You can use this component in a [Toaster](/api/toaster) with a custom render function to overwrite its defaults.

## Available options

```vue
<ToastBar 
  position="top-center" 
  :toast="t" 
  :position="t.position || props.position" 
/>
```

## Add custom content

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
