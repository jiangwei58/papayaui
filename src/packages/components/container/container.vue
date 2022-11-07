<template>
  <view :class="computedClass('container')" :style="{ backgroundColor: bgColor }">
    <sticky z-index="99">
      <view :class="computedClass('container-header')" :style="{ backgroundColor: headerBgColor }">
        <slot name="header"></slot>
      </view>
    </sticky>

    <view
      class="relative"
      :style="{
        height: partialContent ? `calc(100vh - ${headerHeight}px - ${bottomHeight}px)` : 'auto',
      }"
    >
      <slot></slot>

      <watermark
        v-if="showWatermark"
        :width="160"
        :height="220"
        :opacity="0.1"
        :contents="watermarkContents"
        :zindex="96"
      />
    </view>

    <view :style="{ height: bottomHeight + 'px' }"></view>
    <view
      :class="computedClass('container-bottom-fixed')"
      :style="{ visibility: $slots.bottom && showFixedBottom ? 'visible' : 'hidden' }"
    >
      <slot name="bottom"></slot>
      <SafeBottom v-if="safeBottom" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import useRect from '../../hooks/useRect'
import { computedClass } from '../../utils/style'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import sticky from '../sticky/sticky.vue'
import watermark from '../watermark/watermark.vue'

export interface ContainerProps {
  /** 是否填充底部安全区 */
  safeBottom?: boolean
  /** 头部背景色 */
  headerBgColor?: string
  /** 背景色 */
  bgColor?: string
  /** 是否显示固定底部 */
  showFixedBottom?: boolean
  /** 是否显示水印 */
  showWatermark?: boolean
  /** 水印内容 */
  watermarkContents?: string[]
  /** 是否局部内容布局，默认内容在页面，使用页面滚动；如需内容区只占中间部分设为true */
  partialContent?: boolean
}

withDefaults(defineProps<ContainerProps>(), {
  safeBottom: true,
  headerBgColor: 'transparent',
  bgColor: 'transparent',
  showFixedBottom: true,
  showWatermark: false,
  watermarkContents: () => [],
})

const headerHeight = ref<number>(0)
const bottomHeight = ref<number>(34)

const internalInstance = getCurrentInstance()

const updateHeight = () => {
  nextTick(() => {
    if (!internalInstance) return
    useRect(internalInstance, `.${computedClass('container-header')}`).then((res) => {
      if (res) {
        headerHeight.value = res.height || 0
      }
    })
    useRect(internalInstance, `.${computedClass('container-bottom-fixed')}`).then((res) => {
      if (res) {
        bottomHeight.value = res.height || 0
      }
    })
  })
}

onMounted(() => {
  updateHeight()
})

defineExpose({
  updateHeight,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-container {
  width: 100%;
  min-height: 100vh;
}
.#{$prefix}-container-header {
  width: 100%;
}
.#{$prefix}-container-bottom-fixed {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 98;
  background-color: #fff;
}
</style>
