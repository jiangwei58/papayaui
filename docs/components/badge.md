# Badge

<!--codes start-->

## 基础用法

```html [template]

<view class="demo-badge">
  <pa-badge content="5">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="10">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="new">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge dot>
    <view class="demo-badge-block"></view>
  </pa-badge>
</view>

```
## 最大值

```html [template]

<view class="demo-badge">
  <pa-badge content="999" :max="9">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="999" :max="20">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="999" :max="99">
    <view class="demo-badge-block"></view>
  </pa-badge>
</view>

```
## 自定义颜色

```html [template]

<view class="demo-badge">
  <pa-badge content="5" color="#1989fa">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="10" color="#1989fa">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="new" color="#1989fa">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="new" color="#1989fa" dot>
    <view class="demo-badge-block"></view>
  </pa-badge>
</view>

```
## 自定义内容

```html [template]

<view class="demo-badge">
  <pa-badge>
    <view class="demo-badge-block"></view>
    <template #content>
      <pa-icon name="success" color="#fff" />
    </template>
  </pa-badge>
  <pa-badge>
    <view class="demo-badge-block"></view>
    <template #content>
      <pa-icon name="favor" color="#fff" />
    </template>
  </pa-badge>
</view>

```
## 自定义位置

```html [template]

<view class="demo-badge">
  <pa-badge content="99" :offset="[-10, -10]">
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="99" :offset="[80, 0]">
    <view class="demo-badge-block"></view>
  </pa-badge>
</view>

```
## 边框

```html [template]

<view class="demo-badge">
  <pa-badge content="6" border>
    <view class="demo-badge-block"></view>
  </pa-badge>
  <pa-badge content="99" border border-color="#000">
    <view class="demo-badge-block"></view>
  </pa-badge>
</view>

```
## 独立展示

```html [template]

<view class="demo-badge">
  <pa-badge content="9" />
  <pa-badge content="99" />
</view>

```

<!--codes end-->

## Badge Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| content | 徽标内容 | number \| string | - |
| color | 徽标背景颜色 | CSSProperties['color'] |  `var(--pa-color-danger)` |
| dot | 是否展示为小点 | boolean | - |
| max | max 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效 | number | - |
| offset | 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为rpx | Array\<number\|string\> |  () => [0, 0] |
| showZero | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标 | boolean | - |
| show | 是否显示 | boolean |  true |
| border | 是否显示边框 | boolean | - |
| borderColor | 边框颜色 | CSSProperties['color'] | - |

<!--props end-->

## Badge Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Badge Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| content | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-badge-font-size | 11px |
| --pa-badge-font-size | 11px |
| --pa-badge-padding | 2px 5px |
| --pa-badge-color | var(--pa-color-danger) |
| --pa-badge-border-width | 1px |
| --pa-badge-border-color | #fff |

<!--cssVar end-->

