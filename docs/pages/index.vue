<script setup lang="ts">
import { ref } from 'vue'
import toast, { Toaster } from 'vue3-hot-toast'

// @ts-ignore
import Butter1 from '../assets/butter-1.svg?raw'
// @ts-ignore
import Butter2 from '../assets/butter-2.svg?raw'
// @ts-ignore
import Logo from '../assets/logo.svg?raw'
// @ts-ignore
import Github from '../assets/github.svg?raw'

import packageInfo from '../../packages/package.json'
import Features from '../components/Features.vue'
import Steps from '../components/Steps.vue'
import ToastExample from '../components/ToastExample.vue'
import ToasterExample from '../components/ToasterExample.vue'
import Footer from '../components/Footer.vue'
import type { ToastPosition } from 'vue3-hot-toast/core/types'

const version = packageInfo.version

const position = ref<ToastPosition>('top-center')
const reverse = ref(false)

function setPosition(e: ToastPosition) {
  position.value = e
}

function setReverse(e: boolean) {
  reverse.value = e
}

const shouldFade = ref(false)

function triggerToast() {
  const promise = new Promise((res, rej) => {
    if (Math.random() < 0.85) {
      setTimeout(res, 1000)
    } else {
      setTimeout(rej, 3000)
    }
  })

  toast.promise(
    promise,
    {
      loading: 'Preparing toast',
      error: 'Whoops, it burnt',
      success: "Here's your toast",
    },
    {
      style: {
        width: '200px',
        paddingRight: '10px',
      },
    },
  )
}
</script>

<template>
  <div class="overflow-x-hidden">
    <header
      class="text-[#3c3c42] bg-gradient-to-b from-toast-50 to-white bg-opacity-10"
    >
      <div class="container flex flex-col items-center relative">
        <div
          class="absolute -left-24 md:left-24 transition-opacity duration-200"
          :style="{
            opacity: shouldFade ? 0.5 : 1,
          }"
          v-html="Butter1"
        />

        <div>
          <div
            role="img"
            aria-label="vue3-hot-toast"
            class="relative animate-slide-in transition-all duration-200 -mt-8 md:-mt-4"
            :style="{
              willChange: 'filter',
              opacity: shouldFade ? 0.2 : 1,
              filter: `blur(${shouldFade ? 6 : 0}px)`,
            }"
            v-html="Logo"
          />
        </div>
        <div class="text-center my-12 relative duration-200">
          <h1
            class="text-3xl md:text-4xl animate-enter font-bold text-toast-900"
          >
            The Best Toast in Town.
          </h1>
          <h2 class="text-xl md:text-2xl font-bold text-toast-600 mt-2">
            Smoking hot Vue notifications.
          </h2>
        </div>

        <div
          class="grid md:grid-cols-2 gap-4 rounded-2xl bg-toast-200 p-4 w-full max-w-lg"
        >
          <button
            data-splitbee-event="Trigger Toast"
            data-splitbee-event-example="CTA"
            class="focus:outline-none focus:ring-4 active:translate-y-0.5 active:shadow-button-active active:bg-gray-100 transform py-4 px-6 rounded-lg font-bold gap-4 flex bg-gradient-to-b from-white to-toast-200 shadow-button text-center"
            :style="{
              transitionProperty: 'box-shadow, transform',
            }"
            @click="triggerToast"
          >
            <div>🛎</div>
            <span class="flex-1 mr-2">Make me a toast</span>
          </button>
          <a
            class="rounded-lg flex font-bold bg-white py-4 px-6 shadow-button text-toast-800 active:translate-y-0.5 active:shadow-button-active transform"
            :style="{
              transitionProperty: 'box-shadow, transform',
            }"
            data-splitbee-event="Open Link"
            data-splitbee-event-target="GitHub"
            href="https://github.com/pinky-pig/vue3-hot-toast"
            target="_blank"
          >
            <div class="opacity-100" v-html="Github" />
            <span class="flex-1 text-toast-800 text-center">GitHub</span>
          </a>
        </div>
        <div class="text-toast-600 my-2">
          <a href="/overview/get-started" class="underline"> Documentation </a>
          {{ ' · ' }}
          <span>v{{ version }}</span>
        </div>

        <Features />
        <Steps />
        <div class="w-full max-w-4xl">
          <div class="my-14">
            <h2 class="ml-5 text-2xl font-bold">Examples</h2>
            <ToastExample />
          </div>
          <div class="my-14">
            <h2 class="ml-5 mr-5 mb-4 text-2xl font-bold">Change Position</h2>

            <ToasterExample
              :reverse="reverse"
              :position="position"
              @on-reverse="setReverse"
              @on-position="setPosition"
            />
          </div>
        </div>
      </div>
    </header>

    <Toaster
      :position="position"
      :reverse-order="reverse"
      :toast-options="{}"
    />
    <div class="container flex justify-end -mt-10 pointer-events-none">
      <div class-name="transform translate-x-20" v-html="Butter2" />
    </div>
    <Footer />
  </div>
</template>
