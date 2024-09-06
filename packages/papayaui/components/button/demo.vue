<template>
  <view class="demo-button">
    <DocDemoBlock title="基础用法" card>
      <Demo1 />
    </DocDemoBlock>

    <DocDemoBlock title="镂空按钮" card>
      <Demo2 />
    </DocDemoBlock>

    <DocDemoBlock title="禁用状态" card>
      <Demo3 />
    </DocDemoBlock>

    <DocDemoBlock title="尺寸" card>
      <Demo4 />
    </DocDemoBlock>

    <DocDemoBlock title="自定义大小" card>
      <Demo5 />
    </DocDemoBlock>

    <DocDemoBlock title="圆角" card>
      <Demo6 />
    </DocDemoBlock>

    <DocDemoBlock title="加载状态" card>
      <Demo7 />
    </DocDemoBlock>

    <DocDemoBlock title="图标" card>
      <Demo8 />
    </DocDemoBlock>

    <DocDemoBlock title="块级元素" card>
      <Demo9 />
    </DocDemoBlock>

    <DocDemoBlock title="点击加载（等待promise）" card>
      <Demo10 />
    </DocDemoBlock>
  </view>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/button/demo-1.vue'
import Demo2 from '../../demos/button/demo-2.vue'
import Demo3 from '../../demos/button/demo-3.vue'
import Demo4 from '../../demos/button/demo-4.vue'
import Demo5 from '../../demos/button/demo-5.vue'
import Demo6 from '../../demos/button/demo-6.vue'
import Demo7 from '../../demos/button/demo-7.vue'
import Demo8 from '../../demos/button/demo-8.vue'
import Demo9 from '../../demos/button/demo-9.vue'
import Demo10 from '../../demos/button/demo-10.vue'
</script>

<style lang="scss">
.demo-button {
  --pa-button-margin: 0 16px 16px 0;
}
</style>
