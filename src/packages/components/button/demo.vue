<template>
  <view class="demo-button">
    <DocDemoBlock title="基础用法" card>
      <wei-button type="primary">主要按钮</wei-button>
      <wei-button type="warning">警告按钮</wei-button>
      <wei-button type="danger">危险按钮</wei-button>
      <wei-button type="default">默认按钮</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="禁用状态" card>
      <wei-button type="primary" disabled>禁用状态</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="自定义大小" card>
      <wei-button type="primary" width="300" height="80">按钮</wei-button>
      <wei-button type="primary" width="200" height="60">按钮</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="圆角" card>
      <wei-button type="primary" round>按钮</wei-button>
      <wei-button type="primary" round="20">按钮</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="镂空按钮" card>
      <wei-button type="primary" plain>按钮</wei-button>
      <wei-button type="warning" plain>按钮</wei-button>
      <wei-button type="danger" plain>按钮</wei-button>
    </DocDemoBlock>
  </view>
  <wei-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss">
.demo-button {
  button {
    margin-bottom: 10px;
  }
}
</style>
