# Checkbox

<!--codes start-->

## 基础用法

```html [template]

<pa-checkbox v-model="checkValue">复选框</pa-checkbox>
<view class="text-28 text-black-3 mt-30">
  <text>当前选中值</text>
  <text class="ml-10">{{ JSON.stringify(checkValue) }}</text>
</view>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref(true)

```
## 半选状态

```html [template]

<pa-checkbox v-model="checkValue" indeterminate>复选框</pa-checkbox>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref(false)

```
## 复选框组

```html [template]

<pa-checkbox-group v-model="checkValue">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>
<pa-checkbox-group v-model="checkValue" class="block mt-50">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" label-position="left">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>
<view class="text-28 text-black-3 mt-30">
  <text>当前选中值</text>
  <text class="ml-10">{{ JSON.stringify(checkValue) }}</text>
</view>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))

```
## 水平方向

```html [template]

<pa-checkbox-group v-model="checkValue" direction="horizontal">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>
<pa-checkbox-group v-model="checkValue" direction="horizontal" class="block mt-50">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" label-position="left">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))

```
## 形状

```html [template]

<pa-checkbox-group v-model="checkValue">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" shape="square">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))

```
## 禁用

```html [template]

<pa-checkbox-group v-model="checkValue">
  <pa-checkbox
    v-for="item in options"
    :key="item.name"
    :name="item.name"
    :disabled="item.name === 1"
  >
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>
<pa-checkbox-group v-model="checkValue" disabled class="block mt-50">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))

```
## 限制最大可选数（2个）

```html [template]

<pa-checkbox-group v-model="checkValue" :max="2">
  <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-checkbox>
</pa-checkbox-group>

```
```ts [script]

import { ref } from 'vue'

const checkValue = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))

```

<!--codes end-->

## Checkbox Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 是否选中 | boolean | - |
| name | 标识符 | CheckboxValue |  '' |
| shape | 形状 | 'square'\|'round' |  'round' |
| disabled | 是否为禁用状态 | boolean | - |
| labelDisabled | 是否禁用文本内容点击 | boolean | - |
| labelPosition | 文本位置 | 'left'\|'right' |  'right' |
| iconSize | 图标大小 | string \| number |  '20px' |
| checkedColor | 选中状态颜色 | CSSProperties['color'] | - |
| indeterminate | 当前是否支持半选状态，一般用在全选操作中 | boolean | - |

## CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识符 | string |  '' |
| modelValue | 值 | CheckboxValue[] | - |
| direction | 方向 | 'horizontal'\|'vertical' |  'vertical' |
| disabled | 是否全部禁用 | boolean | - |
| max | 限制选择的数量 | number | - |

<!--props end-->

## Checkbox Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: boolean)  |
| change | (value: boolean, name: CheckboxValue)  |

## CheckboxGroup Event

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: CheckboxValue[])  |
| change | (value: CheckboxValue[], name: string)  |

<!--event end-->

## Checkbox Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| default | - |

## CheckboxGroup Slot

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

