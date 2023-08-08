# MenuItem

## 示例

<!--codes start-->
<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 菜单项标题 | string |  '' |
| modelValue | 当前选中项对应的 value | MenuItemOptionValue | - |
| options | 选项数组 | MenuItemOption[] |  () => [] |
| disabled | 是否禁用菜单 | boolean | - |
| titleClass | 标题额外类名 | string |  '' |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: MenuItemOptionValue)  |
| change | (value: MenuItemOptionValue)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

