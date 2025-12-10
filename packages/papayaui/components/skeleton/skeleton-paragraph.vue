<template>
  <view :class="ns.b()" :style="ns.style({ width: rowWidth })"></view>
</template>

<script setup lang="ts">
import { skeletonParagraphProps } from './props'
import { useNamespace } from '@papayaui/core'

const ns = useNamespace('skeleton-paragraph')

defineProps(skeletonParagraphProps)
</script>

<style lang="scss">
@import '../../styles/vars.scss';

.#{$prefix}-skeleton-paragraph {
  width: _var(skeleton-row-width, 100%);
  height: _var(skeleton-paragraph-height, 16px);
  margin-top: _var(skeleton-paragraph-margin-top, 12px);
  background-color: _var(skeleton-paragraph-background, _var(color-active));
  border-radius: 3px;
}
</style>
