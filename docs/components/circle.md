# Circle

<!--codes start-->

## 基础用法

```html [template]

<pa-circle :model-value="80" />

```
## 样式定制

```html [template]

<view>
  <pa-circle :model-value="progress" stroke-width="8" text="设置宽度" />
  <pa-circle :model-value="progress" color="#ff2b2b" text="设置颜色" />
  <pa-circle :model-value="progress" :clockwise="false" text="逆时针" />
  <pa-circle :model-value="progress" :size="150" text="设置大小" />
</view>
<view class="mt-15">
  <pa-button type="primary" @click="add">增加</pa-button>
  <pa-button type="danger" class="ml-15" @click="subtract">减少</pa-button>
</view>

```
```ts [script]

import { ref } from 'vue'

const STEP = 10
const progress = ref(80)

const add = () => {
  if (progress.value >= 100) return
  progress.value += STEP
}

const subtract = () => {
  if (progress.value <= 0) return
  progress.value -= STEP
}

```

<!--codes end-->

## Circle Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 目标进度 | number |  0 |
| size | 圆环直径，单位px | number |  100 |
| color | 进度条颜色 | string |  '#009c5d' |
| layerColor | 轨道颜色 | string |  '#fff' |
| text | 文字 | string | - |
| strokeWidth | 进度条宽度，单位px | number \| string |  4 |
| clockwise | 是否顺时针 | boolean |  true |
| speed | 动画速度（单位为 value/s） | number |  50 |

<!--props end-->

## Circle Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Circle Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-circle-font-size | 14px |
| --pa-circle-font-weight | 500 |
| --pa-circle-text-color | var(--pa-color-black) |
| --pa-circle-text-line-height | 20px |

<!--cssVar end-->

