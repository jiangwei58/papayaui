import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const cellGroupProps = {
  /**
   * 是否展示为圆角卡片风格
   */
  inset: Boolean,
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
export type CellGroupPropsPublic = ExtractPublicPropTypes<typeof cellGroupProps>
