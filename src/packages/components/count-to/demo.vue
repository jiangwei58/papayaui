<template>
  <view class="text-28 text-black px-32">(点击可重复查看效果)</view>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="倒计时" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="显示小数" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义格式化值" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义控制" card>
    <Demo5 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/count-to/demo-1.vue'
import Demo2 from '../../demos/count-to/demo-2.vue'
import Demo3 from '../../demos/count-to/demo-3.vue'
import Demo4 from '../../demos/count-to/demo-4.vue'
import Demo5 from '../../demos/count-to/demo-5.vue'
</script>

<style lang="scss" scoped></style>
