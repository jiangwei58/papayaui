<template>
  <DocDemoBlock title="基础用法">
    <wei-section title="标题栏" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义右侧">
    <wei-section title="标题栏">
      <text style="color: red">右侧内容</text>
    </wei-section>
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题">
    <wei-section title="标题栏">
      <template #title>
        <text style="color: red">自定义标题</text>
      </template>
    </wei-section>
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
