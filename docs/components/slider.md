# Slider

<!--codes start-->

## 基础用法

```html [template]

<pa-slider v-model="value" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(50)

```
## 双滑块

```html [template]

<pa-slider v-model="value" range />

```
```ts [script]

import { ref } from 'vue'

const value = ref([20, 50])

```
## 指定范围

```html [template]

<pa-slider v-model="value" :min="-10" :max="10" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(-4)

```
## 设置步长

```html [template]

<pa-slider v-model="value" :step="5" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(20)

```
## 显示范围

```html [template]

<pa-slider v-model="value" show-range />

```
```ts [script]

import { ref } from 'vue'

const value = ref(25)

```
## 禁用

```html [template]

<pa-slider v-model="value" disabled />

```
```ts [script]

import { ref } from 'vue'

const value = ref(20)

```
## 自定义样式

```html [template]

<pa-slider v-model="value" active-color="red" inactive-color="#ccc" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(20)

```
## 自定义按钮

```html [template]

<pa-slider v-model="value">
  <template #button>
    <div class="slider-demo-button">{{ value }}</div>
  </template>
</pa-slider>

```
```ts [script]

import { ref } from 'vue'

const value = ref(20)

```
## 刻度标记

```html [template]

<pa-slider v-model="value" :marks="marks" />
<pa-slider v-model="value2" :marks="marks" range class="block" style="margin-top: 60px" />

```
```ts [script]

import { ref } from 'vue'

const value = ref(52)
const value2 = ref([29, 72])

const marks = {
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
}

```

<!--codes end-->

## Slider Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 当前进度百分比，在双滑块模式下为数组格式 | SliderValue | 单滑块时0，双滑块时[0, 100] |
| range | 是否开启双滑块模式 | boolean |  false |
| min | 最小值 | number |  0 |
| max | 最大值 | number |  100 |
| step | 步长 | number |  1 |
| disabled | 是否禁用滑块 | boolean |  false |
| showTag | 是否显示当前进度标签 | boolean |  false |
| showRange | 是否显示范围值 | boolean |  false |
| marks | 是否显示刻度标记 | Record\<number,string\> |  false |
| activeColor | 进度条颜色 | string | - |
| inactiveColor | 进度条非激活态颜色 | string | - |

<!--props end-->

## Slider Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: number \| number[])  |
| change | (value: number \| number[])  |

<!--event end-->

## Slider Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| button | - |

<!--slot end-->

