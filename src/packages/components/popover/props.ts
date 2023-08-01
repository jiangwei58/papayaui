import type { ExtractPropTypes } from 'vue'

export const popoverProps = {
  /**
   * 内容
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * 浮窗宽度
   */
  width: {
    type: [String, Number],
    default: '300',
  },
  /**
   * 浮窗层级
   */
  zIndex: {
    type: Number,
    default: 9,
  },
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
