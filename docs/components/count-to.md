# CountTo

<!--codes start-->

## 基础用法

```html [template]

<pa-count-to
  ref="countToRef"
  :start-num="0"
  :end-num="999"
  custom-class="text-60 text-black"
  @click="countToRef?.restart()"
/>

```
```ts [script]

import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()

```
## 倒计时

```html [template]

<pa-count-to
  ref="countToRef"
  :start-num="999"
  :end-num="0"
  custom-class="text-60 text-black"
  @click="countToRef?.restart()"
/>

```
```ts [script]

import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()

```
## 显示小数

```html [template]

<pa-count-to
  ref="countToRef"
  :start-num="0"
  :end-num="999.99"
  custom-class="text-60 text-black"
  @click="countToRef?.restart()"
/>

```
```ts [script]

import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()

```
## 自定义格式化值

```html [template]

<pa-count-to
  ref="countToRef"
  :start-num="0"
  :end-num="9999"
  :formatter="formatter"
  custom-class="text-60 text-black"
  @click="countToRef?.restart()"
/>

```
```ts [script]

import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()

const formatter = (num: number) => {
  return num.toString().replace(/\d+/, (s) => {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '<!--codes start-->,')
  })
}

```
## 日期倒计时

```html [template]

<pa-count-to
  ref="countToRef"
  :start-num="endTime - startTime"
  :end-num="0"
  :duration="endTime - startTime"
  :frequency="1000"
  :easeout="false"
  :formatter="formatter"
  autoplay
  custom-class="text-60 text-black"
  @click="countToRef?.restart()"
/>

```
```ts [script]

/**
 * @description 设置 duration 为日期差值，即需要的倒计时总时间，设置 frequency 为 1000，即每秒更新一次，设置 easeout 为 false，即不需要缓动效果
 */
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { ref } from 'vue'
import type { CountToInstance } from '../..'

dayjs.extend(duration)

const countToRef = ref<CountToInstance>()

const startTime = dayjs().valueOf()
const endTime = dayjs(startTime).add(1, 'hour').valueOf()

const formatter = (num: number) => {
  // 格式化成想要的日期格式
  return dayjs.duration(num).format('HH:mm:ss')
}

```
## 自定义控制

```html [template]

<pa-count-to ref="countToRef" :start-num="0" :end-num="999" custom-class="text-60 text-black" />
<view class="grid grid-cols-3 gap-20 mt-30">
  <pa-button block @click="countToRef?.start">开始</pa-button>
  <pa-button block @click="countToRef?.pause">暂停</pa-button>
  <pa-button block @click="countToRef?.resume">继续</pa-button>
  <pa-button block @click="countToRef?.reset">重置</pa-button>
  <pa-button block @click="countToRef?.restart">重新开始</pa-button>
</view>

```
```ts [script]

import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()

```

<!--codes end-->

## CountTo Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| startNum | 开始值 | number |  0 |
| endNum | 结束值 | number |  100 |
| duration | 滚动过程所需的时间，单位ms | number |  2000 |
| frequency | 频率，默认保持每秒60帧，即16毫秒一次 | number |  16 |
| autoplay | 是否自动开始滚动 | boolean | - |
| easeout | 缓动结尾效果 | boolean |  true |
| formatter | 格式化值 | (value:number)=\>string\|number | - |
| customClass | 自定义class | string | - |
| customStyle | 自定义style | string\|CSSProperties | - |

<!--props end-->

## CountTo Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (value: Event)  |
| change | (value: number, progress: number)  |
| finish | ()  |

<!--event end-->

## CountTo Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

