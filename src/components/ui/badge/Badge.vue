<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type BadgeVariants, badgeVariants } from '.'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
