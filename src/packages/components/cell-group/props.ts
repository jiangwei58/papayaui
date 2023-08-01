import type { ExtractPropTypes } from 'vue'

export const cellGroupProps = {
  /**
   * 是否展示为圆角卡片风格
   */
  inset: Boolean,
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
