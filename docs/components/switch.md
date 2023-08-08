# Switch

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-switch v-model="checked" />
  </DocDemoBlock>
  <DocDemoBlock title="禁用状态" card>
    <pa-switch v-model="checked" disabled />
  </DocDemoBlock>
  <DocDemoBlock title="加载状态" card>
    <pa-switch v-model="checked" loading />
  </DocDemoBlock>
  <DocDemoBlock title="自定义大小" card>
    <pa-switch v-model="checked" size="18px" />
  </DocDemoBlock>
  <DocDemoBlock title="异步控制" card>
    <pa-switch :model-value="checked" :loading="loading" @change="onChange" />
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色" card>
    <pa-switch v-model="checked" active-color="#ee0a24" inactive-color="#aaa" />
  </DocDemoBlock>
  <DocDemoBlock title="自定义值" card>
    <pa-switch v-model="customChecked" active-value="开" inactive-value="关" />
    <text class="ml-40">{{ customChecked }}</text>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { SwitchValue } from '../../core'

const checked = ref<boolean>(true)
const loading = ref<boolean>(false)

const onChange = (value: SwitchValue) => {
  loading.value = true
  setTimeout(() => {
    checked.value = value as boolean
    loading.value = false
  }, 2000)
}

const customChecked = ref<string>('开')
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 开关状态 | SwitchValue |  false |
| activeValue | 打开时组件的值 | SwitchValue |  true |
| inactiveValue | 关闭组件的值 | SwitchValue |  false |
| activeColor | 打开时的背景颜色 | CSSProperties['background-color'] | - |
| inactiveColor | 关闭时的背景颜色 | CSSProperties['background-color'] | - |
| loading | 禁用状态 | boolean | - |
| disabled | 加载状态 | boolean | - |
| size | 开关尺寸 | string | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (_value: SwitchValue)  |
| change | (_value: SwitchValue)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

