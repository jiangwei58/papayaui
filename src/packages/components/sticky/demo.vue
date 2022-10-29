<template>
  <DocDemoBlock title="基础用法" />
  <wei-sticky>
    <view class="flex justify-start">
      <wei-button width="200">基础用法</wei-button>
    </view>
  </wei-sticky>
  <DocDemoBlock title="吸顶距离" />
  <wei-sticky offset-top="30">
    <view class="flex justify-center">
      <wei-button width="200">吸顶距离</wei-button>
    </view>
  </wei-sticky>
  <view style="height: 200vh"></view>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
