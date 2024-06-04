<script setup lang="ts">
import toast, { Toaster } from '@arvinn/vue-hot-toast'

function notify1() {
  toast('Here is your toast.')
}
function notify2() {
  toast.error('Here is your toast.', {
    icon: '👏',
    duration: 5000,
  })
  // toast.error('Here is your toast.')
}
function notify3() {
  toast('Hello World', {
    duration: 400000,
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
      'role': 'status',
      'aria-live': 'polite',
    },
  })
}
function notify4() {
  toast.loading('Waiting...')
}
function notify5() {
  const component = defineComponent(
    () => {
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
          66666666666,
        )
      }
    },
  )
  toast.custom(markRaw(component))
}
async function notify6() {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello World')
    }, 2000)
  })
  await toast.promise(myPromise, {
    loading: 'Loading...',
    success: 'Success!',
    error: 'Error!',
  })
}
function notify7() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello World')
    }, 2000)
  })
  toast.promise(
    promise,
    {
      loading: 'Loading',
      success: (data: any) => `Successfully saved ${data.name || 'Arvin'}`,
      error: (err: any) => `This just happened: ${err.toString()}`,
    },
    {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 5000,
        icon: '🔥',
      },
    },
  )
}
</script>

<template>
  <main class=" flex flex-row flex-wrap gap-3">
    <button @click="notify1">
      Blank
    </button>
    <button @click="notify2">
      Error
    </button>
    <button @click="notify3">
      Optional
    </button>
    <button @click="notify4">
      Loading
    </button>
    <button @click="notify5">
      Custom
    </button>
    <button @click="notify6">
      Promise
    </button>
    <button @click="notify7">
      Advanced
    </button>
  </main>
  <!-- <Toaster /> -->
  <Toaster :toast-options="{ duration: 500000 }" />
</template>

<style scoped>
button {
  border: 1px solid #fff;
  padding: 7px 10px;
  border-radius: 10px;
}
</style>
