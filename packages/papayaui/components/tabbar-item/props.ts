import type { ExtractPropTypes, PropType } from 'vue'
import { badgeProps } from '../badge'
import { iconProps } from '../icon'

export const tabbarItemProps = {
  /**
   * 标签名称，作为匹配的标识符
   */
  name: [String, Number],
  /**
   * 标签标题
   */
  text: String,
  /**
   * 图标名称，可选值见 Icon 组件
   */
  icon: iconProps.name,
  /**
   * 图标类名前缀，同 Icon 组件的 class-prefix 属性
   */
  iconPrefix: iconProps.classPrefix,
  /**
   * 是否显示小红点
   */
  dot: badgeProps.dot,
  /**
   * 图标右上角提示信息
   */
  info: badgeProps.content,
  /**
   * 点击后跳转的链接地址, 需要以 / 开头
   */
  url: String,
  /**
   * 链接跳转类型，可选值为 redirectTo、switchTab、reLaunch
   */
  linkType: {
    type: String as PropType<'redirectTo' | 'switchTab' | 'reLaunch'>,
    default: 'switchTab',
  },
}

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
