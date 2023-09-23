<template>
  <pa-button @click="onVisibleChange()">嵌入内容</pa-button>

  <pa-overlay :show="visible" @click="onVisibleChange(false)">
    <view class="flex items-center justify-center height-full">
      <view style="width: 200px; height: 200px; background-color: #fff"></view>
    </view>
  </pa-overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const onVisibleChange = (show = true) => {
  visible.value = show
}
</script>
