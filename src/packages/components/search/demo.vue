<template>
  <DocDemoBlock title="基础用法">
    <wei-search v-model="text" />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const text = ref<string>('')
</script>

<style lang="scss" scoped></style>
