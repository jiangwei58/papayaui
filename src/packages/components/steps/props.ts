import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../../utils'

export const stepsProps = {
  /**
   * 当前步骤
   */
  current: {
    type: Number,
    default: 0,
  },
  /**
   * 每个步骤的配置
   */
  steps: {
    type: Array as PropType<StepItem[]>,
    default: () => [],
  },
  /**
   * 显示方向
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
}

export const stepsEmits = {
  'click-step': (index: number) => isNumber(index),
}

/** 步骤状态 */
export type StepStatus = 'default' | 'process' | 'finish'

export type StepItem = {
  title: string
  desc: string
  [key: string]: any
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>
export type StepsEmits = typeof stepsEmits
