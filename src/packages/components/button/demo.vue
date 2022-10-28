<template>
  <view class="demo-button">
    <DocDemoBlock title="基础用法" card>
      <!-- 声明为ButtonComponent是为了防止和原生button冲突，项目中使用时有带前缀 -->
      <ButtonComponent type="primary">主要按钮</ButtonComponent>
      <ButtonComponent type="warning">警告按钮</ButtonComponent>
      <ButtonComponent type="danger">危险按钮</ButtonComponent>
      <ButtonComponent type="default">默认按钮</ButtonComponent>
    </DocDemoBlock>

    <DocDemoBlock title="禁用状态" card>
      <ButtonComponent type="primary" disabled>禁用状态</ButtonComponent>
    </DocDemoBlock>

    <DocDemoBlock title="自定义大小" card>
      <ButtonComponent type="primary" width="300" height="80">按钮</ButtonComponent>
      <ButtonComponent type="primary" width="200" height="60">按钮</ButtonComponent>
    </DocDemoBlock>

    <DocDemoBlock title="圆角" card>
      <ButtonComponent type="primary" round>按钮</ButtonComponent>
      <ButtonComponent type="primary" round="20">按钮</ButtonComponent>
    </DocDemoBlock>

    <DocDemoBlock title="镂空按钮" card>
      <ButtonComponent type="primary" plain>按钮</ButtonComponent>
      <ButtonComponent type="warning" plain>按钮</ButtonComponent>
      <ButtonComponent type="danger" plain>按钮</ButtonComponent>
    </DocDemoBlock>
  </view>
  <SafeBottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import ButtonComponent from '../button/button.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
</script>

<style lang="scss">
.demo-button {
  button {
    margin-bottom: 10px;
  }
}
</style>
