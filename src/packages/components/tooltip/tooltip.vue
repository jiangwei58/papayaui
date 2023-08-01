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
import { getUnitValue } from '../../utils'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import useRect from '../../hooks/useRect'
import useNamespace from '../../core/useNamespace'
import { tooltipProps } from './props'

const ns = useNamespace('tooltip')

defineProps(tooltipProps)

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
@import './tooltip.scss';
</style>
