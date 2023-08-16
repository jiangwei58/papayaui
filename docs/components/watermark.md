# Watermark

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <pa-watermark :contents="contents" />

  <view class="p-30" style="height: 100vh">{{ text }}</view>
</template>
```
```ts [script]
<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const contents = ['papayaui-watermark', dayjs().format('YYYY-MM-DD HH:mm')]
const text = ref<string>('')

onMounted(() => {
  text.value = new Array(20)
    .fill(0)
    .map(() => '页面内容')
    .join('')
})
</script>
```

<!--codes end-->

## Watermark Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| width | 单个水印宽度 | number |  150 |
| height | 单个水印高度 | number |  150 |
| rotate | 水印绘制时，旋转的角度 | number |  -20 |
| fontColor | 水印字体大小 | string |  'rgba(0,0,0,0.15)' |
| fontSize | 水印字体大小 | number |  14 |
| fontFamily | 水印文字字体 | string |  `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif` |
| zIndex | 水印元素层级 | number |  1000 |
| contents | 水印内容，数组的每个元素代表每一行的内容 | string\|string[] |  '' |

<!--props end-->

## Watermark Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Watermark Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

