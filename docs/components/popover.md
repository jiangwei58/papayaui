# Popover

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-popover class="inline-flex">
      <pa-button>基础用法</pa-button>
      <template #popover-content>
        <view class="p-20">
          <text class="text-32">标题</text>
          <text class="text-28 block">这是一段内容,这是一段内容,这是一段内容,这是一段内容。</text>
        </view>
      </template>
    </pa-popover>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| text | 内容 | string |  '' |
| width | 浮窗宽度 | string \| number |  '300' |
| zIndex | 浮窗层级 | number |  9 |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| popover-content | - |

<!--slot end-->
