import type { ExtractPropTypes, Ref } from 'vue'
import { isNumber, isString } from '../../utils'

export const tabbarProps = {
  /**
   * 当前选中标签的索引
   */
  modelValue: [String, Number],
  /**
   * 是否固定在底部
   */
  fixed: {
    type: Boolean,
    default: true,
  },
  /**
   * 固定在底部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: Boolean,
  /**
   * 是否展示外边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * 元素层级z-index
   */
  zIndex: {
    type: Number,
    default: 1,
  },
  /**
   * 选中标签的颜色
   */
  activeColor: String,
  /**
   * 未选中标签的颜色
   */
  inactiveColor: String,
  /**
   * 是否为 iPhoneX 留出底部安全距离
   */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
}

export const tabbarEmits = {
  'update:modelValue': (name: string | number) => isString(name) || isNumber(name),
  change: (name: string | number) => isString(name) || isNumber(name),
}

export type TabbarProps = ExtractPropTypes<typeof tabbarProps>
export type TabbarEmits = typeof tabbarEmits

export type TabbarExpose = {
  children: Ref<Array<string | number>>
  onChange: (name: string | number) => void
}
