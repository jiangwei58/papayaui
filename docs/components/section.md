# Section

<!--codes start-->

## 基础用法

```html [template]

<pa-section title="标题栏" />

```
## 自定义右侧

```html [template]

<pa-section title="标题栏">
  <text class="color-danger">右侧内容</text>
</pa-section>

```
## 自定义标题

```html [template]

<pa-section title="标题栏">
  <template #title>
    <text class="color-danger">自定义标题</text>
  </template>
</pa-section>

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

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-section-padding | 12px 10px |
| --pa-section-bg-color | transparent |
| --pa-section-line-color | var(--pa-color-primary) |
| --pa-section-font-size | 14px |
| --pa-section-color | var(--pa-color-black) |

<!--cssVar end-->

