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
@import '../../styles/vars.scss';
.#{$prefix}-cell-group {
  background-color: _var(cell-group-bg-color, 8px);
  &--inset {
    margin: 0 _var(cell-group-margin-x, 16px);
    overflow: hidden;
    border-radius: _var(cell-group-rounded, 8px);
  }
}
</style>
