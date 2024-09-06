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
import Demo1 from '../../demos/sidebar/demo-1.vue'
import Demo2 from '../../demos/sidebar/demo-2.vue'
import Demo3 from '../../demos/sidebar/demo-3.vue'
import Demo4 from '../../demos/sidebar/demo-4.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
