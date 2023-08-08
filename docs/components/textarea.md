# Textarea

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-textarea v-model="text" />
  </DocDemoBlock>
  <DocDemoBlock title="显示字数统计">
    <pa-textarea v-model="text2" show-count />
  </DocDemoBlock>
  <DocDemoBlock title="自动增高">
    <pa-textarea auto-height />
  </DocDemoBlock>
  <DocDemoBlock title="只读">
    <pa-textarea model-value="textarea只读状态" readonly />
  </DocDemoBlock>
  <DocDemoBlock title="禁用">
    <pa-textarea model-value="textarea禁用状态" disabled />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const text = ref<string>('')
const text2 = ref<string>('')
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | string | - |
| placeholder | 设置占位提示文字 | string |  '请输入' |
| height | 输入框高度 | string |  '70px' |
| inputAlign | 值对齐方式 |  |  'left' |
| readonly | 是否只读 | boolean | - |
| disabled | 是否禁用 | boolean | - |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | number |  140 |
| autoHeight | 是否自动增高，设置auto-height时，style.height不生效 | boolean |  false |
| showCount | 是否显示统计字数 | boolean | - |
| confirmType | 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 | string | - |
| focus | 是否自动获取焦点 | boolean | - |
| fixed | 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true | boolean | - |
| cursorSpacing | 指定光标与键盘的距离 | number |  0 |
| cursor | 指定focus时的光标位置 | number | - |
| showConfirmBar | 是否显示键盘上方带有”完成“按钮那一栏 | boolean |  true |
| selectionStart | 光标起始位置，自动聚焦时有效，需与selection-end搭配使用 | number |  -1 |
| selectionEnd | 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 | number |  -1 |
| adjustPosition | 键盘弹起时，是否自动上推页面 | boolean |  true |
| disableDefaultPadding | 是否去掉 iOS 下的默认内边距，只微信小程序有效 | boolean | - |
| holdKeyboard | focus时，点击页面的时候不收起键盘，只微信小程序有效 | boolean | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: string)  |
| input | (_value: Event)  |
| focus | (_value: Event)  |
| blur | (_value: Event)  |
| confirm | (_value: Event)  |
| linechange | (_value: Event)  |
| keyboardheightchange | (_value: Event)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

