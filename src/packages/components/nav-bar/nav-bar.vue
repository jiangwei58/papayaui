<template>
  <view
    :class="[
      ns.b(),
      ns.m(theme),
      ns.is('single', leftMenu.length === 1),
      ns.is('development', systemInfo.platform === 'devtools'),
    ]"
    :style="{ backgroundColor: bgColor, paddingTop: getUnitValue(statusBarHeight, 'px') }"
  >
    <view v-if="leftMenu.length" :class="ns.e('capsule-menu')" :style="capsuleMenuStyle">
      <Icon :name="leftMenu[0]" @click="onLeftMenuClick(0)" />
      <template v-if="leftMenu.length > 1">
        <view :class="ns.e('capsule-menu-line')"></view>
        <Icon :name="leftMenu[1]" @click="onLeftMenuClick(1)" />
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
import { computed, CSSProperties, defineProps } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import { navBarEmits, navBarProps } from './props'

const systemInfo = uni.getSystemInfoSync()
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

const ns = useNamespace('nav-bar')

const props = defineProps(navBarProps)
const emit = defineEmits(navBarEmits)

const statusBarHeight = computed(() => {
  return props.safeAreaInsetTop ? (systemInfo.statusBarHeight as number) : 0
})

const contentHeight = computed(() => {
  return systemInfo.platform === 'ios' ? 44 : 48
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

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-nav-bar {
  position: relative;

  &__capsule-menu {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @include _setVar(icon-size, 22px);

    &-line {
      width: 1rpx;
      height: 18px;
    }
  }

  &-content {
    display: block;
  }

  &__title {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  &--white &__title {
    color: #fff;
  }

  &--white &__capsule-menu {
    color: #fff;
    border: 1rpx solid rgba(255, 255, 255, 0.25);
    background-color: rgba(0, 0, 0, 0.15);

    &-line {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  &--black &__capsule-menu {
    border: 1rpx solid rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.6);

    &-line {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &--single &__capsule-menu {
    justify-content: flex-start;
    padding-left: 6px;
    @include _setVar(icon-size, 24px);
    background-color: transparent;
    border-color: transparent;
  }

  &--development &__title {
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
