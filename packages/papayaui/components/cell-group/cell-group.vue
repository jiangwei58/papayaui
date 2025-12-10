<template>
  <view :class="[ns.b(), ns.is('inset', inset)]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { useNamespace } from '@papayaui/core'
import { cellGroupProps } from './props'

const ns = useNamespace('cell-group')

defineProps(cellGroupProps)
</script>

<style lang="scss">
@import './cell-group.scss';
</style>
