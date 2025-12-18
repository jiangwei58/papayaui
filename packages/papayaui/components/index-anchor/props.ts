import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const indexAnchorProps = {
  /**
   * 索引字符
   */
  index: {
    type: [String, Number],
    default: '',
  },
}

export type IndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>
export type IndexAnchorPropsPublic = ExtractPublicPropTypes<typeof indexAnchorProps>
