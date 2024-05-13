# Uploader

<!--codes start-->

## 基础用法

```html [template]

<pa-uploader v-model:file-list="fileList" :after-read="onAfterRead" />

```
```ts [script]

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

```
## 文件预览

```html [template]

<pa-uploader v-model:file-list="fileList" />

```
```ts [script]

import { ref } from 'vue'
// 仅做本地示例，使用时请用网络图片
import img1 from '../../images/demo2.jpeg'
import img2 from '../../images/demo3.jpg'
import type { FileItem } from '../..'

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

const fileList = ref<FileItem[]>([
  {
    url: src1,
  },
  {
    url: src2,
  },
])

```
## 限制上传数量

```html [template]

<pa-uploader v-model:file-list="fileList" :max-count="3" />

```
```ts [script]

import { ref } from 'vue'
// 仅做本地示例，使用时请用网络图片
import img1 from '../../images/demo2.jpeg'

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

```
## 限制上传大小

```html [template]

<pa-uploader v-model:file-list="fileList" :max-size="1024 * 20" @oversize="onOversize" />

```
```ts [script]

import { ref } from 'vue'
// 仅做本地示例，使用时请用网络图片
import img1 from '../../images/demo2.jpeg'

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

const onOversize = () => {
  uni.showToast({
    title: '文件大小超过限制(20KB)',
    icon: 'none',
  })
}

```
## 自定义上传样式

```html [template]

<pa-uploader v-model:file-list="fileList">
  <pa-button type="primary" icon="plus">上传文件</pa-button>
</pa-uploader>

```
```ts [script]

import { ref } from 'vue'
import type { FileItem } from '../..'

const fileList = ref<FileItem[]>([])

```
## 禁用文件上传

```html [template]

<pa-uploader disabled />

```
## 独立控制删除

```html [template]

<pa-uploader v-model:file-list="fileList" />

```
```ts [script]

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
    deletable: false,
  },
  {
    url: src2,
  },
])

```
## 其他文件类型

```html [template]

<pa-uploader v-model:file-list="fileList" />

```
```ts [script]

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
| error | (e: UniApp.GeneralCallbackResult)  |

<!--event end-->

## Uploader Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-uploader-preview-margin | 0 10px 10px 0 |
| --pa-uploader-size | 100px |
| --pa-uploader-size | 100px |
| --pa-uploader-preview-radius | 4px |
| --pa-uploader-preview-file-size | 36px |
| --pa-uploader-preview-file-color | var(--pa-color-black-3) |
| --pa-uploader-preview-file-text-size | 14px |
| --pa-uploader-delete-width | 14px |
| --pa-uploader-delete-height | 14px |
| --pa-uploader-delete-bg | rgba(0, 0, 0, 0.7) |
| --pa-uploader-preview-radius | 4px |
| --pa-uploader-delete-icon-size | 12px |
| --pa-uploader-size | 100px |
| --pa-uploader-size | 100px |
| --pa-uploader-preview-margin | 0 10px 10px 0 |
| --pa-uploader-preview-radius | 4px |

<!--cssVar end-->

