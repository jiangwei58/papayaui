<template>
  <view
    :class="computedClass('nav-bar')"
    :style="{ backgroundColor: bgColor, paddingTop: statusBarHeight }"
  >
    <view :class="computedClass('nav-bar-content')" :style="{ height: contentHeight }">
      <text
        v-if="!$slots.default"
        class="block width-full text-center"
        :style="{ lineHeight: contentHeight, fontSize: '16px', fontWeight: 'bold' }"
      >
        {{ title }}
      </text>
      <slot v-else></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults, CSSProperties } from 'vue'
import { computedClass } from '../../utils/style'

export interface NavBarProps {
  /** 标题 */
  title?: string
  /** 背景色 */
  bgColor?: string
  /** 是否开启顶部安全区适配 */
  safeAreaInsetTop: boolean
}

const systemInfo = uni.getSystemInfoSync()

const props = withDefaults(defineProps<NavBarProps>(), {
  title: '标题',
  bgColor: '#fff',
  safeAreaInsetTop: false,
})

const statusBarHeight = computed<CSSProperties['padding-top']>(() => {
  return props.safeAreaInsetTop ? systemInfo.statusBarHeight + 'px' : 0
})
const contentHeight = computed(() => {
  const height = systemInfo.platform === 'ios' ? 44 : 48
  return height + 'px'
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-nav-bar {
  position: relative;
  &-content {
    display: block;
  }
}
</style>
