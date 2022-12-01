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
      <wei-button type="primary" round>圆角按钮</wei-button>
      <wei-button type="primary" round="20">圆角按钮</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="镂空按钮" card>
      <wei-button type="primary" plain>镂空按钮</wei-button>
      <wei-button type="warning" plain>镂空按钮</wei-button>
      <wei-button type="danger" plain>镂空按钮</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="加载状态" card>
      <wei-button type="primary" loading>加载状态</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="图标" card>
      <wei-button type="primary" icon="edit">图标按钮</wei-button>
      <wei-button type="primary" icon="edit"></wei-button>
      <wei-button type="primary" icon="edit" width="42px" height="42px" round></wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="块级元素" card>
      <wei-button type="primary" block>块级元素</wei-button>
    </DocDemoBlock>

    <DocDemoBlock title="点击加载（等待promise）" card>
      <wei-button type="primary" :sync-click="onClick">点击加载</wei-button>
    </DocDemoBlock>
  </view>
  <wei-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const onClick = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>

<style lang="scss">
.demo-button {
  button {
    margin: 0 16px 16px 0;
  }
}
</style>
