<template>
  <pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false" @change="onChange">
    <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
    <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
    <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
    <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
  </pa-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)

const onChange = (name: string | number) => {
  uni.showToast({
    title: `切换到第${name}个标签`,
    icon: 'none',
  })
}
</script>
