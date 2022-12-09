<template>
  <DocDemoBlock title="基础用法">
    <pa-field title="输入框" />
    <pa-field title="文本域" type="textarea" />
  </DocDemoBlock>
  <DocDemoBlock title="仅显示输入框">
    <pa-field only-input />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
