import type { ExtractPropTypes } from 'vue'

export const tabPaneProps = {
  /**
   * 标签名称，作为匹配的标识符
   */
  name: [String, Number],
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 是否禁用标签
   */
  disabled: Boolean,
  /**
   * 自定义标题插槽名称
   */
  titleSlot: String,
}

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
