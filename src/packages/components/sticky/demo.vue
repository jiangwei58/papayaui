<template>
  <DocDemoBlock title="基础用法" />
  <pa-sticky>
    <view class="flex justify-start ml-26">
      <pa-button width="200">基础用法</pa-button>
    </view>
  </pa-sticky>
  <DocDemoBlock title="吸顶距离" />
  <pa-sticky offset-top="30">
    <view class="flex justify-center">
      <pa-button width="200">吸顶距离</pa-button>
    </view>
  </pa-sticky>
  <view style="height: 200vh"></view>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
