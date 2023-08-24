# NoticeBar

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-notice-bar left-icon="notification" text="落霞与孤鹜齐飞，秋水共长天一色" />
  </DocDemoBlock>

  <DocDemoBlock title="滚动播放">
    <pa-notice-bar text="在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。" />
  </DocDemoBlock>

  <DocDemoBlock title="多行展示">
    <pa-notice-bar
      text="远上寒山石径斜，白云深处有人家。停车坐爱枫林晚，霜叶红于二月花。"
      wrapable
    />
  </DocDemoBlock>

  <DocDemoBlock title="通知栏模式">
    <pa-notice-bar text="曾经沧海难为水，除却巫山不是云。" mode="link" />
  </DocDemoBlock>

  <DocDemoBlock title="可关闭">
    <pa-notice-bar text="夜合花开香满庭，夜深微雨醉初醒。" mode="closeable" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义样式">
    <pa-notice-bar
      left-icon="message"
      text="落絮无声春堕泪，行云有影月含羞。"
      color="#1989fa"
      background="#ecf9ff"
    />
  </DocDemoBlock>
</template>
```
```ts [script]
<script setup lang="ts">
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>
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

