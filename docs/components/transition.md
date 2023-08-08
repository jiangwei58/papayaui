# Transition

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="演示" card>
    <view style="width: 100px; height: 100px">
      <pa-transition :show="show" :mode="mode">
        <view style="width: 100px; height: 100px; background-color: #009c5d"></view>
      </pa-transition>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="基础用法" card>
    <view class="grid grid-cols-2 gap-30">
      <pa-button v-for="modeKey in modeList" :key="modeKey" block @click="onShow(modeKey)">
        {{ modeKey }}
      </pa-button>
    </view>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { TransitionMode } from './props'

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
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否展示组件 | boolean | - |
| mode | 使用的动画模式 | TransitionMode |  'fade' |
| duration | 动画的执行时间，单位ms | string \| number |  300 |
| timingFunction | 使用的动画过渡函数 | CSSProperties['transitionTimingFunction'] |  'ease-out' |
| customClass | 自定义class | string | - |
| customStyle | 自定义样式 | CSSProperties | - |

<!--props end-->

## Event

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

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

