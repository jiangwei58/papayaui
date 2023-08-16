# Section

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-section title="标题栏" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义右侧">
    <pa-section title="标题栏">
      <text style="color: red">右侧内容</text>
    </pa-section>
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题">
    <pa-section title="标题栏">
      <template #title>
        <text style="color: red">自定义标题</text>
      </template>
    </pa-section>
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>
```

<!--codes end-->

## Section Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 标题 | string |  '' |
| bgColor | 背景色 | CSSProperties['background-color'] | - |

<!--props end-->

## Section Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (value: Event)  |

<!--event end-->

## Section Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| title | - |
| default | - |

<!--slot end-->

