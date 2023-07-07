import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { defaultNamespace } from '../../core/useNamespace'

export const badgeProps = {
  /**
   * 徽标内容
   */
  content: [Number, String],
  /**
   * 徽标背景颜色
   */
  color: {
    type: [String, Number] as PropType<CSSProperties['color']>,
    default: `var(--${defaultNamespace}-color-danger)`,
  },
  /**
   * 是否展示为小点
   */
  dot: Boolean,
  /**
   * max 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效
   */
  max: Number,
  /**
   * 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为rpx
   */
  offset: {
    type: Array as PropType<Array<number | string>>,
    default: () => [0, 0],
  },
  /**
   * 当 content 为数字 0 或字符串 '0' 时，是否展示徽标
   */
  showZero: Boolean,
  /**
   * 是否显示
   */
  show: {
    type: Boolean,
    default: true,
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
