import type { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import { isObject } from '../../utils'

export const sectionProps = {
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 背景色
   */
  bgColor: String as PropType<CSSProperties['background-color']>,
}

export const sectionEmits = {
  click: (value: Event) => isObject(value),
}

export type SectionProps = ExtractPropTypes<typeof sectionProps>
export type SectionPropsPublic = ExtractPublicPropTypes<typeof sectionProps>

export type SectionEmits = typeof sectionEmits
