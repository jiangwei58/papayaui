# Uploader

## 示例

<!--codes start-->

::: code-group

```html [template]
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
```
```ts [script]
<script setup lang="ts">
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { FileItem } from './props'
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
```

<!--codes end-->

## Uploader Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识符，可以在回调函数的第二项参数中获取 | string \| number | - |
| fileList | 上传的文件列表 | FileItem[] |  () => [] |
| mediaType | 接受的文件类型 | Array\<'image'\|'video'\|'mix'\> |  ['image', 'video', 'mix'] |
| sourceType | 图片和视频选择的来源 | Array\<'album'\|'camera'\> |  ['album', 'camera'] |
| sizeType | 是否压缩所选文件 | Array\<'original'\|'compressed'\> |  ['original', 'compressed'] |
| maxDuration | 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册 | number |  10 |
| camera | 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 | 'front'\|'back' |  'back' |
| maxSize | 文件大小限制，单位为byte | number | - |
| maxCount | 文件上传数量限制 | number |  Number.MAX_SAFE_INTEGER |
| previewSize | 预览图和上传区域的尺寸，默认单位为px | string \| number | - |
| previewImage | 是否在上传完成后展示预览图 | boolean |  true |
| previewFullImage | 是否在点击预览图后展示全屏图片预览 | boolean |  true |
| multiple | 是否开启图片多选 | boolean | - |
| disabled | 是否禁用文件上传 | boolean | - |
| showUpload | 是否展示文件上传按钮 | boolean |  true |
| deletable | 是否展示删除按钮 | boolean |  true |
| beforeRead | 文件读取前的回调函数，返回 false 可终止文件读取，支持返回 Promise | (file:UniApp.MediaFile[])=\>boolean\|Promise\<unknown\> | - |
| afterRead | 文件读取完成后的回调函数 | (file:FileItem\|FileItem[])=\>void | - |
| beforeDelete | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。 | (file:FileItem)=\>boolean\|Promise\<unknown\> | - |

<!--props end-->

## Uploader Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:fileList | (fileList: FileItem[], _name?: string \| number)  |
| change | (fileList: FileItem[], _name?: string \| number)  |
| click-preview | (file: FileItem, index: number)  |
| oversize | ()  |
| delete | (file: FileItem, index: number)  |

<!--event end-->

## Uploader Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

