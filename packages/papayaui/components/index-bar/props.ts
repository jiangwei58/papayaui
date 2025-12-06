import type { ExtractPropTypes, PropType } from 'vue'

export const indexBarProps = {
  /**
   * 索引字符列表
   */
  indexList: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  /**
   * z-index 层级
   */
  zIndex: {
    type: Number,
    default: 1,
  },
  /**
   * 是否开启锚点自动吸顶
   */
  sticky: {
    type: Boolean,
    default: true,
  },
  /**
   * 锚点自动吸顶时与顶部的距离
   */
  stickyOffsetTop: {
    type: Number,
    default: 0,
  },
}

export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>
