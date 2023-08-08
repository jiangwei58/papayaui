# InputNumber

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock>
    <pa-cell title="基础用法">
      <pa-input-number v-model="input1" />
    </pa-cell>
    <pa-cell title="步长设置">
      <pa-input-number v-model="input2" step="2" />
    </pa-cell>
    <pa-cell title="限制输入范围">
      <pa-input-number v-model="input3" min="2" max="6" />
    </pa-cell>
    <pa-cell title="输入小数">
      <pa-input-number v-model="input4" min="0" step="0.2" :decimal-length="2" />
    </pa-cell>
    <pa-cell title="禁用状态">
      <pa-input-number v-model="input5" disabled />
    </pa-cell>
    <pa-cell title="禁用输入框">
      <pa-input-number v-model="input6" readonly />
    </pa-cell>
    <pa-cell title="异步">
      <pa-input-number :model-value="input7" async-change @change="onChange" />
    </pa-cell>
    <pa-cell title="只显示输入框">
      <pa-input-number v-model="input8" :controls="false" input-width="92px" />
    </pa-cell>
    <pa-cell title="输入样式">
      <pa-input-number
        v-model="input9"
        :controls="false"
        block
        input-align="right"
        plain
        placeholder="请输入"
      />
    </pa-cell>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { sleep } from '../../utils'

const input1 = ref<number>(1)
const input2 = ref<number>(1)
const input3 = ref<number>(1)
const input4 = ref<number>(1)
const input5 = ref<number>(1)
const input6 = ref<number>(1)
const input7 = ref<number>(1)
const input8 = ref<number>(1)
const input9 = ref<number>(1)

const onChange = async (value: number) => {
  uni.showToast({
    icon: 'loading',
    title: '',
    duration: 2000,
  })
  await sleep(2000)
  input7.value = value
  uni.hideToast()
}
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | InputNumberValue | - |
| name | 标识符 | string |  '' |
| placeholder | 输入提示 | string |  '' |
| inputAlign | 内容对齐方式 | 'left'\|'center'\|'right' |  'center' |
| inputWidth | 输入框宽度 | string | - |
| min | 最小值 | InputNumberValue |  1 |
| max | 最大值 | InputNumberValue |  9999 |
| step | 步长 | InputNumberValue |  1 |
| intLength | 整数位长度 | number |  Number.MAX_SAFE_INTEGER.toString().length |
| decimalLength | 小数位长度 | number |  0 |
| readonly | 只读状态禁用输入框操作行为 | boolean | - |
| disabled | 禁用所有功能 | boolean | - |
| controls | 是否显示控制按钮 | boolean |  true |
| asyncChange | 是否开启异步变更，开启后需要手动控制输入值 | boolean | - |
| block | 是否为块级元素 | boolean | - |
| plain | 朴素样式 | boolean | - |
| nullable | 是否允许空值 | boolean | - |
| nullValue | 空值时返回的值 | any |  null |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: number, _name?: string)  |
| change | (value: number, _name?: string)  |
| focus | (value: EventDetail\<{ value: InputNumberValue; height: number }\>)  |
| blur | (value: EventDetail\<{ value: InputNumberValue; cursor: number }\>)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

