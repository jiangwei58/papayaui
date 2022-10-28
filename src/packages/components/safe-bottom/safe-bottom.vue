<template>
  <view :class="computedClass('safe-bottom')"></view>
</template>

<script lang="ts" setup>
import { computedClass } from '../../utils/style'
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-safe-bottom {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
