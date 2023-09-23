<template>
  <pa-tabs v-model="tabActive" scrollable>
    <pa-tab-pane title="标签1">内容1</pa-tab-pane>
    <pa-tab-pane title="标签2">内容2</pa-tab-pane>
    <pa-tab-pane title="标签3">内容3</pa-tab-pane>
    <pa-tab-pane title="标签4">内容4</pa-tab-pane>
    <pa-tab-pane title="标签5">内容5</pa-tab-pane>
    <pa-tab-pane title="标签6">内容6</pa-tab-pane>
    <pa-tab-pane title="标签7">内容7</pa-tab-pane>
    <pa-tab-pane title="标签8">内容8</pa-tab-pane>
  </pa-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabActive = ref<number>(0)
</script>
