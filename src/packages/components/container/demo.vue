<template>
  <pa-container ref="containerRef" :use-footer-slot="showBottom">
    <template #header>
      <pa-search placeholder="这是固定头部，通常放置搜索栏、下拉菜单等" />
    </template>

    <view class="px-25">
      <view
        v-for="index in 10"
        :key="index"
        class="p-15 text-28 text-black-2 border mt-20"
        style="height: 100px"
      >
        放置页面内容，已自动处理固定头部和底部的填充
      </view>
    </view>

    <template #bottom>
      <view class="px-26 py-12">
        <pa-button type="primary" block @click="updateHeight">
          这是固定底部，通常放置操作按钮
        </pa-button>
      </view>
    </template>
  </pa-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import paContainer from './container.vue'

const containerRef = ref<InstanceType<typeof paContainer>>()
const showBottom = ref<boolean>(true)

const updateHeight = () => {
  showBottom.value = !showBottom.value
  // 如果固定头部或底部有动态内容会影响高度的，可以使用updateHeight方法重新刷新高度，防止多余填充留白
  // containerRef.value?.updateHeight()
}
</script>

<style lang="scss" scoped></style>
