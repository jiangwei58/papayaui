<template>
  <DocDemoBlock title="基础用法">
    <pa-skeleton title row="3" animate />
  </DocDemoBlock>

  <DocDemoBlock title="显示头像">
    <pa-skeleton avatar title row="3" animate />
  </DocDemoBlock>

  <DocDemoBlock title="头像样式">
    <pa-skeleton avatar title row="3" avatar-shape="square" avatar-size="90px" animate />
  </DocDemoBlock>

  <DocDemoBlock title="显示子组件">
    <pa-switch v-model="loaded" class="block ml-32 mb-32" />
    <pa-skeleton avatar title row="3" animate :loading="!loaded">
      <pa-image :src="src" width="64" height="64" round />
      <view class="ml-32">
        <view>这是标题</view>
        <text class="text-28 text-black-2">
          这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        </text>
      </view>
    </pa-skeleton>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import src from '../../images/demo.jpeg'

const loaded = ref(false)
</script>

<style lang="scss" scoped></style>
