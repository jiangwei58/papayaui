# CheckboxGroup

## 示例

<!--codes start-->
<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识符 | string |  '' |
| modelValue | 值 | CheckboxValue[] | - |
| direction | 方向 | 'horizontal'\|'vertical' |  'vertical' |
| disabled | 是否全部禁用 | boolean | - |
| max | 限制选择的数量 | number | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: CheckboxValue[])  |
| change | (value: CheckboxValue[], name: string)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

