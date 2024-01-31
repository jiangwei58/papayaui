# Overlay

<!--codes start-->

## 基础用法

```html [template]

<pa-button @click="onVisibleChange()">显示遮罩层</pa-button>

<pa-overlay :show="visible" @click="onVisibleChange(false)" />

```
```ts [script]

import { ref } from 'vue'
const visible = ref(false)

const onVisibleChange = (show = true) => {
  visible.value = show
}

```
## 嵌入内容

```html [template]

<pa-button @click="onVisibleChange()">嵌入内容</pa-button>

<pa-overlay :show="visible" @click="onVisibleChange(false)">
  <view class="flex items-center justify-center height-full">
    <view style="width: 200px; height: 200px; background-color: #fff"></view>
  </view>
</pa-overlay>

```
```ts [script]

import { ref } from 'vue'
const visible = ref(false)

const onVisibleChange = (show = true) => {
  visible.value = show
}

```

<!--codes end-->

## Overlay Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否展示遮罩层 | boolean | - |
| zIndex | z-index 层级 | number |  1 |
| duration | 动画时长，单位毫秒 |  | - |
| customClass | 自定义class | string | - |
| customStyle | 自定义style | CSSProperties | - |

<!--props end-->

## Overlay Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | ()  |

<!--event end-->

## Overlay Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

