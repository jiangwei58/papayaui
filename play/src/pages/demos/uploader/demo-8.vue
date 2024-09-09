<template>
  <pa-uploader v-model:file-list="fileList" @click-preview="onPreview" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileItem } from 'papayaui'

const fileList = ref<FileItem[]>([
  {
    url: '',
    type: 'word',
  },
  {
    url: '',
    type: 'excel',
  },
  {
    url: '',
    type: 'ppt',
  },
  {
    url: '',
    type: 'pdf',
  },
  {
    url: '',
    type: 'markdown',
  },
  {
    url: '',
    type: 'zip',
  },
  {
    url: '',
    type: 'file',
  },
])

const onPreview = (file: FileItem, index: number) => {
  uni.showToast({
    title: `预览第${index + 1}个文件，是${file.type}文件`,
    icon: 'none',
  })
}
</script>
