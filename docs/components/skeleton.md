# Skeleton

<!--codes start-->

## 基础用法

```html [template]

<pa-skeleton title row="3" animate />

```
## 显示头像

```html [template]

<pa-skeleton avatar title row="3" animate />

```
## 头像样式

```html [template]

<pa-skeleton avatar title row="3" avatar-shape="square" avatar-size="90px" animate />

```
## 显示子组件

```html [template]

<pa-switch v-model="loaded" class="block ml-32 mb-32" />
<pa-skeleton avatar title row="3" animate :loading="!loaded">
  <pa-image :src="src" width="64" height="64" round />
  <view class="ml-32">
    <view>这是标题</view>
    <text class="text-28 text-black-2">
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
    </text>
  </view>
</pa-skeleton>

```
```ts [script]

import { ref } from 'vue'
import src from '../../../images/demo.jpeg'

const loaded = ref(false)

```

<!--codes end-->

## Skeleton Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| row | 段落占位图行数 | number \| string |  0 |
| rowWidth | 段落占位图宽度，可传数组来设置每一行的宽度 | number\|string\|(number\|string)[] | - |
| title | 是否显示标题占位图 | boolean | - |
| avatar | 是否显示头像占位图 | boolean | - |
| loading | 是否显示骨架屏，传 false 时会展示子组件内容 | boolean |  true |
| animate | 是否开启动画 | boolean |  true |
| round | 是否将标题和段落显示为圆角风格 | boolean | - |
| titleWidth | 标题占位图宽度 | number \| string | - |
| avatarSize | 头像占位图大小 | number \| string | - |
| avatarShape | 头像占位图形状 | 'round'\|'square' |  'round' |

<!--props end-->

## Skeleton Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Skeleton Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-skeleton-padding | 0 16px |

<!--cssVar end-->

