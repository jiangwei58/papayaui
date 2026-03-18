import type {
  ComponentInternalInstance,
  ExtractPropTypes,
  ExtractPublicPropTypes,
  PropType,
} from 'vue'

/** 气泡弹出方向 */
export type TourPlacement = 'top' | 'bottom' | 'left' | 'right'

/** 单步引导配置 */
export interface TourStep {
  /** 目标元素的 CSS 选择器，不传时气泡居中展示 */
  target?: string
  /** 步骤标题 */
  title?: string
  /** 步骤描述内容 */
  content: string
  /** 气泡弹出位置，不传时根据目标位置自动判断 */
  placement?: TourPlacement
}

export const tourProps = {
  /** 是否显示引导 */
  show: {
    type: Boolean,
    default: false,
  },
  /** 引导步骤列表 */
  steps: {
    type: Array as PropType<TourStep[]>,
    default: () => [],
  },
  /** 当前步骤索引，支持 v-model:current */
  current: {
    type: Number,
    default: 0,
  },
  /** 点击遮罩是否关闭引导 */
  maskClosable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 高亮区域内边距，单位 px */
  padding: {
    type: Number,
    default: 8,
  },
  /** 上一步按钮文字 */
  prevText: {
    type: String,
    default: '上一步',
  },
  /** 下一步按钮文字 */
  nextText: {
    type: String,
    default: '下一步',
  },
  /** 完成按钮文字 */
  finishText: {
    type: String,
    default: '完成',
  },
  /** 遮罩颜色 */
  maskColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)',
  },
  /** z-index 层级 */
  zIndex: {
    type: Number,
    default: 9999,
  },
  /**
   * 包含目标元素的组件实例，传入调用方的 getCurrentInstance()。
   * 在微信小程序中，createSelectorQuery 的查询范围由组件实例决定，
   * 必须传入实际持有目标元素的那个组件实例才能正确获取元素位置。
   */
  scope: {
    type: Object as PropType<ComponentInternalInstance>,
    default: null,
  },
} as const

export const tourEmits = {
  /** 更新 show 状态 */
  'update:show': (value: boolean) => typeof value === 'boolean',
  /** 更新当前步骤索引 */
  'update:current': (value: number) => typeof value === 'number',
  /** 步骤切换时触发，参数为切换后的步骤索引 */
  change: (current: number) => typeof current === 'number',
  /** 点击关闭按钮或遮罩关闭时触发 */
  close: () => true,
  /** 点击完成按钮时触发 */
  finish: () => true,
}

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourPropsPublic = ExtractPublicPropTypes<typeof tourProps>
export type TourEmits = typeof tourEmits
