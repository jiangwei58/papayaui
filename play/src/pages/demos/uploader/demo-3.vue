<template>
  <pa-uploader v-model:file-list="fileList" :max-count="3" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 仅做本地示例，使用时请用网络图片
import img1 from '../../../images/demo2.jpeg'

let src1 = ''
// #ifdef MP
const fileManager = uni.getFileSystemManager()
src1 = 'data:image/jpeg;base64,' + fileManager.readFileSync(img1, 'base64')
// #endif
// #ifdef H5
src1 = img1
// #endif

const fileList = ref([
  {
    url: src1,
  },
])
</script>
