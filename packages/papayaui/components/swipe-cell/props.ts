import type { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import type { ButtonProps } from '../button'

export const swipeCellProps = {
  /**
   * 标识名
   */
  name: {
    type: [String, Number],
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

export const swipeCellEmits = {
  open: () => true,
  close: () => true,
  click: (_name: SwipeCellProps['name'], _index: number, _option: SwipeCellOption) => true,
}

export type SwipeCellOption = {
  text: string
  style?: Partial<{
    width: string
    backgroundColor: CSSProperties['background-color']
    borderRadius: ButtonProps['round']
  }>
  click?: (name: SwipeCellProps['name']) => void
  [key: string]: any
}

export type SwipeCellStatus = 'open' | 'close'

export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>
export type SwipeCellPropsPublic = ExtractPublicPropTypes<typeof swipeCellProps>

export type SwipeCellEmits = typeof swipeCellEmits
