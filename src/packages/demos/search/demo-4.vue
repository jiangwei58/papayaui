<template>
  <pa-search v-model="text">
    <template #prefix>
      <text class="p-12">地址</text>
    </template>
    <template #suffix>
      <text class="p-12">后缀</text>
    </template>
  </pa-search>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('')
</script>
