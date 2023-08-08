# Steps

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-steps :steps="steps" :current="current" />
    <view class="text-center mt-30">
      <pa-button round @click="onNext()">下一步</pa-button>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="竖向步骤条" card>
    <view style="height: 200px">
      <pa-steps :steps="steps" :current="current" direction="vertical" />
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="自定义" card>
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
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

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
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| current | 当前步骤 | number |  0 |
| steps | 每个步骤的配置 | StepItem[] |  () => [] |
| direction | 显示方向 | 'horizontal'\|'vertical' |  'horizontal' |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click-step | (index: number)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| icon | - |
| title | - |
| desc | - |

<!--slot end-->

