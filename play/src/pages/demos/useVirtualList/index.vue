<template>
  <scroll-view class="scroll-view" scroll-y :style="{ height: '100vh' }" @scroll="onScroll">
    <view :style="wrapperProps.style">
      <pa-cell v-for="item in list" :key="item.index" title="Row" :value="item.data" />
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { useRect, useVirtualList, type EventDetail } from 'papayaui'
import { getCurrentInstance, onMounted, ref } from 'vue'

const containerSize = ref({
  width: 0,
  height: 0,
})
const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(1000).keys()), {
  itemHeight: 44,
  containerSize,
  overscan: 10,
})

const instance = getCurrentInstance()

const onScroll = (e: EventDetail<{ scrollTop: number; scrollLeft: number }>) => {
  containerProps.onScroll(e)
}

onMounted(() => {
  if (instance) {
    useRect(instance, '.scroll-view').then((node) => {
      if (node) {
        containerSize.value = {
          width: node.width,
          height: node.height,
        }
      }
    })
  }
})
</script>

<style lang="scss" scoped></style>
