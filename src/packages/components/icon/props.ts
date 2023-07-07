import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { isObject } from '../../utils'

export const iconProps = {
  /**
   * 图标名称
   */
  name: String,
  /**
   * 图标大小
   */
  size: String,
  /**
   * 图标颜色
   */
  color: String as PropType<CSSProperties['color']>,
  /**
   * 是否块级元素
   */
  block: Boolean,
  /**
   * 自定义样式
   */
  customStyle: Object as PropType<CSSProperties>,
}

export const iconEmits = {
  click: (value: Event) => isObject(value),
}

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconEmits = typeof iconEmits
