<template>
  <pa-popover :actions="actions">
    <template #reference>
      <pa-button>浅色风格</pa-button>
    </template>
  </pa-popover>

  <pa-popover theme="dark" :actions="actions">
    <template #reference>
      <pa-button class="ml-30">深色风格</pa-button>
    </template>
  </pa-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const actions = ref([{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }])
</script>
