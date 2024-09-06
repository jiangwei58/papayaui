<template>
  <pa-tabs v-model="tabActive">
    <pa-tab-pane title="标签1">内容1</pa-tab-pane>
    <pa-tab-pane title="标签2">内容2</pa-tab-pane>
    <pa-tab-pane title="标签3">内容3</pa-tab-pane>
    <pa-tab-pane title="标签4">内容4</pa-tab-pane>
  </pa-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabActive = ref<number>(0)
</script>
