import type { ExtractPropTypes } from 'vue'
import { isString } from '../../utils'

export const sortLabelProps = {
  /**
   * 排序字段和排序方式
   * @description 如：'id:asc' 'id:desc'
   */
  modelValue: String,
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 排序字段key
   */
  datakey: {
    type: String,
    required: true,
  },
} as const

export const sortLabelEmits = {
  'update:modelValue': (_value?: string) => true,
  change: (key: string, _sort?: string) => isString(key),
}

export type Sort = 'up' | 'down' | undefined

export enum SortTypeEnum {
  UP = ':asc',
  DOWN = ':desc',
}

export type SortLabelProps = ExtractPropTypes<typeof sortLabelProps>
export type SortLabelEmits = typeof sortLabelEmits
