import type { ExtractPropTypes } from 'vue'

export const listItemProps = {
  /**
   * 内容
   */
  text: String,
  /**
   * 是否选中
   */
  selected: Boolean,
  /**
   * 是否使用slot
   * @description 主动判定，为了防止slot上v-if为false场景下识别为slot存在的问题
   * ```tsx
   * <ListItem>
   *   <slot v-if="false" /> // 这时$slots.default为true
   * </ListItem>
   * ```
   */
  useSlot: Boolean,
}

export const listItemEmits = {
  click: () => true,
}

export type ListItemProps = ExtractPropTypes<typeof listItemProps>
export type ListItemEmits = typeof listItemEmits
