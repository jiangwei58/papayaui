<template>
  <view style="display: flex; flex-direction: column; gap: 16px">
    <!-- 自定义颜色 -->
    <pa-segmented v-model="value1" :options="options1" class="custom-color" />

    <!-- 自定义圆角 -->
    <pa-segmented v-model="value2" :options="options2" class="custom-radius" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('vue')
const options1 = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

const value2 = ref('star')
const options2 = [
  { label: '⭐ 收藏', value: 'star' },
  { label: '👍 点赞', value: 'like' },
  { label: '💬 评论', value: 'comment' },
]
</script>

<style lang="scss" scoped>
// 自定义颜色
.custom-color {
  --pa-segmented-bg-color: #e8f4ff;
  --pa-segmented-indicator-bg: #0958d9;
  --pa-segmented-item-color: #1677ff;
  --pa-segmented-item-active-color: #fff;
}

// 自定义圆角
.custom-radius {
  --pa-segmented-border-radius: 20px;
  --pa-segmented-bg-color: #fff7e6;
  --pa-segmented-indicator-bg: #fa8c16;
  --pa-segmented-item-color: #d46b08;
  --pa-segmented-item-active-color: #fff;
}
</style>
