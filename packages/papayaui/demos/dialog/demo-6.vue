<template>
  <pa-cell title="自定义内容" is-link @click="onOpen()" />

  <pa-dialog v-model:show="visible" title="标题">
    <view class="flex flex-col items-center justify-center pt-20 pb-50">
      <view class="text-28 color-black-2">这是自定义内容</view>
      <image src="../../images/demo.jpeg" style="width: 80px; height: 80px" />
    </view>
  </pa-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
