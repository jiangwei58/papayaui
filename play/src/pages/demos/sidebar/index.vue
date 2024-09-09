<template>
  <view class="grid grid-cols-2">
    <DocDemoBlock title="基础用法" card>
      <Demo1 />
    </DocDemoBlock>
    <DocDemoBlock title="徽标提示" card>
      <Demo2 />
    </DocDemoBlock>
  </view>
  <view class="grid grid-cols-2">
    <DocDemoBlock title="禁用选项" card>
      <Demo3 />
    </DocDemoBlock>
    <DocDemoBlock title="切换事件" card>
      <Demo4 />
    </DocDemoBlock>
  </view>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
</script>

<style lang="scss" scoped></style>
