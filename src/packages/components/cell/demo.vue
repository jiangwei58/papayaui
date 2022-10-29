<template>
  <DocDemoBlock title="基础用法">
    <wei-cell title="单元格" value="内容" />
  </DocDemoBlock>

  <DocDemoBlock title="卡片风格">
    <wei-cell-group inset>
      <wei-cell title="单元格" value="内容" />
      <wei-cell title="单元格" value="内容" />
    </wei-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="展示箭头">
    <wei-cell title="单元格" value="内容" is-link />
  </DocDemoBlock>

  <DocDemoBlock title="图标">
    <wei-cell title="单元格" value="内容" icon="search" />
  </DocDemoBlock>

  <DocDemoBlock title="插槽">
    <wei-cell value="内容">
      <template #title>
        <text>标题</text>
        <text style="color: red">插槽</text>
      </template>
    </wei-cell>
    <wei-cell title="单元格">
      <text>内容</text>
      <text style="color: red">插槽</text>
    </wei-cell>
  </DocDemoBlock>

  <DocDemoBlock title="居中">
    <wei-cell
      title="单元格"
      value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
      center
    />
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
