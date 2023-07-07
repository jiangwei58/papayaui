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
@import '../../styles/vars.scss';
.#{$prefix}-loading-icon {
  position: relative;
  width: 24px;
  height: 24px;
  &__spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-style: solid;
    border-color: _var(color-primary) transparent transparent;
    border-radius: 50%;
    transform: rotate(0deg);
    transform-origin: center;
  }

  &__spinner:nth-child(1) {
    animation: loading-animation-1 1s 0s linear infinite;
  }

  &__spinner:nth-child(2) {
    animation: loading-animation-2 1s 0s linear infinite;
  }

  &__spinner:nth-child(3) {
    animation: loading-animation-3 1s 0s linear infinite;
  }
}

@keyframes loading-animation-1 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-animation-2 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-animation-3 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
