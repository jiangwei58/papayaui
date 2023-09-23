# Steps

<!--codes start-->

## 基础用法

```html [template]

<pa-steps :steps="steps" :current="current" />
<view class="text-center mt-30">
  <pa-button round @click="onNext()">下一步</pa-button>
</view>

```
```ts [script]

import { ref } from 'vue'

const steps = [
  {
    title: '步骤一',
    desc: '描述信息',
  },
  {
    title: '步骤二',
    desc: '描述信息',
  },
  {
    title: '步骤三',
    desc: '描述信息',
  },
]

const current = ref<number>(0)

const onNext = () => {
  current.value += 1
  if (current.value >= steps.length) {
    current.value = 0
  }
}

```
## 竖向步骤条

```html [template]

<view style="height: 200px">
  <pa-steps :steps="steps" :current="current" direction="vertical" />
</view>

```
```ts [script]

import { ref } from 'vue'

const steps = [
  {
    title: '步骤一',
    desc: '描述信息',
  },
  {
    title: '步骤二',
    desc: '描述信息',
  },
  {
    title: '步骤三',
    desc: '描述信息',
  },
]

const current = ref<number>(0)

```
## 自定义

```html [template]

<pa-steps :steps="steps" :current="current">
  <template #icon="{ index }">
    <view
      class="flex items-center justify-center rounded-4"
      style="width: 30px; height: 30px; background-color: #ccc"
    >
      <pa-icon name="success" />
      <text>{{ index }}</text>
    </view>
  </template>
  <template #title="{ index, status }">
    <text class="color-primary">{{ steps[index].title }}-{{ status }}</text>
  </template>
  <template #desc="{ index }">
    <text class="text-black-2">{{ steps[index].desc }}</text>
  </template>
</pa-steps>

<view style="margin-top: 60px">
  <pa-steps :steps="steps" :current="current" direction="vertical">
    <template #icon="{ index }">
      <view
        class="flex items-center justify-center rounded-4"
        style="width: 30px; height: 30px; background-color: #ccc"
      >
        <pa-icon name="success" />
        <text>{{ index }}</text>
      </view>
    </template>
    <template #title="{ index, status }">
      <text class="color-primary">{{ steps[index].title }}-{{ status }}</text>
    </template>
    <template #desc="{ index }">
      <view style="height: 50px">
        <text class="text-black-2">{{ steps[index].desc }}</text>
      </view>
    </template>
  </pa-steps>
</view>

```
```ts [script]

import { ref } from 'vue'

const steps = [
  {
    title: '步骤一',
    desc: '描述信息',
  },
  {
    title: '步骤二',
    desc: '描述信息',
  },
  {
    title: '步骤三',
    desc: '描述信息',
  },
]

const current = ref<number>(0)

```

<!--codes end-->

## Steps Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| current | 当前步骤 | number |  0 |
| steps | 每个步骤的配置 | StepItem[] |  () => [] |
| direction | 显示方向 | 'horizontal'\|'vertical' |  'horizontal' |

<!--props end-->

## Steps Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click-step | (index: number)  |

<!--event end-->

## Steps Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| icon | - |
| title | - |
| desc | - |

<!--slot end-->

