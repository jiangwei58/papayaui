<template>
  <view :class="ns.b()" :style="ns.style({ width: titleWidth })"></view>
</template>

<script setup lang="ts">
import { skeletonTitleProps } from './props'
import { useNamespace } from '@papayaui/core'

const ns = useNamespace('skeleton-title')

defineProps(skeletonTitleProps)
</script>

<style lang="scss">
@import '../../styles/vars.scss';

.#{$prefix}-skeleton-title {
  width: _var(skeleton-title-width, 40%);
  height: _var(skeleton-paragraph-height, 16px);
  margin: 0;
  background-color: _var(skeleton-title-paragraph-background, _var(color-active));
  border-radius: 3px;
}
</style>
