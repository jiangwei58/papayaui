# Search

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-search v-model="text" />
  </DocDemoBlock>
  <DocDemoBlock title="圆角">
    <pa-search v-model="text" shape="round" />
  </DocDemoBlock>
  <DocDemoBlock title="前后插槽">
    <pa-search v-model="text">
      <template #before>
        <text class="pr-12">前部</text>
      </template>
      <template #after>
        <text class="pl-12">搜索</text>
      </template>
    </pa-search>
  </DocDemoBlock>
  <DocDemoBlock title="前后缀插槽">
    <pa-search v-model="text">
      <template #prefix>
        <text class="p-12">地址</text>
      </template>
      <template #suffix>
        <text class="p-12">后缀</text>
      </template>
    </pa-search>
  </DocDemoBlock>
  <DocDemoBlock title="搜索框内容对齐">
    <pa-search v-model="text" input-align="center" />
  </DocDemoBlock>
  <DocDemoBlock title="只读搜索框">
    <pa-search v-model="text" readonly @click-input="onClick" />
  </DocDemoBlock>
  <DocDemoBlock title="禁用搜索框">
    <pa-search v-model="text" disabled @click-input="onClick" />
  </DocDemoBlock>
  <DocDemoBlock title="背景色">
    <pa-search v-model="text" background="var(--pa-color-primary)" input-background="#fff" />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const text = ref<string>('')

const onClick = () => {
  uni.showToast({
    icon: 'none',
    title: '点击输入框',
  })
}
</script>
```

<!--codes end-->

## Search Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | string | - |
| shape | 搜索框形状 | 'square'\|'round' |  'square' |
| placeholder | 输入提示 |  |  '请输入搜索关键词' |
| clearable | 是否显示清除控件 |  |  true |
| inputAlign | 输入内容对齐方式 | 'left'\|'center'\|'right' |  'left' |
| background | 搜索框背景色 | CSSProperties['background-color'] | - |
| inputBackground | 搜索框内部背景色 | CSSProperties['background-color'] | - |

<!--props end-->

## Search Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: string)  |
| change | (value: string)  |
| confirm | (value: EventDetail\<{ value: string }\>)  |
| clear | ()  |
| click-input | ()  |

<!--event end-->

## Search Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| before | - |
| prefix | - |
| suffix | - |
| after | - |

<!--slot end-->

