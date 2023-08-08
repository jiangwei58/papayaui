# Tabs

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-tabs v-model="tabActive" :tabs="getData(3)" />
  </DocDemoBlock>

  <DocDemoBlock title="多个滚动">
    <pa-tabs v-model="tabActive2" :tabs="getData(10)" scrollable />
  </DocDemoBlock>

  <DocDemoBlock title="自定义索引值">
    <pa-tabs v-model="tabActive3" :tabs="getData(3)" value-key="name" />
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

interface TabItem {
  label: string
  value: number
}

const getData = (count: number) => {
  return new Array(count).fill(0).map<TabItem>((_item, index) => {
    return {
      label: `标签${index}`,
      value: index,
      name: index,
    }
  })
}

const tabActive = ref<number>(0)
const tabActive2 = ref<number>(0)
const tabActive3 = ref<number>(0)
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | TabItemValue |  0 |
| tabs | 标签页列表数据 | TabItem[] |  () => [] |
| labelKey | 标题对应字段名 | string |  'label' |
| valueKey | 值对应字段名 | string | - |
| scrollable | 是否滚动 | boolean | - |
| shrink | 是否开启左侧收缩布局 | boolean | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (current: TabItemValue)  |
| change | (item: TabItem)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

