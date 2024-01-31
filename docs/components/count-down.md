# CountDown

<!--codes start-->

## 基础用法

```html [template]

<pa-count-down :time="1000 * 60 * 30" />

```
## 自定义格式

```html [template]

<pa-count-down :time="1000 * 60 * 60 * 26" format="DD天HH时mm分ss秒" />

```
## 毫秒级渲染

```html [template]

<pa-count-down :time="1000 * 60 * 30" format="HH:mm:ss:SSS" millisecond />

```
## 自定义样式

```html [template]

<pa-count-down :time="time" @change="onChange">
  <text class="time-item">{{ timeData?.hours }}</text>
  <text class="time-item">{{ timeData?.minutes }}</text>
  <text class="time-item">{{ timeData?.seconds }}</text>
</pa-count-down>

```
```ts [script]

import { ref } from 'vue'
import type { CountDownDuration } from '../../components'

const time = 1000 * 60 * 30
const timeData = ref<CountDownDuration>()

const onChange = (duration: CountDownDuration) => {
  timeData.value = duration
}

```
## 手动控制

```html [template]

<pa-count-down ref="countDownRef" :time="time" format="ss:SSS" millisecond :auto-start="false" />

<view class="flex mt-20">
  <pa-button @click="start">开始</pa-button>
  <pa-button class="ml-20" @click="pause">暂停</pa-button>
  <pa-button class="ml-20" @click="reset">重置</pa-button>
</view>

```
```ts [script]

import { ref } from 'vue'
import type { CountDownInstance } from '../../components'

const time = 1000 * 6
const countDownRef = ref<CountDownInstance>()

const start = () => {
  countDownRef.value?.start()
}

const pause = () => {
  countDownRef.value?.pause()
}

const reset = () => {
  countDownRef.value?.reset()
}

```

<!--codes end-->

## CountDown Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| time | 倒计时时长，单位毫秒 | number | - |
| format | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | string |  'HH:mm:ss' |
| autoStart | 是否自动开始倒计时 | boolean |  true |
| millisecond | 是否开启毫秒级渲染 | boolean |  false |

<!--props end-->

## CountDown Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| finish | ()  |
| change | (duration: CountDownDuration)  |

<!--event end-->

## CountDown Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-count-down-color | var(--pa-color-black) |
| --pa-count-down-font-size | 14px |
| --pa-count-down-line-height | 20px |

<!--cssVar end-->

