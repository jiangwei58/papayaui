<template>
  <DocDemoBlock title="基础用法" card>
    <pa-uploader v-model:file-list="fileList" :after-read="onAfterRead" />
  </DocDemoBlock>

  <DocDemoBlock title="文件预览" card>
    <pa-uploader v-model:file-list="fileList2" />
  </DocDemoBlock>

  <DocDemoBlock title="限制上传数量" card>
    <pa-uploader v-model:file-list="fileList3" :max-count="3" />
  </DocDemoBlock>

  <DocDemoBlock title="限制上传大小" card>
    <pa-uploader v-model:file-list="fileList4" :max-size="1024 * 20" @oversize="onOversize" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义上传样式" card>
    <pa-uploader v-model:file-list="fileList5">
      <pa-button type="primary" icon="plus">上传文件</pa-button>
    </pa-uploader>
  </DocDemoBlock>

  <DocDemoBlock title="禁用文件上传" card>
    <pa-uploader disabled />
  </DocDemoBlock>

  <DocDemoBlock title="独立控制删除" card>
    <pa-uploader v-model:file-list="fileList6" />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { FileItem } from './props'
// 仅做本地示例，使用时请用网络图片
import img1 from '../../images/demo2.jpeg'
import img2 from '../../images/demo3.jpg'

const fileManager = uni.getFileSystemManager()
const src1 = 'data:image/jpeg;base64,' + fileManager.readFileSync(img1, 'base64')
const src2 = 'data:image/jpeg;base64,' + fileManager.readFileSync(img2, 'base64')

const fileList = ref<FileItem[]>([])
const fileList2 = ref([
  {
    url: src1,
  },
  {
    url: src2,
  },
])
const fileList3 = ref([
  {
    url: src1,
  },
])
const fileList4 = ref([
  {
    url: src1,
  },
])
const fileList5 = ref([])

const fileList6 = ref([
  {
    url: src1,
    deletable: false,
  },
  {
    url: src2,
  },
])

const onOversize = () => {
  uni.showToast({
    title: '文件大小超过限制(20KB)',
    icon: 'none',
  })
}

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

<style lang="scss" scoped></style>
