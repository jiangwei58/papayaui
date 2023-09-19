# Field

::: warning
此组件停止维护, 推荐使用 `Input` 和 `Textarea` 组件代替
:::

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-field v-model="value" title="输入框" clearable />
    <pa-field title="文本域" type="textarea" />
  </DocDemoBlock>
  <DocDemoBlock title="仅显示输入框">
    <pa-field only-input />
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const value = ref<string>()
</script>
```

<!--codes end-->

## Field Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | string |  '' |
| type | 输入框类型 | 'text'\|'number'\|'idcard'\|'textarea'\|'digit' |  'text' |
| placeholder | 输入提示 | string |  '请输入' |
| disabled | 是否禁用 | boolean | - |
| readonly | 是否只读 | boolean | - |
| clearable | 是否显示清除控件 | boolean | - |
| onlyInput | 是否只用输入框（主要用于表单情况） | boolean | - |
| autoHeight | 自动高度（textarea生效） | boolean | - |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | number |  -1 |
| focus | 获取焦点 | boolean | - |
| confirmType | 设置键盘右下角按钮的文字，仅在 type="text" 时生效 | string | - |
| confirmHold | 点击键盘右下角按钮时是否保持键盘不收起 | boolean | - |
| cursor | 指定focus时的光标位置 | number | - |
| selectionStart | 光标起始位置，自动聚集时有效，需与selection-end搭配使用 | number | - |
| selectionEnd | 光标结束位置，自动聚集时有效，需与selection-start搭配使用 | number | - |
| adjustPosition | 键盘弹起时，是否自动上推页面 | boolean |  true |
| alwaysEmbed | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) | boolean | - |
| holdKeyboard | focus时，点击页面的时候不收起键盘 | boolean | - |
| height | 高度（textarea生效） | string |  '75px' |
| title | 标题 | string | - |
| titleWidth | 标题宽度 | string | - |
| required | 是否显示必填标识 | boolean | - |
| center | 内容居中 | boolean | - |
| icon | 前面的图标 | string | - |
| valueAlign | 内容对齐方式 | 'left'\|'center'\|'right' |  'right' |
| errorMessage | 错误信息 | string | - |

<!--props end-->

## Field Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: string)  |
| input | (value: string)  |
| blur | (value: FocusEvent)  |
| confirm | (value: EventDetail\<{ value: string }\>)  |
| clear | ()  |
| click-input | (value: Event)  |

<!--event end-->

## Field Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

