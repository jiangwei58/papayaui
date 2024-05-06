# Switch

<!--codes start-->

## 基础用法

```html [template]

<pa-switch v-model="checked" />

```
```ts [script]

import { ref } from 'vue'

const checked = ref<boolean>(true)

```
## 禁用状态

```html [template]

<pa-switch v-model="checked" disabled />

```
```ts [script]

import { ref } from 'vue'

const checked = ref<boolean>(true)

```
## 加载状态

```html [template]

<pa-switch v-model="checked" loading />

```
```ts [script]

import { ref } from 'vue'

const checked = ref<boolean>(true)

```
## 自定义大小

```html [template]

<pa-switch v-model="checked" size="18px" />

```
```ts [script]

import { ref } from 'vue'

const checked = ref<boolean>(true)

```
## 异步控制

```html [template]

<pa-switch :model-value="checked" :loading="loading" @change="onChange" />

```
```ts [script]

import { ref } from 'vue'
import type { SwitchValue } from '../..'

const checked = ref<boolean>(true)
const loading = ref<boolean>(false)

const onChange = (value: SwitchValue) => {
  loading.value = true
  setTimeout(() => {
    checked.value = value as boolean
    loading.value = false
  }, 2000)
}

```
## 自定义颜色

```html [template]

<pa-switch v-model="checked" active-color="#ee0a24" inactive-color="#aaa" />

```
```ts [script]

import { ref } from 'vue'

const checked = ref<boolean>(true)

```
## 自定义值

```html [template]

<pa-switch v-model="checked" active-value="开" inactive-value="关" />
<text class="ml-40">{{ checked }}</text>

```
```ts [script]

import { ref } from 'vue'

const checked = ref<string>('开')

```

<!--codes end-->

## Switch Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 开关状态 | SwitchValue |  false |
| activeValue | 打开时组件的值 | SwitchValue |  true |
| inactiveValue | 关闭组件的值 | SwitchValue |  false |
| activeColor | 打开时的背景颜色 | CSSProperties['background-color'] | - |
| inactiveColor | 关闭时的背景颜色 | CSSProperties['background-color'] | - |
| loading | 禁用状态 | boolean | - |
| disabled | 加载状态 | boolean | - |
| size | 开关尺寸 | string | - |

<!--props end-->

## Switch Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: SwitchValue)  |
| change | (value: SwitchValue)  |

<!--event end-->

## Switch Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-switch-size | 24px |

<!--cssVar end-->

