# CheckboxButtons

<!--codes start-->

## 基础用法

```html [template]

<pa-checkbox-btns v-model="selectedValue" :options="getData(6)" />

```
```ts [script]

import { ref } from 'vue'

const selectedValue = ref<number>(0)

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}

```
## 多选

```html [template]

<pa-checkbox-btns v-model="selectedValue" :options="getData(6)" multiple />

```
```ts [script]

import { ref } from 'vue'

const selectedValue = ref<number[]>([0, 1])

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}

```
## 自定义布局

```html [template]

<pa-checkbox-btns v-model="selectedValue" :options="getData(8)" :column="4" gap="10" round />

```
```ts [script]

import { ref } from 'vue'

const selectedValue = ref<number>()

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}

```
## 自定义内容

```html [template]

<pa-checkbox-btns v-model="selectedValue" :options="getData(8)">
  <template #default="{ item, index }">
    <pa-icon :name="index % 2 === 0 ? 'success' : 'close'" />
    <text>{{ item.label }}</text>
  </template>
</pa-checkbox-btns>

```
```ts [script]

import { ref } from 'vue'

const selectedValue = ref<number>()

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}

```
## 禁用状态

```html [template]

<pa-checkbox-btns v-model="selectedValue" :options="getData(6)" disabled />

```
```ts [script]

import { ref } from 'vue'

const selectedValue = ref<number>(0)

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}

```

<!--codes end-->

## CheckboxButtons Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| column | 列数 | number |  3 |
| gap | 间隔 | string \| number |  20 |
| modelValue | 选中值 | CheckboxButtonValue\|CheckboxButtonValue[] | - |
| options | 选项列表 | CheckboxItem[] |  () => [] |
| labelKey | 标题对应字段名 | string |  'label' |
| valueKey | 内容对应字段名 | string |  'value' |
| multiple | 是否多选 | boolean |  false |
| bgColor | 背景色 | string | - |
| round | 圆角大小, 值为true时半圆角 | boolean \| string |  '4rpx' |
| inverse | 是否支持反选 | boolean |  true |
| disabled | 是否禁用 | boolean |  false |

<!--props end-->

## CheckboxButtons Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: CheckboxButtonValue \| CheckboxButtonValue[])  |
| change | (item: CheckboxItem \| CheckboxItem[], index: number)  |

<!--event end-->

## CheckboxButtons Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-checkbox-btns-background | var(--pa-color-gray) |
| --pa-checkbox-btns-color | var(--pa-color-black) |
| --pa-checkbox-btns-padding | 7px 4px |
| --pa-checkbox-btns-active-background | rgba(0, 156, 93, 0.1) |
| --pa-checkbox-btns-active-color | var(--pa-color-primary) |
| --pa-checkbox-btns-border-color | var(--pa-color-gray) |
| --pa-checkbox-btns-border-width | 2rpx |
| --pa-checkbox-btns-disabled-opacity | 0.8 |
| --pa-checkbox-btns-font-size | 14px |
| --pa-checkbox-btns-active-border-color | var(--pa-color-primary) |

<!--cssVar end-->

