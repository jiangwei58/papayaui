<template>
  <view :class="[ns.b(), ns.is('inset', inset)]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import { cellGroupProps } from './props'

const ns = useNamespace('cell-group')

defineProps(cellGroupProps)
</script>

<style lang="scss" scoped>
@import './cell-group.scss';
</style>
