import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

export const emptyProps = {
  /**
   *  图片类型, 支持图片url
   */
  image: {
    type: String as PropType<'default' | 'error' | 'search' | string>,
    default: 'default',
  },
  /**
   *  图片下方的描述文字
   */
  description: {
    type: String,
    default: '',
  },
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
export type EmptyPropsPublic = ExtractPublicPropTypes<typeof emptyProps>
