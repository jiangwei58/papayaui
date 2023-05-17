<template>
  <view :class="ns.b()"></view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'

const ns = useNamespace('safe-bottom')
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-safe-bottom {
  display: block;
  width: 100%;
  height: 0;
  @include safeBottomPadding();
}
</style>
