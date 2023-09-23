<template>
  <pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false">
    <pa-tabbar-item icon="home" text="首页" name="home"></pa-tabbar-item>
    <pa-tabbar-item icon="message" text="消息" name="message"></pa-tabbar-item>
    <pa-tabbar-item icon="cart" text="订单" name="cart"></pa-tabbar-item>
    <pa-tabbar-item icon="setting" text="设置" name="setting"></pa-tabbar-item>
  </pa-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
