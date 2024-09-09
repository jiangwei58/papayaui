<template>
  <pa-watermark :contents="contents" />

  <view class="p-30" style="height: 100vh">{{ text }}</view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const contents = ['papayaui-watermark', new Date().toLocaleString()]
const text = ref<string>('')

onMounted(() => {
  text.value = new Array(20)
    .fill(0)
    .map(() => '页面内容')
    .join('')
})
</script>

<style lang="scss" scoped></style>
