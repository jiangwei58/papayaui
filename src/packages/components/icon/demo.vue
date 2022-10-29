<template>
  <DocDemoBlock title="基础用法" card>
    <view class="grid grid-cols-6 gap-y-30">
      <view
        v-for="(name, index) in icons"
        :key="index"
        class="flex flex-col items-center justify-center"
      >
        <wei-icon :name="name" size="50" />
        <text>{{ name }}</text>
      </view>
    </view>
  </DocDemoBlock>

  <DocDemoBlock title="颜色大小" card>
    <wei-icon name="success" size="100" />
    <wei-icon name="success" size="50" color="green" />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const icons = ref<string[]>(['up', 'down', 'left', 'down', 'search', 'close', 'success'])
</script>

<style lang="scss" scoped></style>
