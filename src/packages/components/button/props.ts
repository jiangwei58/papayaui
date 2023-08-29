import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const buttonProps = {
  /**
   * 按钮类型
   */
  type: {
    type: String as PropType<'primary' | 'warning' | 'danger' | 'default'>,
    default: 'primary',
  },
  /**
   * 按钮宽度
   */
  width: String,
  /**
   * 按钮高度
   */
  height: String,
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'large' | 'normal' | 'small' | 'mini'>,
    default: 'normal',
  },
  /**
   * 字体大小
   */
  fontSize: String,
  /**
   * 是否为块级元素
   */
  block: Boolean,
  /**
   * 是否显示为加载状态
   */
  loading: Boolean,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 圆角大小, 值为true时半圆角
   */
  round: [Boolean, String],
  /**
   * 是否镂空样式
   */
  plain: Boolean,
  /**
   * 图标
   */
  icon: String,
  /**
   * 文本省略
   */
  ellipsis: Boolean,
  /**
   * 同步点击（主要用于防止异步事件多次触发）
   */
  syncClick: Function as PropType<(...args: any[]) => any | Promise<any>>,
  /**
   * 自定义样式
   */
  customStyle: Object as PropType<CSSProperties>,
  /**
   * 微信开放能力[文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
   */
  openType: String as PropType<
    | 'contact'
    | 'share'
    | 'getPhoneNumber'
    | 'getUserInfo'
    | 'launchApp'
    | 'openSetting'
    | 'feedback'
    | 'chooseAvatar'
    | 'getRealtimePhoneNumber'
    | 'agreePrivacyAuthorization'
  >,
  /**
   * 按住后多久出现点击态，单位毫秒
   */
  hoverStartTime: Number,
  /**
   * 手指松开后点击态保留时间，单位毫秒
   */
  hoverStayTime: Number,
  /**
   * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   */
  appParameter: String,
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   */
  hoverStopPropagation: Boolean,
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
   */
  lang: String as PropType<'zh_CN' | 'zh_TW' | 'en'>,
  /**
   * 会话来源，open-type="contact"时有效
   */
  sessionFrom: String,
  /**
   * 会话内消息卡片标题，open-type="contact"时有效
   */
  sendMessageTitle: String,
  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
   */
  sendMessagePath: String,
  /**
   * 会话内消息卡片图片，open-type="contact"时有效
   */
  sendMessageImg: String,
  /**
   * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
   */
  showMessageCard: Boolean,
}

export const buttonEmits = {
  click: (_value: Event) => true,
  getphonenumber: (_res: any) => true,
  getuserinfo: (_res: any) => true,
  error: (_res: any) => true,
  opensetting: (_res: any) => true,
  launchapp: (_res: any) => true,
  contact: (_res: any) => true,
  chooseavatar: (_res: any) => true,
  getrealtimephonenumber: (_res: any) => true,
  agreeprivacyauthorization: (_res: any) => true,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
