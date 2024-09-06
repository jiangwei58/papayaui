<template>
  <pa-uploader ref="uploaderRef" v-model:file-list="fileList">
    <pa-button type="primary" icon="plus" @click="onCustomUpload">自定义上传</pa-button>
    <pa-button type="primary" icon="plus" class="ml-20" @click="onUpload">复用原上传</pa-button>
  </pa-uploader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderInstance, FileItem } from '../..'

const uploaderRef = ref<UploaderInstance>()
const fileList = ref<FileItem[]>([])

const onCustomUpload = () => {
  uni.chooseImage({
    count: 10,
    success: ({ tempFilePaths }) => {
      const paths = Array.isArray(tempFilePaths) ? tempFilePaths : [tempFilePaths]
      paths.forEach((path) => {
        fileList.value.push({ url: path })
      })
    },
  })
}

const onUpload = () => {
  // 可以调用组件原有的选择文件功能，适用于想在原有基础上补充分支逻辑的情况
  uploaderRef.value?.chooseFile()
}
</script>
