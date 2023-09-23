<template>
  <pa-uploader v-model:file-list="fileList" :after-read="onAfterRead" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileItem } from '../..'

const fileList = ref<FileItem[]>([])

const onAfterRead = (files: FileItem | FileItem[]) => {
  const file = files as FileItem
  // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
  uni.uploadFile({
    url: 'https://example.xxx.com/upload', // 仅为示例，非真实的接口地址
    filePath: file.url,
    name: 'file',
    formData: { user: 'test' },
    success(res) {
      // 上传完成需要更新 fileList
      fileList.value.push({ url: res.data })
    },
  })
}
</script>
