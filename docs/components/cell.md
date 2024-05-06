# Cell

<!--codes start-->

## 基础用法

```html [template]

<pa-cell title="单元格" value="内容" />
<pa-cell title="单元格" label="描述信息" value="内容" />

```
## 卡片风格

```html [template]

<pa-cell-group inset>
  <pa-cell title="单元格" value="内容" />
  <pa-cell title="单元格" label="描述信息" value="内容" />
</pa-cell-group>

```
## 展示箭头

```html [template]

<pa-cell title="单元格" value="内容" is-link />

```
## 后缀

```html [template]

<pa-cell title="单元格" value="内容" suffix="%" />

```
## 图标

```html [template]

<pa-cell title="单元格" value="内容" icon="search" />

```
## 插槽

```html [template]

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

```
## 居中

```html [template]

<pa-cell
  title="单元格"
  value="内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
  center
/>
<pa-cell title="单元格" label="描述信息" value="内容" center />

```

<!--codes end-->

## Cell Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 标题 | string | - |
| value | 内容 | string \| number \| boolean |  '' |
| label | 标题下方的描述信息 | string | - |
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

## CellGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| inset | 是否展示为圆角卡片风格 | boolean | - |

<!--props end-->

## Cell Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (value: MouseEvent)  |

## CellGroup Event

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Cell Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| title | - |

## CellGroup Slot

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-cell-padding-y | 10px |
| --pa-cell-padding-x | 16px |
| --pa-cell-bg-color | #fff |
| --pa-cell-color | var(--pa-color-black-3) |
| --pa-cell-font-size | 14px |
| --pa-cell-line-height | 24px |
| --pa-cell-title-flex | 1 |
| --pa-cell-value-flex | 1 |
| --pa-cell-title-color | var(--pa-color-black) |
| --pa-cell-icon-left-margin-left | 4px |
| --pa-cell-label-color | var(--pa-color-black-3) |
| --pa-cell-label-font-size | 12px |
| --pa-cell-label-line-height | 18px |
| --pa-cell-value-text-align | right |
| --pa-cell-suffix-margin-left | 5rpx |
| --pa-cell-suffix-color | inherit |
| --pa-cell-icon-right-margin-left | 4px |
| --pa-cell-icon-right-rotate | 0 |
| --pa-cell-icon-size | 16px |
| --pa-cell-value-color | var(--pa-color-primary) |
| --pa-cell-padding-x | 16px |
| --pa-cell-padding-x | 16px |

<!--cssVar end-->

