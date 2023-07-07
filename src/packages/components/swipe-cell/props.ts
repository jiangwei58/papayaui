import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const swipeCellProps = {
  /**
   * 标识名
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 控制打开或者关闭
   */
  show: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 滑动距离阈值，只有大于此值，才被认为是要打开菜单
   */
  threshold: {
    type: Number,
    default: 20,
  },
  /**
   * 右侧按钮内容
   */
  options: {
    type: Array as PropType<SwipeCellOption[]>,
    default: () => [],
  },
}

export const swipeCellEmits = ['open', 'close', 'click']

export type SwipeCellOption = {
  text: string
  style?: Partial<{ width: string; backgroundColor: CSSProperties['background-color'] }>
}

export type SwipeCellStatus = 'open' | 'close'

export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>
export type SwipeCellEmits = typeof swipeCellEmits
