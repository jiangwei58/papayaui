<template>
  <TransitionComponent
    :custom-class="ns.b()"
    :show="show"
    :duration="duration"
    mode="fade"
    :custom-style="overlayStyle"
    @click="emit('click')"
  >
    <slot />
  </TransitionComponent>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useNamespace } from '@papayaui/core'
import TransitionComponent from '../transition/transition.vue'
import { overlayEmits, overlayProps } from './props'

const ns = useNamespace('overlay')

const props = defineProps(overlayProps)
const emit = defineEmits(overlayEmits)

const overlayStyle = computed(() => {
  return {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: props.zIndex,
    ...props.customStyle,
  } as CSSProperties
})
</script>

<style lang="scss">
@import './overlay.scss';
</style>
