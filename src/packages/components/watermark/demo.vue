<template>
  <pa-watermark :contents="['papayaui-watermark', '2022-10-29 23:59']" />

  <view class="p-30" style="height: 100vh">{{ text }}</view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const text = ref<string>('')

onMounted(() => {
  text.value = new Array(20)
    .fill(0)
    .map(() => '页面内容')
    .join('')
})
</script>

<style lang="scss" scoped></style>
