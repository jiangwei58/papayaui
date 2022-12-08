<template>
  <view class="demo-button">
    <DocDemoBlock title="基础用法" card>
      <pa-button type="primary">主要按钮</pa-button>
      <pa-button type="warning">警告按钮</pa-button>
      <pa-button type="danger">危险按钮</pa-button>
      <pa-button type="default">默认按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="禁用状态" card>
      <pa-button type="primary" disabled>禁用状态</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="自定义大小" card>
      <pa-button type="primary" width="300" height="80">按钮</pa-button>
      <pa-button type="primary" width="200" height="60">按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="圆角" card>
      <pa-button type="primary" round>圆角按钮</pa-button>
      <pa-button type="primary" round="20">圆角按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="镂空按钮" card>
      <pa-button type="primary" plain>镂空按钮</pa-button>
      <pa-button type="warning" plain>镂空按钮</pa-button>
      <pa-button type="danger" plain>镂空按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="加载状态" card>
      <pa-button type="primary" loading>加载状态</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="图标" card>
      <pa-button type="primary" icon="edit">图标按钮</pa-button>
      <pa-button type="primary" icon="edit"></pa-button>
      <pa-button type="primary" icon="edit" width="42px" height="42px" round></pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="块级元素" card>
      <pa-button type="primary" block>块级元素</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="点击加载（等待promise）" card>
      <pa-button type="primary" :sync-click="onClick">点击加载</pa-button>
    </DocDemoBlock>
  </view>
  <pa-safe-bottom />
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
