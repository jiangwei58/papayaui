import { getGlobalOptions } from '../../utils/config'
import type { ExtractPropTypes, PropType } from 'vue'
import { getCurrentInstance } from 'vue'

export const cellProps = {
  /**
   * 标题
   */
  title: String,
  /**
   * 内容
   */
  value: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * 标题下方的描述信息
   */
  label: String,
  /**
   * 标题宽度
   */
  titleWidth: String,
  /**
   * 是否开启点击反馈
   */
  clickable: Boolean,
  /**
   * 内容是否可选中
   */
  selectable: {
    type: Boolean,
    default: () => {
      const instance = getCurrentInstance()
      return getGlobalOptions(instance)?.cell?.selectable ?? false
    },
  },
  /**
   * 是否显示箭头，为true同时有点击反馈
   */
  isLink: Boolean,
  /**
   * 是否显示必填标识
   */
  required: Boolean,
  /**
   * 内容居中
   */
  center: Boolean,
  /**
   * 前面的图标
   */
  icon: String,
  /**
   * 内容对齐方式
   */
  valueAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
  /**
   * 错误信息
   */
  errorMessage: String,
  /**
   * 是否显示下边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * 后缀内容
   */
  suffix: String,
  /**
   * 根节点样式类
   */
  customClass: String,
  /**
   * 标题样式类
   */
  titleClass: String,
  /**
   * 右侧内容样式类
   */
  valueClass: String,
}

export const cellEmits = {
  click: (_value: MouseEvent) => true,
}

export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellEmits = typeof cellEmits
