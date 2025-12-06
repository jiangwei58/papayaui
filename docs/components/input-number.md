# InputNumber

<!--codes start-->

## 基础用法

```html [template]

<pa-input-number v-model="value" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(1)

```
## 步长设置

```html [template]

<pa-input-number v-model="value" step="2" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(1)

```
## 限制输入范围

```html [template]

<pa-input-number v-model="value" min="2" max="6" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(1)

```
## 输入小数

```html [template]

<pa-input-number v-model="value" min="0" step="0.2" :decimal-length="2" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(1)

```
## 禁用状态

```html [template]

<pa-input-number :model-value="1" disabled />

```
## 禁用输入框

```html [template]

<pa-input-number :model-value="1" readonly />

```
## 异步

```html [template]

<pa-input-number :model-value="num" async-change @change="onChange" />

```
```ts [script]

import { ref } from 'vue'
import { sleep } from 'papayaui'

const num = ref(1)

const onChange = async (value: number) => {
  uni.showToast({
    icon: 'loading',
    title: '',
    duration: 2000,
  })
  await sleep(2000)
  num.value = value
  uni.hideToast()
}

```
## 只显示输入框

```html [template]

<pa-input-number v-model="value" :controls="false" input-width="92px" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(1)

```
## 聚焦选中全部内容

```html [template]

<pa-input-number v-model="value" :controls="false" input-width="92px" select-all-on-focus />

```
```ts [script]

import { ref } from 'vue'

const value = ref(999)

```

<!--codes end-->

## InputNumber Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | InputNumberValue | - |
| name | 标识符 | string |  '' |
| placeholder | 输入提示 | string |  '' |
| inputAlign | 内容对齐方式 | 'left'\|'center'\|'right' |  'center' |
| inputWidth | 输入框宽度 | string | - |
| min | 最小值 | InputNumberValue |  1 |
| max | 最大值 | InputNumberValue |  9999 |
| step | 步长 | InputNumberValue |  1 |
| intLength | 整数位长度 | number |  Number.MAX_SAFE_INTEGER.toString().length |
| decimalLength | 小数位长度 | number |  0 |
| readonly | 只读状态禁用输入框操作行为 | boolean | - |
| disabled | 禁用所有功能 | boolean | - |
| controls | 是否显示控制按钮 | boolean |  true |
| asyncChange | 是否开启异步变更，开启后需要手动控制输入值 | boolean | - |
| block | 是否为块级元素 | boolean | - |
| plain | 朴素样式 | boolean | - |
| nullable | 是否允许空值 | boolean | - |
| nullValue | 空值时返回的值 | any |  null |
| selectAllOnFocus | 聚焦时是否全选内容 | boolean | - |

<!--props end-->

## InputNumber Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: number, _name?: string)  |
| change | (value: number, _name?: string)  |
| focus | (value: EventDetail\<{ value: InputNumberValue; height: number }\>)  |
| blur | (value: EventDetail\<{ value: InputNumberValue; cursor: number }\>)  |

<!--event end-->

## InputNumber Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-input-number-color | var(--pa-color-black) |
| --pa-input-number-height | 28px |
| --pa-input-number-round | 4px |
| --pa-input-number-width | 32px |
| --pa-input-number-bg-color | #f2f3f5 |
| --pa-input-number-disabled-color | #c8c9cc |
| --pa-input-number-font-size | 14px |
| --pa-input-number-placeholder-color | var(--pa-input-number-disabled-color, #c8c9cc) |
| --pa-input-number-disabled-bg-color | #f2f3f5 |

<!--cssVar end-->

