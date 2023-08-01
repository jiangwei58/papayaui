<template>
  <DocDemoBlock title="基础用法">
    <pa-section title="标题栏" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义右侧">
    <pa-section title="标题栏">
      <text style="color: red">右侧内容</text>
    </pa-section>
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题">
    <pa-section title="标题栏">
      <template #title>
        <text style="color: red">自定义标题</text>
      </template>
    </pa-section>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
