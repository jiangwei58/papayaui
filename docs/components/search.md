# Search

<!--codes start-->

## 基础用法

```html [template]

<pa-search v-model="text" />

```
```ts [script]

import { ref } from 'vue'

const text = ref<string>('')

```
## 圆角

```html [template]

<pa-search v-model="text" shape="round" />

```
```ts [script]

import { ref } from 'vue'

const text = ref<string>('')

```
## 前后插槽

```html [template]

<pa-search v-model="text">
  <template #before>
    <text class="pr-12">前部</text>
  </template>
  <template #after>
    <text class="pl-12">搜索</text>
  </template>
</pa-search>

```
```ts [script]

import { ref } from 'vue'

const text = ref<string>('')

```
## 前后缀插槽

```html [template]

<pa-search v-model="text">
  <template #prefix>
    <text class="p-12">地址</text>
  </template>
  <template #suffix>
    <text class="p-12">后缀</text>
  </template>
</pa-search>

```
```ts [script]

import { ref } from 'vue'

const text = ref<string>('')

```
## 搜索框内容对齐

```html [template]

<pa-search v-model="text" input-align="center" />

```
```ts [script]

import { ref } from 'vue'

const text = ref<string>('')

```
## 禁用和只读搜索框

```html [template]

<pa-search v-model="text" readonly @click-input="onClick" />

<pa-search v-model="text" disabled @click-input="onClick" />

```
```ts [script]

import { ref } from 'vue'

const text = ref<string>('')

const onClick = () => {
  uni.showToast({
    icon: 'none',
    title: '点击输入框',
  })
}

```
## 背景色

```html [template]

<pa-search v-model="text" background="var(--pa-color-primary)" input-background="#fff" />

```
```ts [script]

/**
 * @tips 更推荐使用 CSS 变量的方式来修改样式
 */
import { ref } from 'vue'

const text = ref<string>('')

```

<!--codes end-->

## Search Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | string | - |
| shape | 搜索框形状 | 'square'\|'round' |  'square' |
| placeholder | 输入提示 | string |  '请输入搜索关键词' |
| clearable | 是否显示清除控件 | boolean |  true |
| inputAlign | 输入内容对齐方式 | 'left'\|'center'\|'right' |  'left' |
| background | 搜索框背景色 | CSSProperties['background-color'] | - |
| inputBackground | 搜索框内部背景色 | CSSProperties['background-color'] | - |
| disabled | 是否禁用 | boolean | - |
| readonly | 是否只读 | boolean | - |

<!--props end-->

## Search Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: string)  |
| change | (value: string)  |
| confirm | (value: EventDetail\<{ value: string }\>)  |
| clear | ()  |
| click-input | ()  |

<!--event end-->

## Search Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| before | - |
| prefix | - |
| suffix | - |
| after | - |

<!--slot end-->

