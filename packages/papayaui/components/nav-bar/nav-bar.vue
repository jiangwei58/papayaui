<template>
  <view
    :class="[
      ns.b(),
      ns.m(theme),
      ns.is('single', leftMenu.length === 1),
      ns.is('development', deviceInfo.platform === 'devtools'),
    ]"
    :style="{ backgroundColor: bgColor, paddingTop: getUnitValue(statusBarHeight, 'px') }"
  >
    <view v-if="leftMenu.length" :class="ns.e('capsule-menu')" :style="capsuleMenuStyle">
      <IconComponent :name="leftMenu[0]" @click="onLeftMenuClick(0)" />
      <template v-if="leftMenu.length > 1">
        <view :class="ns.e('capsule-menu-line')"></view>
        <IconComponent :name="leftMenu[1]" @click="onLeftMenuClick(1)" />
      </template>
    </view>
    <view :class="ns.b('content')" :style="{ height: getUnitValue(contentHeight, 'px') }">
      <text
        v-if="!$slots.default"
        :class="ns.e('title')"
        :style="{
          lineHeight: getUnitValue(contentHeight, 'px'),
        }"
      >
        {{ title }}
      </text>
      <slot v-else></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import IconComponent from '../icon/icon.vue'
import { navBarEmits, navBarProps } from './props'

const windowInfo = uni.getWindowInfo()
const deviceInfo = uni.getDeviceInfo()
let menuButtonInfo: UniApp.GetMenuButtonBoundingClientRectRes = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 87,
  height: 32,
}
// #ifdef MP
menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

const ns = useNamespace('nav-bar')

const props = defineProps(navBarProps)
const emit = defineEmits(navBarEmits)

const statusBarHeight = computed(() => {
  return props.safeAreaInsetTop ? (windowInfo.statusBarHeight as number) : 0
})

const contentHeight = computed(() => {
  return deviceInfo.platform === 'ios' ? 44 : 48
})

const capsuleMenuStyle = computed<CSSProperties>(() => {
  let top = menuButtonInfo.top
  if (!props.safeAreaInsetTop) {
    top = (contentHeight.value - menuButtonInfo.height) / 2
  }
  return {
    width: menuButtonInfo.width + 'px',
    height: menuButtonInfo.height + 'px',
    top: top + 'px',
    left: '8px',
    borderRadius: menuButtonInfo.height / 2 + 'px',
  }
})

const leftMenu = computed(() => {
  return Array.isArray(props.leftMenu) ? props.leftMenu : [props.leftMenu]
})

const onLeftMenuClick = (index: number) => {
  emit('menuClick', index)
}
</script>

<style lang="scss">
@import './nav-bar.scss';
</style>
