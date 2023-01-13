<template>
  <DocDemoBlock title="基础用法">
    <pa-empty description="描述文字" />
  </DocDemoBlock>
  <DocDemoBlock title="图片类型">
    <pa-empty image="error" description="描述文字" />
    <pa-empty image="search" description="描述文字" />
  </DocDemoBlock>
  <DocDemoBlock title="底部内容">
    <pa-empty description="描述文字">
      <pa-button class="mt-40" width="160px" round>按钮</pa-button>
    </pa-empty>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
