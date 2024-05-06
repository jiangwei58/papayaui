# Transition

<!--codes start-->

## 基础用法

```html [template]

<view style="width: 100px; height: 100px">
  <pa-transition :show="show" :mode="mode">
    <view style="width: 100px; height: 100px; background-color: #009c5d"></view>
  </pa-transition>
</view>

<view class="grid grid-cols-2 gap-30 mt-30">
  <pa-button v-for="modeKey in modeList" :key="modeKey" block @click="onShow(modeKey)">
    {{ modeKey }}
  </pa-button>
</view>

```
```ts [script]

import { nextTick, ref } from 'vue'
import type { TransitionMode } from '../..'

const show = ref<boolean>(true)
const mode = ref<TransitionMode>('fade')

const modeList = ref<TransitionMode[]>([
  'fade',
  'zoom',
  'fade-zoom',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
])

const onShow = async (newMode: TransitionMode) => {
  mode.value = newMode
  show.value = false
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
  await nextTick()
  show.value = true
}

```

<!--codes end-->

## Transition Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否展示组件 | boolean | - |
| mode | 使用的动画模式 | TransitionMode |  'fade' |
| duration | 动画的执行时间，单位ms | string \| number |  300 |
| timingFunction | 使用的动画过渡函数 | CSSProperties['transitionTimingFunction'] |  'ease-out' |
| destroyOnClose | 关闭是否销毁内部元素 | boolean |  true |
| customClass | 自定义class | string | - |
| customStyle | 自定义样式 | CSSProperties | - |

<!--props end-->

## Transition Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | ()  |
| beforeEnter | : |
| enter | : |
| afterEnter | : |
| beforeLeave | : |
| leave | : |
| afterLeave | : |

<!--event end-->

## Transition Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

