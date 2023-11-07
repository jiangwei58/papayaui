<template>
  <view>
    <pa-circle :model-value="progress" stroke-width="8" text="设置宽度" />
    <pa-circle :model-value="progress" color="#ff2b2b" text="设置颜色" />
    <pa-circle :model-value="progress" :clockwise="false" text="逆时针" />
    <pa-circle :model-value="progress" :size="150" text="设置大小" />
  </view>
  <view class="mt-15">
    <pa-button type="primary" @click="add">增加</pa-button>
    <pa-button type="danger" class="ml-15" @click="subtract">减少</pa-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const STEP = 10
const progress = ref(80)

const add = () => {
  if (progress.value >= 100) return
  progress.value += STEP
}

const subtract = () => {
  if (progress.value <= 0) return
  progress.value -= STEP
}
</script>

<style lang="scss" scoped>
:deep(.pa-circle) {
  margin-right: 15px;
}
</style>
