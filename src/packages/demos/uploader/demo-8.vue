<template>
  <pa-uploader v-model:file-list="fileList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileItem } from '../..'

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
</script>
