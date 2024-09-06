<template>
  <pa-checkbox v-model="checkValue">复选框</pa-checkbox>
  <view class="text-28 text-black-3 mt-30">
    <text>当前选中值</text>
    <text class="ml-10">{{ JSON.stringify(checkValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkValue = ref(true)
</script>
