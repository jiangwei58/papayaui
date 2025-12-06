# Tabs

<!--codes start-->

## 基础用法

```html [template]

<pa-tabs v-model="tabActive">
  <pa-tab-pane title="标签1">内容1</pa-tab-pane>
  <pa-tab-pane title="标签2">内容2</pa-tab-pane>
  <pa-tab-pane title="标签3">内容3</pa-tab-pane>
  <pa-tab-pane title="标签4">内容4</pa-tab-pane>
</pa-tabs>

```
```ts [script]

import { ref } from 'vue'

const tabActive = ref<number>(0)

```
## 通过名称匹配

```html [template]

<pa-tabs v-model="tabActive">
  <pa-tab-pane title="标签1" name="a">内容1</pa-tab-pane>
  <pa-tab-pane title="标签2" name="b">内容2</pa-tab-pane>
  <pa-tab-pane title="标签3" name="c">内容3</pa-tab-pane>
</pa-tabs>

```
```ts [script]

import { ref } from 'vue'

const tabActive = ref<number>(0)

```
## 标签栏滚动

```html [template]

<pa-tabs v-model="tabActive" scrollable>
  <pa-tab-pane title="标签1">内容1</pa-tab-pane>
  <pa-tab-pane title="标签2">内容2</pa-tab-pane>
  <pa-tab-pane title="标签3">内容3</pa-tab-pane>
  <pa-tab-pane title="标签4">内容4</pa-tab-pane>
  <pa-tab-pane title="标签5">内容5</pa-tab-pane>
  <pa-tab-pane title="标签6">内容6</pa-tab-pane>
  <pa-tab-pane title="标签7">内容7</pa-tab-pane>
  <pa-tab-pane title="标签8">内容8</pa-tab-pane>
</pa-tabs>

```
```ts [script]

import { ref } from 'vue'

const tabActive = ref<number>(0)

```
## 禁用标签

```html [template]

<pa-tabs v-model="tabActive">
  <pa-tab-pane title="标签1">内容1</pa-tab-pane>
  <pa-tab-pane title="标签2" disabled>内容2</pa-tab-pane>
  <pa-tab-pane title="标签3">内容3</pa-tab-pane>
</pa-tabs>

```
```ts [script]

import { ref } from 'vue'

const tabActive = ref<number>(0)

```
## 点击事件

```html [template]

<pa-tabs v-model="tabActive" @change="onChange">
  <pa-tab-pane title="标签1">内容1</pa-tab-pane>
  <pa-tab-pane title="标签2">内容2</pa-tab-pane>
</pa-tabs>

```
```ts [script]

import { ref } from 'vue'
import type { TabItem } from 'papayaui'

const tabActive = ref<number>(0)

const onChange = (item: TabItem) => {
  // 如果是使用tabs传入的方式，item为tabs里对应选中的对象
  uni.showToast({
    title: item.title,
    icon: 'none',
  })
}

```
## 切换动画

```html [template]

<pa-tabs v-model="tabActive" animated>
  <pa-tab-pane title="标签1">内容1</pa-tab-pane>
  <pa-tab-pane title="标签2">内容2</pa-tab-pane>
  <pa-tab-pane title="标签3">内容3</pa-tab-pane>
  <pa-tab-pane title="标签4">内容4</pa-tab-pane>
</pa-tabs>

```
```ts [script]

import { ref } from 'vue'

const tabActive = ref<number>(0)

```
## tabs传入方式 - 基础用法

```html [template]

<pa-tabs v-model="tabActive" :tabs="getData(3)" />

```
```ts [script]

import { ref } from 'vue'

const tabActive = ref<number>(0)

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      title: `自定义${index}`,
      label: `标签${index}`,
      name: index,
      value: index,
    }
  })
}

```
## tabs传入方式 - 自定义索引值

```html [template]

<pa-tabs
  v-model="tabActive"
  :tabs="getData(3)"
  label-key="label"
  value-key="value"
  @change="onChange"
/>

```
```ts [script]

import { ref } from 'vue'

interface CustomTabItem {
  title: string
  label: string
  value: number
  name: number
}

const tabActive = ref<number>(0)

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      title: `自定义${index}`,
      label: `标签${index}`,
      name: index,
      value: index,
    }
  })
}

const onChange = (item: CustomTabItem) => {
  uni.showToast({
    title: item.label,
    icon: 'none',
  })
}

```

<!--codes end-->

## Tabs Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | TabItemValue |  0 |
| tabs | 标签页列表数据 | object[] | - |
| labelKey | 标题对应字段名 | string |  'label' |
| valueKey | 值对应字段名 | string | - |
| duration | 动画时间，单位秒 | number |  0.3 |
| lineWidth | 底部条宽度，默认单位px | string \| number | - |
| lineHeight | 底部条宽度，默认单位px | string \| number | - |
| scrollable | 是否滚动 | boolean | - |
| animated | 是否开启切换标签内容时的转场动画 | boolean | - |
| shrink | 是否开启左侧收缩布局 | boolean | - |

## TabPane Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标签名称，作为匹配的标识符 | string \| number | - |
| title | 标题 | string |  '' |
| disabled | 是否禁用标签 | boolean | - |

<!--props end-->

## Tabs Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (current: TabItemValue)  |
| change | (item: any)  |
| click | (item: any)  |

## TabPane Event

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Tabs Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## TabPane Slot

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-tabs-color | var(--pa-color-black-2) |
| --pa-tabs-height | 44px |
| --pa-tabs-bg-color | #fff |
| --pa-tabs-color-active | var(--pa-color-black) |
| --pa-tabs-font-size | 14px |
| --pa-tabs-item-padding | 0 4px |
| --pa-tabs-line-height | 20px |
| --pa-tabs-line-radius | 3rpx |
| --pa-tabs-line-width | 40px |
| --pa-tabs-item-scrollable-padding | 0 12px |

<!--cssVar end-->

