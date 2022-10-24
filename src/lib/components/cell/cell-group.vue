<template>
  <view :class="computedClass('cell-group', { 'cell-group--inset': inset })">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computedClass } from '@/lib/utils/style'

interface OwnProps {
  /** 是否展示为圆角卡片风格 */
  inset?: boolean
}

defineProps<OwnProps>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cell-group {
  background-color: var(--cell-group-bg-color);
  &.#{$prefix}-cell-group--inset {
    margin: 0 var(--cell-group-margin-x);
    overflow: hidden;
    border-radius: var(--cell-group-rounded);
  }
}
</style>
