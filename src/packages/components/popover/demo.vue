<template>
  <DocDemoBlock title="基础用法" card>
    <pa-popover class="inline-flex">
      <pa-button>基础用法</pa-button>
      <template #popover-content>
        <view class="p-20">
          <text class="text-32">标题</text>
          <text class="text-28 block">这是一段内容,这是一段内容,这是一段内容,这是一段内容。</text>
        </view>
      </template>
    </pa-popover>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
