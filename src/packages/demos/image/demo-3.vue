<template>
  <view class="grid grid-cols-3 gap-30">
    <pa-image :src="src" width="200" height="200" round />
    <pa-image :src="src" width="200" height="200" round="10" />
  </view>
</template>

<script lang="ts" setup>
import src from '../../images/demo.jpeg' // 推荐使用图片链接
</script>
