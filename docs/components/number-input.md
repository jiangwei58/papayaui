# NumberInput

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell title="单元格">
      <pa-number-input v-model="input1" placeholder="请输入" align="right" />
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="最大最小值">
    <pa-cell title="单元格">
      <pa-number-input v-model="input2" placeholder="请输入" align="right" :min="5" :max="999" />
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="整数小数位长度限制">
    <pa-cell title="单元格">
      <pa-number-input
        v-model="input3"
        placeholder="请输入"
        align="right"
        :int-length="5"
        :precision="2"
      />
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="禁用">
    <pa-cell title="单元格">
      <pa-number-input model-value="9999" placeholder="请输入" align="right" disabled />
    </pa-cell>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const input1 = ref<string>()
const input2 = ref<string>()
const input3 = ref<string>()
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 输入框值 | string \| number |  '' |
| disabled | 是否禁用 | boolean | - |
| placeholder | 输入提示 | string |  '请输入' |
| align | 内容对齐方式 | 'left'\|'center'\|'right' |  'right' |
| min | 最小值 | number | - |
| max | 最大值 | number | - |
| intLength | 整数位长度 | number |  Number.MAX_SAFE_INTEGER.toString().length |
| precision | 小数位长度 | number | - |
| focus | 获取焦点 | boolean | - |
| autoBlur | 键盘收起时，是否自动失去焦点 | boolean | - |
| adjustPosition | 键盘弹起时，是否自动上推页面 | boolean |  true |
| customStyle | 定义需要用到的外部样式 | CSSProperties | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: string)  |
| focus | (value: EventDetail\<{ value: NumberInputProps['modelValue']; height: number }\>)  |
| blur | (value: EventDetail\<{ value: NumberInputProps['modelValue']; cursor: number }\>)  |
| confirm | (value: EventDetail\<{ value: NumberInputProps['modelValue'] }\>)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

