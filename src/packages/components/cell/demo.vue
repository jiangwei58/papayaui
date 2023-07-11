<template>
  <DocDemoBlock title="基础用法">
    <pa-cell title="单元格" value="内容" />
  </DocDemoBlock>

  <DocDemoBlock title="卡片风格">
    <pa-cell-group inset>
      <pa-cell title="单元格" value="内容" />
      <pa-cell title="单元格" value="内容" />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="展示箭头">
    <pa-cell title="单元格" value="内容" is-link />
  </DocDemoBlock>

  <DocDemoBlock title="图标">
    <pa-cell title="单元格" value="内容" icon="search" />
  </DocDemoBlock>

  <DocDemoBlock title="插槽">
    <pa-cell value="内容">
      <template #title>
        <text>标题</text>
        <text style="color: red">插槽</text>
      </template>
    </pa-cell>
    <pa-cell title="单元格">
      <text>内容</text>
      <text style="color: red">插槽</text>
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="居中">
    <pa-cell
      title="单元格"
      value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
      center
    />
  </DocDemoBlock>

  <pa-safe-bottom />
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
