<script setup lang="ts" generic="T extends any, O extends any">

</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-center px-4 pt-10">
    <div class="py-8" />

    <BentoIcon class="w-12 h-12 inline-block mb-4" />

    <h1 class="text-4xl font-bold mb-2">
      Starte Vue Lib
    </h1>

    <p>
      <em class="text-sm opacity-75">A simple component for Vue3.</em>
    </p>

    <div
      class="w-full max-w-[652px] mx-auto text-start"
      style="
        padding-left: max(16px, env(safe-area-inset-left));
        padding-right: max(16px, env(safe-area-inset-right));
      "
    >
      <Installation />
    </div>

    <TheFooter />

    <Sonner
      position="top-center"
      :expand="false"
      :rich-colors="false"
      :close-button="false"
    />
  </div>
</template>
