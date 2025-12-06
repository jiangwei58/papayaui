# IndexBar

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <pa-index-bar>
    <view v-for="index in indexes.length" :key="index">
      <pa-index-anchor :index="indexes[index - 1]" />
      <pa-cell v-for="cellIndex in 12" :key="cellIndex" title="文本" />
    </view>
  </pa-index-bar>
</template>
```
```ts [script]
<script setup lang="ts">
const indexes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
</script>
```

<!--codes end-->

## IndexBar Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| indexList | 索引字符列表 | (string\|number)[] |  () => [] |
| zIndex | z-index 层级 | number |  1 |
| sticky | 是否开启锚点自动吸顶 | boolean |  true |
| stickyOffsetTop | 锚点自动吸顶时与顶部的距离 | number |  0 |

## IndexAnchor Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| index | 索引字符 | string \| number |  '' |

<!--props end-->

## IndexBar Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


## IndexAnchor Event

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## IndexBar Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## IndexAnchor Slot

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-index-bar-index-font-size | 10px |
| --pa-index-bar-index-font-weight | 500 |
| --pa-index-bar-index-line-height | 16px |
| --pa-index-bar-sidebar-z-index | 2 |

<!--cssVar end-->

