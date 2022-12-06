<template>
  <DocDemoBlock title="基础用法" card>
    <view class="grid grid-cols-4">
      <wei-badge content="5">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="10">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="new">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge dot>
        <view class="demo-block"></view>
      </wei-badge>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="最大值" card>
    <view class="grid grid-cols-4">
      <wei-badge content="999" :max="9">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="999" :max="20">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="999" :max="99">
        <view class="demo-block"></view>
      </wei-badge>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色" card>
    <view class="grid grid-cols-4">
      <wei-badge content="5" color="#1989fa">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="10" color="#1989fa">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="new" color="#1989fa">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="new" color="#1989fa" dot>
        <view class="demo-block"></view>
      </wei-badge>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="自定义内容" card>
    <view class="grid grid-cols-4">
      <wei-badge>
        <view class="demo-block"></view>
        <template #content>
          <wei-icon name="success" color="#fff" />
        </template>
      </wei-badge>
      <wei-badge>
        <view class="demo-block"></view>
        <template #content>
          <wei-icon name="star" color="#fff" />
        </template>
      </wei-badge>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="自定义位置" card>
    <view class="grid grid-cols-4">
      <wei-badge content="99" :offset="[-10, -10]">
        <view class="demo-block"></view>
      </wei-badge>
      <wei-badge content="99" :offset="[80, 0]">
        <view class="demo-block"></view>
      </wei-badge>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="独立展示" card>
    <view class="grid grid-cols-4">
      <wei-badge content="9" />
      <wei-badge content="99" />
    </view>
  </DocDemoBlock>
  <wei-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped>
.demo-block {
  width: 40px;
  height: 40px;
  background-color: rgb(238, 238, 238);
  border-radius: 3px;
}
</style>
