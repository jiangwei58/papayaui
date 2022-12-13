<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="primary类型">
        <pa-tag>标签</pa-tag>
      </pa-cell>
      <pa-cell title="success类型">
        <pa-tag type="success">标签</pa-tag>
      </pa-cell>
      <pa-cell title="warning类型">
        <pa-tag type="warning">标签</pa-tag>
      </pa-cell>
      <pa-cell title="danger类型">
        <pa-tag type="danger">标签</pa-tag>
      </pa-cell>
    </pa-cell-group>
  </DocDemoBlock>
  <DocDemoBlock title="样式风格">
    <pa-cell-group inset>
      <pa-cell title="空心样式">
        <pa-tag plain>标签</pa-tag>
      </pa-cell>
      <pa-cell title="圆角样式">
        <pa-tag round>标签</pa-tag>
      </pa-cell>
      <pa-cell title="标记样式">
        <pa-tag mark>标签</pa-tag>
      </pa-cell>
      <pa-cell title="可关闭标签">
        <pa-tag closeable @close="onClose">标签</pa-tag>
      </pa-cell>
    </pa-cell-group>
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色">
    <pa-cell-group inset>
      <pa-cell title="背景颜色">
        <pa-tag color="rgb(114, 50, 221)">标签</pa-tag>
      </pa-cell>
      <pa-cell title="文字颜色">
        <pa-tag color="rgb(255, 225, 225)" text-color="rgb(173, 0, 0)">标签</pa-tag>
      </pa-cell>
      <pa-cell title="空心颜色">
        <pa-tag plain color="rgb(114, 50, 221)" text-color="rgb(114, 50, 221)">标签</pa-tag>
      </pa-cell>
    </pa-cell-group>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const onClose = () => {
  uni.showToast({
    title: '点击关闭',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
