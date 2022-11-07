<template>
  <view :class="computedClass('popover')">
    <view
      v-show="show"
      :class="computedClass('popover-overlay')"
      @tap="onVisibleChange(false)"
    ></view>
    <view @tap.stop="onVisibleChange()">
      <slot></slot>
    </view>
    <view
      v-show="show"
      class="light bottom"
      :class="computedClass('popover-wapper')"
      :style="{
        width: getUnitValue(width),
        opacity: tooltipRect.height && tooltipContentWidth ? '1' : '0',
        top: tooltipRect.top + tooltipRect.height + 12 + 'px',
        left: (contentLeft < 0 ? 0 : contentLeft) + 'px',
      }"
      @tap.stop="onVisibleChange()"
    >
      <view v-if="text" class="text-28 leading-40" style="max-width: 420rpx">
        {{ text }}
      </view>
      <slot name="popover-content"></slot>
      <view class="popover-arrow" :style="{ transform: `translateX(${arrowLeft}px)` }"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import useRect from '../../hooks/useRect'

export interface PopoverProps {
  text?: string
  width?: string
}

withDefaults(defineProps<PopoverProps>(), {
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
      useRect(instance, `.${computedClass('popover')}`).then((res) => {
        if (res) {
          tooltipRect.value = res
        }
      })
      useRect(instance, `.${computedClass('popover-wapper')}`).then((res) => {
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
.#{$prefix}-popover {
  position: relative;
}
.#{$prefix}-popover-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
}
.#{$prefix}-popover-wapper {
  $arrowSize: 20rpx;
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  z-index: 9;
  padding: 0;
  border-radius: 8rpx;
  opacity: 0.9;
  box-shadow: 0px 0px 5px #dcdee0;

  .popover-arrow {
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

  &.light {
    $darkColor: #323233;
    color: $darkColor;
    background: #fff;
    .popover-arrow {
      &::before {
        border: 1px solid #fff;
        background: #fff;
        border-bottom-color: transparent !important;
        border-right-color: transparent !important;
      }
    }
  }

  &.bottom {
    $top: calc($arrowSize / 2);
    .popover-arrow {
      left: 50%;
      top: -$top;
      margin-left: -$top;
      border-top-left-radius: 2px;
    }
  }
}
</style>
