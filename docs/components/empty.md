# Empty

<!--codes start-->

## 基础用法

```html [template]

<pa-empty description="描述文字" />

```
## 图片类型

```html [template]

<pa-empty image="error" description="描述文字" />
<pa-empty image="search" description="描述文字" />

```
## 底部内容

```html [template]

<pa-empty description="描述文字">
  <pa-button class="mt-40" width="160px" round>按钮</pa-button>
</pa-empty>

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

