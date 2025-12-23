import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tooltipProps = {
  /**
   * 悬浮内容
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * 宽度
   */
  width: {
    type: String,
    default: '300',
  },
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipPropsPublic = ExtractPublicPropTypes<typeof tooltipProps>
