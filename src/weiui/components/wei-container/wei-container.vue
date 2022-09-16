<template>
  <view class="container" :style="{ backgroundColor: bgColor }">
    <WeiSticky z-index="99">
      <view class="container-header" :style="{ backgroundColor: headerBgColor }">
        <slot name="header"></slot>
      </view>
    </WeiSticky>

    <view
      class="relative"
      :style="{
        height: partialContent ? `calc(100vh - ${headerHeight}px - ${bottomHeight}px)` : 'auto',
      }"
    >
      <slot></slot>

      <WeiWatermark
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
      class="container-bottom-fixed"
      :style="{ visibility: $slots.bottom && showFixedBottom ? 'visible' : 'hidden' }"
    >
      <slot name="bottom"></slot>
      <WeiSafeBottom v-if="safeBottom" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, nextTick, onMounted, ref, toRefs } from 'vue'
import useRect from '../../hooks/useRect'
import WeiSafeBottom from '../wei-safe-bottom/wei-safe-bottom.vue'
import WeiSticky from '../wei-sticky/wei-sticky.vue'
import WeiWatermark from '../wei-watermark/wei-watermark.vue'

interface OwnProps {
  safeBottom?: boolean // 是否填充底部安全区
  headerBgColor?: string // 头部背景色
  bgColor?: string // 背景色
  showFixedBottom?: boolean // 是否显示固定底部
  showWatermark?: boolean // 是否显示水印
  watermarkContents?: string[] // 水印内容
  partialContent?: boolean // 是否局部内容布局，默认内容在页面，使用页面滚动；如需内容区只占中间部分设为true
}

const props = withDefaults(defineProps<OwnProps>(), {
  safeBottom: true,
  headerBgColor: 'transparent',
  bgColor: 'transparent',
  showFixedBottom: true,
  showWatermark: false,
  watermarkContents: () => [],
})

const { showWatermark } = toRefs(props)

const headerHeight = ref<number>(0)
const bottomHeight = ref<number>(34)

const internalInstance = getCurrentInstance()

const updateHeight = () => {
  nextTick(() => {
    if (!internalInstance) return
    useRect(internalInstance, '.container-header').then((res) => {
      headerHeight.value = res.height || 0
    })
    useRect(internalInstance, '.container-bottom-fixed').then((res) => {
      bottomHeight.value = res.height || 0
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
.container {
  width: 100%;
  min-height: 100vh;
}
.container-header {
  width: 100%;
}
.container-bottom-fixed {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 98;
  background-color: #fff;
}
</style>
