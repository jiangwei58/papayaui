<template>
  <view
    :class="ns.b()"
    :style="{
      width: size ? getUnitValue(size) : undefined,
      height: size ? getUnitValue(size) : undefined,
    }"
  >
    <view :class="ns.e('spinner')" :style="{ borderTopColor: color }" />
    <view :class="ns.e('spinner')" :style="{ borderTopColor: color }" />
    <view :class="ns.e('spinner')" :style="{ borderTopColor: color }" />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import { loadingIconProps } from './props'

const ns = useNamespace('loading-icon')

defineProps(loadingIconProps)
</script>

<style lang="scss" scoped>
@import './loading-icon.scss';
</style>
