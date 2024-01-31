# NoticeBar

<!--codes start-->

## 基础用法

```html [template]

<pa-notice-bar left-icon="notification" text="落霞与孤鹜齐飞，秋水共长天一色" />

```
## 滚动播放

```html [template]

<pa-notice-bar text="在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。" />

```
## 多行展示

```html [template]

<pa-notice-bar text="远上寒山石径斜，白云深处有人家。停车坐爱枫林晚，霜叶红于二月花。" wrapable />

```
## 通知栏模式

```html [template]

<pa-notice-bar text="曾经沧海难为水，除却巫山不是云。" mode="link" />

```
## 可关闭

```html [template]

<pa-notice-bar text="夜合花开香满庭，夜深微雨醉初醒。" mode="closeable" />

```
## 自定义样式

```html [template]

<pa-notice-bar
  left-icon="message"
  text="落絮无声春堕泪，行云有影月含羞。"
  color="#1989fa"
  background="#ecf9ff"
/>

```

<!--codes end-->

## NoticeBar Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| mode | 通知栏模式 | 'closeable'\|'link' | - |
| text | 通知文本内容 | string |  '' |
| color | 通知文本颜色 | string | - |
| background | 滚动条背景 | string | - |
| leftIcon | 左侧图标名称或图片链接 | string | - |
| delay | 动画延迟时间 (ms) | number |  1 |
| speed | 滚动速率 (px/s) | number |  60 |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启 | boolean |  undefined |
| wrapable | 是否开启文本换行，只在禁用滚动时生效 | boolean |  false |

<!--props end-->

## NoticeBar Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (event: Event)  |
| close | ()  |

<!--event end-->

## NoticeBar Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| left-icon" :class="ns.e('left-icon') | - |
| default | - |
| right-icon | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-notice-bar-height | 40px |
| --pa-notice-bar-padding | 0 16px |
| --pa-notice-bar-color | #ed6a0c |
| --pa-notice-bar-font-size | 14px |
| --pa-notice-bar-line-height | 24px |
| --pa-notice-bar-background | #fffbe8 |
| --pa-notice-bar-icon-size | 16px |
| --pa-notice-bar-wrapable-padding | 8px 16px |

<!--cssVar end-->

