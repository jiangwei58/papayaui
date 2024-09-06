<template>
  <pa-uploader v-model:file-list="fileList" preview-size="100px">
    <template #file="{ file, index, style }">
      <view class="file-item" :style="style">
        <image :src="file.url" :style="style" />
        <view class="mark">图片{{ index + 1 }}</view>
      </view>
    </template>
  </pa-uploader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 仅做本地示例，使用时请用网络图片
import img1 from '../../images/demo2.jpeg'
import img2 from '../../images/demo3.jpg'

let src1 = ''
let src2 = ''
// #ifdef MP
const fileManager = uni.getFileSystemManager()
src1 = 'data:image/jpeg;base64,' + fileManager.readFileSync(img1, 'base64')
src2 = 'data:image/jpeg;base64,' + fileManager.readFileSync(img2, 'base64')
// #endif
// #ifdef H5
src1 = img1
src2 = img2
// #endif

const fileList = ref([
  {
    url: src1,
  },
  {
    url: src2,
  },
])
</script>

<style lang="scss" scoped>
.file-item {
  position: relative;
}
.mark {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
