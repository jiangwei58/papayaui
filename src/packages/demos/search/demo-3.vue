<template>
  <pa-search v-model="text">
    <template #before>
      <text class="pr-12">前部</text>
    </template>
    <template #after>
      <text class="pl-12">搜索</text>
    </template>
  </pa-search>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('')
</script>
