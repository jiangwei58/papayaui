<template>
  <view class="grid grid-cols-3 gap-30">
    <view v-for="mode in modeList" :key="mode">
      <pa-image :src="src" width="100%" height="27vw" :mode="mode" />
      <text class="block text-28 text-black-2 text-center">{{ mode }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import src from '../../../images/demo.jpeg' // 推荐使用图片链接

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
