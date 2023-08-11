# Cell

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell title="单元格" value="内容" />
  </DocDemoBlock>

  <DocDemoBlock title="卡片风格">
    <pa-cell-group inset>
      <pa-cell title="单元格" value="内容" />
      <pa-cell title="单元格" value="内容" />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="展示箭头">
    <pa-cell title="单元格" value="内容" is-link />
  </DocDemoBlock>

  <DocDemoBlock title="后缀">
    <pa-cell title="单元格" value="内容" suffix="%" />
  </DocDemoBlock>

  <DocDemoBlock title="图标">
    <pa-cell title="单元格" value="内容" icon="search" />
  </DocDemoBlock>

  <DocDemoBlock title="插槽">
    <pa-cell value="内容">
      <template #title>
        <text>标题</text>
        <text style="color: red">插槽</text>
      </template>
    </pa-cell>
    <pa-cell title="单元格">
      <text>内容</text>
      <text style="color: red">插槽</text>
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="居中">
    <pa-cell
      title="单元格"
      value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
      center
    />
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

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 标题 | string | - |
| value | 内容 | string \| number \| boolean |  '' |
| titleWidth | 标题宽度 | string | - |
| clickable | 是否开启点击反馈 | boolean | - |
| selectable | 内容是否可选中 | boolean | - |
| isLink | 是否显示箭头，为true同时有点击反馈 | boolean | - |
| required | 是否显示必填标识 | boolean | - |
| center | 内容居中 | boolean | - |
| icon | 前面的图标 | string | - |
| valueAlign | 内容对齐方式 | 'left'\|'center'\|'right' |  'right' |
| errorMessage | 错误信息 | string | - |
| border | 是否显示下边框 | boolean |  true |
| suffix | 后缀内容 | string | - |
| customClass | 根节点样式类 | string | - |
| titleClass | 标题样式类 | string | - |
| valueClass | 右侧内容样式类 | string | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (_value: MouseEvent)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| title | - |
| default | - |
| right-icon | - |

<!--slot end-->
