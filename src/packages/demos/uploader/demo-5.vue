<template>
  <pa-uploader v-model:file-list="fileList">
    <pa-button type="primary" icon="plus">上传文件</pa-button>
  </pa-uploader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileItem } from '../..'

const fileList = ref<FileItem[]>([])
</script>
