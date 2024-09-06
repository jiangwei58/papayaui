<template>
  <view v-show="show" :class="ns.e('overlay')" @tap="onClickOverlay"></view>
  <view :class="ns.e('wrapper')" @tap.stop="onVisibleChange()">
    <slot name="reference" />
  </view>
  <view v-show="show" :class="[ns.e('content'), ns.m(theme), ns.m('bottom')]" :style="contentStyle">
    <template v-if="!$slots.default">
      <view
        v-for="(action, index) in actions"
        :key="index"
        :class="[
          ns.e('action'),
          ns.is('with-icon', !!action.icon),
          ns.is('disabled', action.disabled),
        ]"
        :style="ns.style({ color: action.color })"
        :hover-class="ns.m('action-active')"
        @tap.stop="onSelect(action, index)"
      >
        <IconComponent
          v-if="action.icon"
          :class="ns.e('action-icon')"
          :class-prefix="iconPrefix"
          :name="action.icon"
        />
        <view :class="[ns.e('action-text'), { 'border-bottom': index < actions.length - 1 }]">
          {{ action.text }}
        </view>
      </view>
    </template>
    <slot v-else />

    <view :class="ns.e('arrow')" :style="{ transform: `translateX(${arrowLeft}px)` }"></view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import useRect from '../../hooks/useRect'
import { getUnitValue } from '../../utils'
import IconComponent from '../icon/icon.vue'
import type { PopoverAction } from './props'
import { popoverEmits, popoverProps } from './props'

const ns = useNamespace('popover')

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const show = ref<boolean>(false)

const instance = getCurrentInstance()

const wrapperRect = ref<Required<UniApp.NodeInfo>>({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
} as Required<UniApp.NodeInfo>)
const contentWidth = ref<number>(0)

const contentOffsetLeft = computed<number>(() => {
  const { left = 0, width = 0 } = wrapperRect.value
  const offsetLeft = left + width / 2 - contentWidth.value / 2
  return offsetLeft
})

const arrowLeft = computed(() => {
  return contentOffsetLeft.value < 0 ? contentOffsetLeft.value : 0
})

const contentStyle = computed(() => {
  return {
    opacity: wrapperRect.value.height && contentWidth ? '1' : '0',
    top: getUnitValue(wrapperRect.value.top + wrapperRect.value.height + props.offset[1], 'px'),
    left: getUnitValue(
      (contentOffsetLeft.value < 0 ? 0 : contentOffsetLeft.value) + props.offset[0],
      'px',
    ),
    zIndex: props.zIndex,
  }
})

watch(show, (newVal) => {
  if (instance && newVal) {
    nextTick(() => {
      useRect(instance, `.${ns.e('wrapper')}`).then((res) => {
        if (res) {
          wrapperRect.value = res
        }
      })
      useRect(instance, `.${ns.e('content')}`).then((res) => {
        if (res) {
          contentWidth.value = res.width || 0
        }
      })
    })
  }
})

const onVisibleChange = (visible = !show.value) => {
  show.value = visible
}

const onClickOverlay = () => {
  emit('click-overlay')
  if (props.closeOnClickOverlay) {
    onVisibleChange(false)
  }
}

const onSelect = (action: PopoverAction, index: number) => {
  if (action.disabled) return
  emit('select', action, index)
  if (props.closeOnClickAction) {
    onVisibleChange(false)
  }
}
</script>

<style lang="scss">
@import './popover.scss';
</style>
