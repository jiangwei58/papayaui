# Segmented

<!--codes start-->

## 基础用法

```html [template]

<pa-segmented v-model="value" :options="options" />
<view style="margin-top: 16px">当前值: {{ value }}</view>

```
```ts [script]

import { ref } from 'vue'

const value = ref('iOS')
const options = [
  { label: 'iOS', value: 'iOS' },
  { label: 'Android', value: 'Android' },
  { label: 'Web', value: 'Web' },
]

```
## 块级元素

```html [template]

<pa-segmented v-model="value" :options="options" block />
<view style="margin-top: 16px">当前值: {{ value }}</view>

```
```ts [script]

import { ref } from 'vue'

const value = ref('list')
const options = [
  { label: '列表', value: 'list' },
  { label: '看板', value: 'kanban' },
  { label: '日历', value: 'calendar' },
]

```
## 三种尺寸

```html [template]

<view style="display: flex; flex-direction: column; gap: 16px">
  <pa-segmented v-model="value" :options="options" size="small" />
  <pa-segmented v-model="value" :options="options" size="medium" />
  <pa-segmented v-model="value" :options="options" size="large" />
</view>

```
```ts [script]

import { ref } from 'vue'

const value = ref(1)
const options = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
]

```
## 禁用状态

```html [template]

<pa-segmented v-model="value" :options="options" disabled />

```
```ts [script]

import { ref } from 'vue'

const value = ref('daily')
const options = [
  { label: '每日', value: 'daily' },
  { label: '每周', value: 'weekly' },
  { label: '每月', value: 'monthly' },
]

```
## 禁用单个选项

```html [template]

<pa-segmented v-model="value" :options="options" />

```
```ts [script]

import { ref } from 'vue'

const value = ref('read')
const options = [
  { label: '只读', value: 'read' },
  { label: '编辑', value: 'edit' },
  { label: '禁用', value: 'disabled', disabled: true },
]

```
## 简单数组

```html [template]

<pa-segmented v-model="value" :options="options" />
<view style="margin-top: 16px">当前值: {{ value }}</view>

```
```ts [script]

import { ref } from 'vue'

const value = ref('apple')
const options = ['apple', 'orange', 'banana']

```
## 自定义样式

```html [template]

<view style="display: flex; flex-direction: column; gap: 16px">
  <!-- 自定义颜色 -->
  <pa-segmented v-model="value1" :options="options1" class="custom-color" />

  <!-- 自定义圆角 -->
  <pa-segmented v-model="value2" :options="options2" class="custom-radius" />
</view>

```
```ts [script]

import { ref } from 'vue'

const value1 = ref('vue')
const options1 = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

const value2 = ref('star')
const options2 = [
  { label: '⭐ 收藏', value: 'star' },
  { label: '👍 点赞', value: 'like' },
  { label: '💬 评论', value: 'comment' },
]

```

<!--codes end-->

## Segmented Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 当前选中的值 | SegmentedValue | - |
| options | 选项数据 | SegmentedOption[]\|SegmentedValue[] |  () => [] |
| disabled | 是否禁用 | boolean | - |
| block | 是否为块级元素 | boolean | - |
| size | 尺寸大小 | 'small'\|'medium'\|'large' |  'medium' |

<!--props end-->

## Segmented Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: SegmentedValue)  |
| change | (value: SegmentedValue)  |

<!--event end-->

## Segmented Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-segmented-duration | 0.3s |
| --pa-segmented-padding | 2px |
| --pa-segmented-bg-color | #f5f5f5 |
| --pa-segmented-border-radius | 8px |
| --pa-segmented-height-large | 40px |
| --pa-segmented-height-medium | 32px |
| --pa-segmented-height-small | 24px |
| --pa-segmented-indicator-bg | #ffffff |
| --pa-segmented-item-color | rgba(0, 0, 0, 0.65) |
| --pa-segmented-font-size-large | 16px |
| --pa-segmented-font-size-medium | 14px |
| --pa-segmented-font-size-small | 12px |
| --pa-segmented-item-active-color | rgba(0, 0, 0, 0.88) |
| --pa-segmented-item-disabled-color | #a8abb2 |

<!--cssVar end-->

