# Button

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <view class="demo-button">
    <DocDemoBlock title="基础用法" card>
      <pa-button type="primary">主要按钮</pa-button>
      <pa-button type="warning">警告按钮</pa-button>
      <pa-button type="danger">危险按钮</pa-button>
      <pa-button type="default">默认按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="禁用状态" card>
      <pa-button type="primary" disabled>禁用状态</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="自定义大小" card>
      <pa-button type="primary" width="300" height="80">按钮</pa-button>
      <pa-button type="primary" width="200" height="60">按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="圆角" card>
      <pa-button type="primary" round>圆角按钮</pa-button>
      <pa-button type="primary" round="20">圆角按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="镂空按钮" card>
      <pa-button type="primary" plain>镂空按钮</pa-button>
      <pa-button type="warning" plain>镂空按钮</pa-button>
      <pa-button type="danger" plain>镂空按钮</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="加载状态" card>
      <pa-button type="primary" loading>加载状态</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="图标" card>
      <pa-button type="primary" icon="edit">图标按钮</pa-button>
      <pa-button type="primary" icon="edit"></pa-button>
      <pa-button type="primary" icon="edit" width="42px" height="42px" round></pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="块级元素" card>
      <pa-button type="primary" block>块级元素</pa-button>
    </DocDemoBlock>

    <DocDemoBlock title="点击加载（等待promise）" card>
      <pa-button type="primary" :sync-click="onClick">点击加载</pa-button>
    </DocDemoBlock>
  </view>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const onClick = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| type | 按钮类型 | 'primary'\|'warning'\|'danger'\|'default' |  'primary' |
| width | 按钮宽度 | string | - |
| height | 按钮高度 | string | - |
| size | 尺寸 | 'large'\|'normal'\|'small'\|'mini' |  'normal' |
| fontSize | 字体大小 | string | - |
| block | 是否为块级元素 | boolean | - |
| loading | 是否显示为加载状态 | boolean | - |
| disabled | 是否禁用 | boolean | - |
| round | 圆角大小, 值为true时半圆角 | boolean \| string | - |
| plain | 是否镂空样式 | boolean | - |
| icon | 图标 | string | - |
| syncClick | 同步点击（主要用于防止异步事件多次触发） | (...args:any[])=\>any\|Promise\<any\> | - |
| customStyle | 自定义样式 | CSSProperties | - |
| openType | 微信开放能力[文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | \|'contact'\|'share'\|'getPhoneNumber'\|'getUserInfo'\|'launchApp'\|'openSetting'\|'feedback'\|'chooseAvatar' | - |
| hoverStartTime | 按住后多久出现点击态，单位毫秒 | number | - |
| hoverStayTime | 手指松开后点击态保留时间，单位毫秒 | number | - |
| appParameter | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | string | - |
| hoverStopPropagation | 指定是否阻止本节点的祖先节点出现点击态 | boolean | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 | 'zh_CN'\|'zh_TW'\|'en' | - |
| sessionFrom | 会话来源，open-type="contact"时有效 | string | - |
| sendMessageTitle | 会话内消息卡片标题，open-type="contact"时有效 | string | - |
| sendMessagePath | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | string | - |
| sendMessageImg | 会话内消息卡片图片，open-type="contact"时有效 | string | - |
| showMessageCard | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (_value: Event)  |
| getphonenumber | (_res: any)  |
| getuserinfo | (_res: any)  |
| error | (_res: any)  |
| opensetting | (_res: any)  |
| launchapp | (_res: any)  |
| contact | (_res: any)  |
| chooseavatar | (_res: any)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

