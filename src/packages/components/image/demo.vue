<template>
  <DocDemoBlock title="基础用法" card>
    <pa-image :src="src" width="200" height="200" />
  </DocDemoBlock>
  <DocDemoBlock title="填充模式" card>
    <view class="grid grid-cols-3 gap-30">
      <view v-for="mode in modeList" :key="mode">
        <pa-image :src="src" width="100%" height="27vw" :mode="mode" />
        <text class="block text-28 text-black-2 text-center">{{ mode }}</text>
      </view>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="圆角" card>
    <view class="grid grid-cols-3 gap-30">
      <pa-image :src="src" width="200" height="200" round />
      <pa-image :src="src" width="200" height="200" round="10" />
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="加载中" card>
    <view class="grid grid-cols-3 gap-30">
      <view>
        <pa-image width="100%" height="27vw" />
        <text class="block text-28 text-black-2 text-center">默认提示</text>
      </view>
      <view>
        <pa-image width="100%" height="27vw">
          <template #loading>
            <pa-loading-icon />
          </template>
        </pa-image>
        <text class="block text-28 text-black-2 text-center">自定义提示</text>
      </view>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="加载失败" card>
    <view class="grid grid-cols-3 gap-30">
      <view>
        <pa-image src="error.png" width="100%" height="27vw" />
        <text class="block text-28 text-black-2 text-center">默认提示</text>
      </view>
      <view>
        <pa-image src="error.png" width="100%" height="27vw">
          <template #error>
            <text>error</text>
          </template>
        </pa-image>
        <text class="block text-28 text-black-2 text-center">自定义提示</text>
      </view>
    </view>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const src = 'https://img01.yzcdn.cn/vant/cat.jpeg'

const modeList = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'center',
  'widthFix',
  'top',
  'heightFix',
]
</script>

<style lang="scss" scoped></style>
