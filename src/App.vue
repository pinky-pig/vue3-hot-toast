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
  const toastId = toast.loading('Waiting...')

  setTimeout(() => {
    toast.dismiss(toastId)
  }, 5000)
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
function notify8() {
  toast.dismiss()
}
function notify9() {
  const toastId = toast.loading('Waiting...')
  setTimeout(() => {
    toast.remove(toastId)

    setTimeout(() => {
      toast.remove()
    }, 1000)
  }, 5000)
}

function notify10() {
  const toastId = toast.loading('Waiting...')
  setTimeout(() => {
    toast.success('This worked', {
      id: toastId,
    })
  }, 5000)
}
function notify11() {
  toast.success('Copied to clipboard!', {
    id: 'clipboard',
  })
}
function notify12() {
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
          '使用默认样式的 Message 信息组件',
        )
      }
    },
  )
  toast(
    markRaw(component),
    {
      icon: '🤩',
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
    <button @click="notify7">
      Advanced
    </button>
    <button @click="notify8">
      DismissAll
    </button>
    <button @click="notify9">
      RemoveAll
    </button>
    <button @click="notify10">
      Update
    </button>
    <button @click="notify11">
      Customize Id
    </button>
    <button @click="notify12">
      Component
    </button>
  </main>
  <!-- <Toaster /> -->
  <Toaster position="bottom-center" :toast-options="{ duration: 500000 }">
    <!-- <div>666</div> -->
    <template #toastBar>
      8888
    </template>
  </Toaster>
</template>

<style scoped>
button {
  border: 1px solid #fff;
  padding: 7px 10px;
  border-radius: 10px;
}
</style>
