import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const loadingIconProps = {
  /**
   *  加载图标颜色
   */
  color: String as PropType<CSSProperties['color']>,
  /**
   *  加载图标大小
   */
  size: [String, Number],
}

export type LoadingIconProps = ExtractPropTypes<typeof loadingIconProps>
