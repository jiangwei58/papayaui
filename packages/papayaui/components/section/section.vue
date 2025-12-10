<template>
  <view
    :class="ns.b()"
    class="flex items-center"
    :style="ns.style({ backgroundColor: bgColor })"
    @click="emit('click', $event)"
  >
    <view :class="ns.b('line')"></view>
    <view :class="ns.b('title')">
      <slot v-if="$slots.title" name="title" />
      <text v-else>{{ title }}</text>
    </view>
    <slot v-if="$slots.default"></slot>
  </view>
</template>

<script lang="ts" setup>
import { useNamespace } from '@papayaui/core'
import { sectionEmits, sectionProps } from './props'

const ns = useNamespace('section')

defineProps(sectionProps)
const emit = defineEmits(sectionEmits)
</script>

<style lang="scss">
@import './section.scss';
</style>
