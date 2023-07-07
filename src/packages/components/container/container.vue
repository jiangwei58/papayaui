<template>
  <view :class="ns.b()" :style="{ backgroundColor: bgColor }">
    <sticky z-index="99">
      <view :class="ns.b('header')" :style="{ backgroundColor: headerBgColor }">
        <slot name="header"></slot>
      </view>
    </sticky>

    <view
      :class="ns.b('body')"
      :style="{
        height: partialContent ? `calc(100vh - ${headerHeight}px - ${bottomHeight}px)` : 'auto',
      }"
    >
      <slot></slot>

      <watermark v-if="showWatermark" :contents="watermarkContents" />
    </view>

    <view :style="{ height: bottomHeight + 'px' }"></view>
    <view
      :class="ns.b('bottom-fixed')"
      :style="{ visibility: $slots.bottom && showFixedBottom ? 'visible' : 'hidden' }"
    >
      <slot name="bottom"></slot>
      <SafeBottom v-if="safeBottom" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import useRect from '../../hooks/useRect'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import sticky from '../sticky/sticky.vue'
import watermark from '../watermark/watermark.vue'
import { containerProps } from './props'

const ns = useNamespace('container')

defineProps(containerProps)

const headerHeight = ref<number>(0)
const bottomHeight = ref<number>(34)

const internalInstance = getCurrentInstance()

const updateHeight = () => {
  nextTick(() => {
    if (!internalInstance) return
    useRect(internalInstance, `.${ns.b('header')}`).then((res) => {
      if (res) {
        headerHeight.value = res.height || 0
      }
    })
    useRect(internalInstance, `.${ns.b('bottom-fixed')}`).then((res) => {
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
  &-header {
    width: 100%;
  }

  &-body {
    position: relative;
  }

  &-bottom-fixed {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 98;
    background-color: #fff;
  }
}
</style>
