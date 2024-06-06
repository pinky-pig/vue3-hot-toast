<template>
  <button
    class="w-full rounded bg-white text-sm font-semibold py-2 px-2 shadow-small-button flex items-center"
  >
    <span
      :style="{
        fontFamily:
          'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
      }"
    >
      <slot name="emoji" />
    </span>
    <div class="flex-1 px-3">
      <slot />
    </div>
  </button>
</template>

<style scoped></style>
