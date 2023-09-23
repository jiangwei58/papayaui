<template>
  <pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false">
    <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
    <pa-tabbar-item icon="message" text="消息" dot></pa-tabbar-item>
    <pa-tabbar-item icon="cart" text="订单" info="5"></pa-tabbar-item>
    <pa-tabbar-item icon="setting" text="设置" info="99"></pa-tabbar-item>
  </pa-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
