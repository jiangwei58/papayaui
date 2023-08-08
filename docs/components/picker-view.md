# PickerView

## 示例

<!--codes start-->
<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 选中项下标列表 | number[] |  () => [] |
| columns | 多列的选项列表 | PickerViewColumnItem[] |  () => [] |
| showToolbar | 是否显示头部操作栏 | boolean |  true |
| title | 标题 | string |  '' |
| height | 弹窗高度 | string |  '50vh' |
| valueKey | 值对应的key | string |  'text' |
| defaultIndex | 默认选中项下标 | number |  0 |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: number[])  |
| change | (value: number[])  |
| confirm | (value: number[])  |
| cancel | ()  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

