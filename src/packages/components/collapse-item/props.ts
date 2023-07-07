import type { ExtractPropTypes, PropType } from 'vue'

export const collapseItemProps = {
  /**
   * 唯一标识符，默认为索引值
   */
  name: [String, Number] as PropType<CollapseItemValue>,
  /**
   * 标题栏左侧内容
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 标题栏左侧图标名称或图片链接，可选值见 Icon 组件
   */
  icon: {
    type: String,
    default: 'right-icon',
  },
  /**
   * 标题栏右侧内容
   */
  value: String,
  /**
   * 是否显示内边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否展示标题栏右侧箭头并开启点击反馈
   */
  isLink: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否禁用面板
   */
  disabled: Boolean,
  /**
   * 是否为只读状态，只读状态下无法操作面板
   */
  readonly: Boolean,
}

export type CollapseItemValue = string | number

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
