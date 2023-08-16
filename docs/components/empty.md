# Empty

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-empty description="描述文字" />
  </DocDemoBlock>
  <DocDemoBlock title="图片类型">
    <pa-empty image="error" description="描述文字" />
    <pa-empty image="search" description="描述文字" />
  </DocDemoBlock>
  <DocDemoBlock title="底部内容">
    <pa-empty description="描述文字">
      <pa-button class="mt-40" width="160px" round>按钮</pa-button>
    </pa-empty>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>
```

<!--codes end-->

## Empty Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| image | 图片类型, 支持图片url | 'default'\|'error'\|'search'\|string |  'default' |
| description | 图片下方的描述文字 | string |  '' |

<!--props end-->

## Empty Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Empty Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| image | - |
| description | - |
| default | - |

<!--slot end-->

