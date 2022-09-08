<template>
  <view class="container" :style="{ backgroundColor: bgColor }">
    <WeiSticky z-index="99">
      <view class="container-header" :style="{ backgroundColor: headerBgColor }">
        <slot name="header"></slot>
      </view>
    </WeiSticky>

    <view class="relative">
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
import useRect from '../../hooks/useRect'
import timeFormat from '../../utils/timeFormat'
import { computed, getCurrentInstance, nextTick, onMounted, ref, toRefs } from 'vue'
import WeiSafeBottom from '../wei-safe-bottom/wei-safe-bottom.vue'
import WeiSticky from '../wei-sticky/wei-sticky.vue'
import WeiWatermark from '../wei-watermark/wei-watermark.vue'

interface OwnProps {
  safeBottom?: boolean
  headerBgColor?: string
  bgColor?: string
  showFixedBottom?: boolean
  showWatermark?: boolean
}

const props = withDefaults(defineProps<OwnProps>(), {
  safeBottom: true,
  headerBgColor: 'transparent',
  bgColor: 'transparent',
  showFixedBottom: true,
  showWatermark: false,
})

const { showWatermark } = toRefs(props)

const bottomHeight = ref(34)

const internalInstance = getCurrentInstance()

const updateHeight = () => {
  nextTick(() => {
    if (!internalInstance) return
    useRect(internalInstance, '.container-bottom-fixed').then((res) => {
      bottomHeight.value = res.height || 0
    })
  })
}

onMounted(() => {
  updateHeight()
})

const watermarkContents = computed<string[]>(() => {
  const name = `姓名 2021040201`
  const time = timeFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss')
  return [name, time]
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
