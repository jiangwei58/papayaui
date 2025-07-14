<template>
  <pa-popover :actions="actions1">
    <template #reference>
      <pa-button>展示图标</pa-button>
    </template>
  </pa-popover>

  <pa-popover theme="dark" :actions="actions2">
    <template #reference>
      <pa-button class="ml-30">禁用选项</pa-button>
    </template>
  </pa-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const actions1 = ref([
  { text: '选项一', icon: 'plus' },
  { text: '选项二', icon: 'scan' },
  { text: '选项三', icon: 'refresh' },
])

const actions2 = ref([{ text: '选项一', disabled: true }, { text: '选项二' }, { text: '选项三' }])
</script>
