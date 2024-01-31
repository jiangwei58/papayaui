# Button

<!--codes start-->

## 基础用法

```html [template]

<pa-button type="primary">主要按钮</pa-button>
<pa-button type="warning">警告按钮</pa-button>
<pa-button type="danger">危险按钮</pa-button>
<pa-button type="default">默认按钮</pa-button>

```
## 镂空按钮

```html [template]

<pa-button type="primary" plain>镂空按钮</pa-button>
<pa-button type="warning" plain>镂空按钮</pa-button>
<pa-button type="danger" plain>镂空按钮</pa-button>

```
## 禁用状态

```html [template]

<pa-button type="primary" disabled>禁用状态</pa-button>

```
## 尺寸

```html [template]

<pa-button type="primary" size="large">大号按钮</pa-button>
<pa-button type="primary" size="normal">普通按钮</pa-button>
<pa-button type="primary" size="small">小型按钮</pa-button>
<pa-button type="primary" size="mini">迷你按钮</pa-button>

```
## 自定义大小

```html [template]

<pa-button type="primary" width="300" height="80">按钮</pa-button>
<pa-button type="primary" width="200" height="60">按钮</pa-button>

```
## 圆角

```html [template]

<pa-button type="primary" round>圆角按钮</pa-button>
<pa-button type="primary" round="20">圆角按钮</pa-button>

```
## 加载状态

```html [template]

<pa-button type="primary" loading>加载状态</pa-button>

```
## 图标

```html [template]

<pa-button type="primary" icon="write">图标按钮</pa-button>
<pa-button type="primary" icon="write"></pa-button>
<pa-button type="primary" icon="write" width="42px" height="42px" round></pa-button>

```
## 块级元素

```html [template]

<pa-button type="primary" block>块级元素</pa-button>

```
## 点击加载（等待promise）

```html [template]

<pa-button type="primary" :sync-click="onClick">点击加载</pa-button>

```
```ts [script]

const onClick = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

```

<!--codes end-->

## Button Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| buttonId | 标识符，作为原生button组件的id值 | string | - |
| type | 按钮类型 | 'primary'\|'warning'\|'danger'\|'default' |  'primary' |
| width | 按钮宽度 | string | - |
| height | 按钮高度 | string | - |
| size | 尺寸 | 'large'\|'normal'\|'small'\|'mini' |  'normal' |
| fontSize | 字体大小 | string | - |
| block | 是否为块级元素 | boolean | - |
| loading | 是否显示为加载状态 | boolean | - |
| loadingText | 加载状态提示文字 | string | - |
| disabled | 是否禁用 | boolean | - |
| round | 圆角大小, 值为true时半圆角 | boolean \| string | - |
| plain | 是否镂空样式 | boolean | - |
| icon | 图标 | string | - |
| ellipsis | 文本省略 | boolean | - |
| syncClick | 同步点击（主要用于防止异步事件多次触发） | (...args:any[])=\>any\|Promise\<any\> | - |
| customStyle | 自定义样式 | CSSProperties | - |
| openType | 微信开放能力[文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | 'contact'\|'share'\|'getPhoneNumber'\|'getUserInfo'<br/>\|'launchApp'\|'openSetting'\|'feedback'\|'chooseAvatar'<br/>\|'getRealtimePhoneNumber'\|'agreePrivacyAuthorization' | - |
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

## Button Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (value: Event)  |
| getphonenumber | (res: any)  |
| getuserinfo | (res: any)  |
| error | (res: any)  |
| opensetting | (res: any)  |
| launchapp | (res: any)  |
| contact | (res: any)  |
| chooseavatar | (res: any)  |
| getrealtimephonenumber | (res: any)  |
| agreeprivacyauthorization | (res: any)  |

<!--event end-->

## Button Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-button-height | 44px |
| --pa-button-line-height | 1.2 |
| --pa-button-margin | 0 |
| --pa-button-border-width | 1px |
| --pa-button-border-color | transparent |
| --pa-button-border-radius | 5px |
| --pa-button-color | var(--pa-color-black) |
| --pa-button-background | #fff |
| --pa-button-border-color | #ebedf0 |
| --pa-button-primary-color | #fff |
| --pa-button-primary-background | var(--pa-color-primary) |
| --pa-button-primary-border-color | var(--pa-color-primary) |
| --pa-button-warning-color | #fff |
| --pa-button-warning-background | var(--pa-color-warning) |
| --pa-button-warning-border-color | var(--pa-color-warning) |
| --pa-button-danger-color | #fff |
| --pa-button-danger-background | var(--pa-color-danger) |
| --pa-button-danger-border-color | var(--pa-color-danger) |
| --pa-button-large-height | 50px |
| --pa-button-large-font-size | 16px |
| --pa-button-font-size | 14px |
| --pa-button-padding | 0 15px |
| --pa-button-small-height | 32px |
| --pa-button-small-font-size | 12px |
| --pa-button-padding | 0 8px |
| --pa-button-mini-height | 24px |
| --pa-button-mini-font-size | 10px |
| --pa-button-padding | 0 4px |
| --pa-button-disabled-background | #c8c9cc |
| --pa-button-disabled-border-color | #c8c9cc |

<!--cssVar end-->

