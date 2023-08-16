# CheckboxButtons

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-checkbox-btns v-model="selectedValue1" :options="getData(6)" />
  </DocDemoBlock>

  <DocDemoBlock title="多选" card>
    <pa-checkbox-btns v-model="selectedValue2" :options="getData(6)" multiple />
  </DocDemoBlock>

  <DocDemoBlock title="自定义布局" card>
    <pa-checkbox-btns v-model="selectedValue3" :options="getData(8)" :column="4" gap="10" round />
  </DocDemoBlock>

  <DocDemoBlock title="自定义内容" card>
    <pa-checkbox-btns v-model="selectedValue4" :options="getData(8)">
      <template #default="{ item, index }">
        <pa-icon :name="index % 2 === 0 ? 'success' : 'close'" />
        <text>{{ item.label }}</text>
      </template>
    </pa-checkbox-btns>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

interface Option {
  label: string
  value: number
}

const selectedValue1 = ref<Option['value']>()
const selectedValue2 = ref<Option['value'][]>([])
const selectedValue3 = ref<Option['value']>()
const selectedValue4 = ref<Option['value']>()

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}
</script>
```

<!--codes end-->

## CheckboxButtons Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| column | 列数 | number |  3 |
| gap | 间隔 | string \| number |  20 |
| modelValue | 选中值 | CheckboxButtonValue\|CheckboxButtonValue[] | - |
| options | 选项列表 | CheckboxItem[] |  () => [] |
| labelKey | 标题对应字段名 | string |  'label' |
| valueKey | 内容对应字段名 | string |  'value' |
| multiple | 是否多选 | boolean |  false |
| bgColor | 背景色 | string |  '#F2F3F5' |
| round | 圆角大小, 值为true时半圆角 | boolean \| string |  '4rpx' |
| inverse | 是否支持反选 | boolean |  true |

<!--props end-->

## CheckboxButtons Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: CheckboxButtonValue \| CheckboxButtonValue[])  |
| change | (item: CheckboxItem \| CheckboxItem[], index: number)  |

<!--event end-->

## CheckboxButtons Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

