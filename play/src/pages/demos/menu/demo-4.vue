<template>
  <pa-menu direction="up">
    <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
    <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
  </pa-menu>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  option2: [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
  ],
  value1: 0,
  value2: 'a',
})
</script>
