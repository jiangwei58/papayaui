<template>
  <DocDemoBlock title="基础用法" />
  <pa-nav-bar title="页面标题" />

  <DocDemoBlock title="自定义" />
  <pa-nav-bar>
    <view class="flex items-center justify-center height-full">
      <pa-icon name="search" />
      <text>页面标题</text>
      <pa-button height="54">按钮</pa-button>
    </view>
  </pa-nav-bar>
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
