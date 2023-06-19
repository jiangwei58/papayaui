<template>
  <view :class="ns.b()" :style="ns.style({ width: rowWidth })"></view>
</template>

<script setup lang="ts">
import useNamespace from '../../core/useNamespace'
import { skeletonProps, skeletonParagraphProps } from '../skeleton'
import { pickProps } from '../../utils'

const ns = useNamespace('skeleton-paragraph')

defineProps({
  ...skeletonParagraphProps,
  ...pickProps(skeletonProps, ['round']),
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-skeleton-paragraph {
  width: _var(skeleton-row-width, 100%);
  height: _var(skeleton-paragraph-height, 16px);
  margin-top: _var(skeleton-paragraph-margin-top, 12px);
  background-color: _var(skeleton-paragraph-background, _var(color-active));
  border-radius: 3px;
}
</style>
