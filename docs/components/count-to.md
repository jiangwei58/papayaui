# CountTo

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-count-to
      ref="countToRef"
      :start-num="0"
      :end-num="999"
      custom-class="text-60 text-black"
      @click="countToRef?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="倒计时" card>
    <pa-count-to
      ref="countToRef2"
      :start-num="999"
      :end-num="0"
      custom-class="text-60 text-black"
      @click="countToRef2?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="显示小数" card>
    <pa-count-to
      ref="countToRef3"
      :start-num="0"
      :end-num="999.99"
      custom-class="text-60 text-black"
      @click="countToRef3?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="自定义格式化值" card>
    <pa-count-to
      ref="countToRef4"
      :start-num="0"
      :end-num="9999"
      :formatter="
        (num) =>
          num.toString().replace(/\d+/, (s) => {
            return s.replace(/(\d)(?=(\d{3})+$)/g, '<!--codes start-->,')
          })
      "
      custom-class="text-60 text-black"
      @click="countToRef4?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="自定义控制" card>
    <pa-count-to
      ref="countToRef5"
      :start-num="0"
      :end-num="999"
      custom-class="text-60 text-black"
    />
    <view class="grid grid-cols-3 gap-20 mt-30">
      <pa-button block @click="countToRef5?.start">开始</pa-button>
      <pa-button block @click="countToRef5?.pause">暂停</pa-button>
      <pa-button block @click="countToRef5?.resume">继续</pa-button>
      <pa-button block @click="countToRef5?.reset">重置</pa-button>
      <pa-button block @click="countToRef5?.restart">重新开始</pa-button>
    </view>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type CountTo from '../count-to/count-to.vue'

const countToRef = ref<InstanceType<typeof CountTo>>()
const countToRef2 = ref<InstanceType<typeof CountTo>>()
const countToRef3 = ref<InstanceType<typeof CountTo>>()
const countToRef4 = ref<InstanceType<typeof CountTo>>()
const countToRef5 = ref<InstanceType<typeof CountTo>>()
</script>
```

<!--codes end-->

## Props

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

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (value: Event)  |
| change | (value: number, progress: number)  |
| finish | ()  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

