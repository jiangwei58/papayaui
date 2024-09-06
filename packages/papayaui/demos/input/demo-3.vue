<template>
  <pa-cell title="文本">
    <pa-input v-model="value" placeholder="请输入" clearable />
  </pa-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
