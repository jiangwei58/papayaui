<template>
  <view :class="[ns.b(), ns.is('inset', inset)]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'

interface OwnProps {
  /** 是否展示为圆角卡片风格 */
  inset?: boolean
}

const ns = useNamespace('cell-group')

defineProps<OwnProps>()
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
