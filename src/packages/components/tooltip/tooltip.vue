<template>
  <view :class="[ns.b(), ns.m('dark'), ns.m('bottom')]">
    <view @tap="onVisibleChange()">
      <slot></slot>
    </view>
    <view v-show="show" :class="ns.b('overlay')" @click="onVisibleChange(false)"></view>
    <view
      v-show="show"
      :class="ns.b('wrapper')"
      :style="{
        width: getUnitValue(width),
        opacity: tooltipRect.height && tooltipContentWidth ? '1' : '0',
        top: tooltipRect.top + tooltipRect.height + 12 + 'px',
        left: (contentLeft < 0 ? 0 : contentLeft) + 'px',
      }"
    >
      <view class="text-28 leading-40" style="max-width: 420rpx">
        {{ text }}
      </view>
      <view :class="ns.b('arrow')" :style="{ transform: `translateX(${arrowLeft}px)` }"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import useRect from '../../hooks/useRect'
import useNamespace from '../../core/useNamespace'

export interface TooltipProps {
  /** 悬浮内容 */
  text?: string
  /** 宽度 */
  width?: string
}

const ns = useNamespace('tooltip')

withDefaults(defineProps<TooltipProps>(), {
  text: '',
  width: '300',
})

const show = ref<boolean>(false)

const instance = getCurrentInstance()

const tooltipRect = ref<Required<UniApp.NodeInfo>>({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
} as Required<UniApp.NodeInfo>)
const tooltipContentWidth = ref<number>(0)

const contentLeft = computed<number>(() => {
  return (
    (tooltipRect.value.left || 0) -
    tooltipContentWidth.value / 2 +
    (tooltipRect.value.width || 0) / 2
  )
})

const arrowLeft = computed(() => {
  return contentLeft.value < 0 ? contentLeft.value : 0
})

watch(show, (newVal) => {
  if (instance && newVal) {
    nextTick(() => {
      useRect(instance, `.${ns.b()}`).then((res) => {
        if (res) {
          tooltipRect.value = res
        }
      })
      useRect(instance, `.${ns.b('wrapper')}`).then((res) => {
        if (res) {
          tooltipContentWidth.value = res.width || 0
        }
      })
    })
  }
})

const onVisibleChange = (visible = !show.value) => {
  show.value = visible
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-tooltip {
  $arrowSize: 20rpx;
  $darkColor: #323233;
  position: relative;
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
  }
  &-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    margin: 0;
    z-index: 9;
    padding: 22rpx 24rpx;
    border-radius: 8rpx;
    opacity: 0.9;
  }
  &-arrow {
    position: absolute;
    width: $arrowSize;
    height: $arrowSize;
    z-index: -1;
    &::before {
      position: absolute;
      width: $arrowSize;
      height: $arrowSize;
      z-index: -1;
      content: ' ';
      transform: rotate(45deg);
      box-sizing: border-box;
    }
  }
  &--dark &-wrapper {
    color: #fff;
    background: $darkColor;
  }
  &--dark &-arrow {
    &::before {
      border: 1px solid $darkColor;
      background: $darkColor;
      border-bottom-color: transparent !important;
      border-right-color: transparent !important;
    }
  }
  &--bottom &-arrow {
    $top: calc($arrowSize / 2);
    left: 50%;
    top: -$top;
    margin-left: -$top;
    border-top-left-radius: 2px;
  }
}
</style>
