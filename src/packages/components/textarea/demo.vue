<template>
  <DocDemoBlock title="基础用法">
    <pa-textarea v-model="text" />
  </DocDemoBlock>
  <DocDemoBlock title="显示字数统计">
    <pa-textarea v-model="text2" show-count />
  </DocDemoBlock>
  <DocDemoBlock title="自动增高">
    <pa-textarea auto-height />
  </DocDemoBlock>
  <DocDemoBlock title="只读">
    <pa-textarea model-value="textarea只读状态" readonly />
  </DocDemoBlock>
  <DocDemoBlock title="禁用">
    <pa-textarea model-value="textarea禁用状态" disabled />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const text = ref<string>('')
const text2 = ref<string>('')
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
