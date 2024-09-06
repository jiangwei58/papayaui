import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const tagProps = {
  /**
   * 标签类型
   */
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger'>,
    default: 'primary',
  },
  /**
   * 标签颜色
   */
  color: String as PropType<CSSProperties['background-color']>,
  /**
   * 是否为空心样式
   */
  plain: Boolean,
  /**
   * 圆角大小, 值为true时半圆角
   */
  round: [Boolean, String],
  /**
   * 是否为标记样式
   */
  mark: Boolean,
  /**
   * 文字颜色
   */
  textColor: String as PropType<CSSProperties['color']>,
  /**
   * 是否显示可关闭标签
   */
  closeable: Boolean,
}

export const tagEmits = {
  close: () => true,
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagEmits = typeof tagEmits
