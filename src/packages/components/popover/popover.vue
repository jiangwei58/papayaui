<template>
  <view :class="[ns.b(), ns.is('show', show)]">
    <view v-show="show" :class="ns.b('overlay')" @tap="onVisibleChange(false)"></view>
    <view @tap.stop="onVisibleChange()">
      <slot></slot>
    </view>
    <view
      v-show="show"
      class="light bottom"
      :class="ns.b('wrapper')"
      :style="{
        width: getUnitValue(width),
        opacity: tooltipRect.height && tooltipContentWidth ? '1' : '0',
        top: tooltipRect.top + tooltipRect.height + 12 + 'px',
        left: (contentLeft < 0 ? 0 : contentLeft) + 'px',
        zIndex,
      }"
    >
      <view v-if="text" class="text-28 leading-40" style="max-width: 420rpx">
        {{ text }}
      </view>
      <slot name="popover-content"></slot>
      <view :class="ns.b('arrow')" :style="{ transform: `translateX(${arrowLeft}px)` }"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import useRect from '../../hooks/useRect'
import useNamespace from '../../core/useNamespace'

export interface PopoverProps {
  text?: string
  width?: string
  zIndex?: number
}

const ns = useNamespace('popover')

withDefaults(defineProps<PopoverProps>(), {
  text: '',
  width: '300',
  zIndex: 9,
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
.#{$prefix}-popover {
  $arrowSize: 20rpx;
  $darkColor: #323233;

  position: relative;
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
  }
  &-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    border-radius: 8rpx;
    opacity: 0.2;
    box-shadow: 0px 0px 5px #dcdee0;
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

  &-wrapper.light {
    color: $darkColor;
    background: #fff;
  }
  &-wrapper.light &-arrow {
    &::before {
      border: 1px solid #fff;
      background: #fff;
      border-bottom-color: transparent !important;
      border-right-color: transparent !important;
    }
  }

  &-wrapper.bottom &-arrow {
    $top: calc($arrowSize / 2);
    left: 50%;
    top: -$top;
    margin-left: -$top;
    border-top-left-radius: 2px;
  }
}
</style>
