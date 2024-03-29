# Tag

<!--codes start-->

## 基础用法

```html [template]

<pa-cell-group inset>
  <pa-cell title="primary类型">
    <pa-tag>标签</pa-tag>
  </pa-cell>
  <pa-cell title="success类型">
    <pa-tag type="success">标签</pa-tag>
  </pa-cell>
  <pa-cell title="warning类型">
    <pa-tag type="warning">标签</pa-tag>
  </pa-cell>
  <pa-cell title="danger类型">
    <pa-tag type="danger">标签</pa-tag>
  </pa-cell>
</pa-cell-group>

```
## 样式风格

```html [template]

<pa-cell-group inset>
  <pa-cell title="空心样式">
    <pa-tag plain>标签</pa-tag>
  </pa-cell>
  <pa-cell title="圆角样式">
    <pa-tag round>标签</pa-tag>
  </pa-cell>
  <pa-cell title="标记样式">
    <pa-tag mark>标签</pa-tag>
  </pa-cell>
  <pa-cell title="可关闭标签">
    <pa-tag closeable @close="onClose">标签</pa-tag>
  </pa-cell>
</pa-cell-group>

```
```ts [script]

const onClose = () => {
  uni.showToast({
    title: '点击关闭',
    icon: 'none',
  })
}

```
## 自定义颜色

```html [template]

<pa-cell-group inset>
  <pa-cell title="背景颜色">
    <pa-tag color="rgb(114, 50, 221)">标签</pa-tag>
  </pa-cell>
  <pa-cell title="文字颜色">
    <pa-tag color="rgb(255, 225, 225)" text-color="rgb(173, 0, 0)">标签</pa-tag>
  </pa-cell>
  <pa-cell title="空心颜色">
    <pa-tag plain color="rgb(114, 50, 221)" text-color="rgb(114, 50, 221)">标签</pa-tag>
  </pa-cell>
</pa-cell-group>

```

<!--codes end-->

## Tag Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| type | 标签类型 | 'primary'\|'success'\|'warning'\|'danger' |  'primary' |
| color | 标签颜色 | CSSProperties['background-color'] | - |
| plain | 是否为空心样式 | boolean | - |
| round | 圆角大小, 值为true时半圆角 | boolean \| string | - |
| mark | 是否为标记样式 | boolean | - |
| textColor | 文字颜色 | CSSProperties['color'] | - |
| closeable | 是否显示可关闭标签 | boolean | - |

<!--props end-->

## Tag Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| close | ()  |

<!--event end-->

## Tag Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-tag-font-size | 12px |
| --pa-tag-line-height | 16px |
| --pa-tag-height | auto |
| --pa-tag-padding | 0 4px |

<!--cssVar end-->

