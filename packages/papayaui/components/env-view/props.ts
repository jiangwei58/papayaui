import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import { isString } from '../../utils'

export const envViewProps = {
  modelValue: String,
  urls: {
    type: Array as PropType<EnvListItem[]>,
    default: () => [],
    required: true,
  },
}

export const envViewEmits = {
  'update:modelValue': (url: string) => isString(url),
  confirm: (url: string) => isString(url),
}

export interface EnvListItem {
  label: string
  key: string
  url: string
}

export type EnvViewProps = ExtractPropTypes<typeof envViewProps>
export type EnvViewPropsPublic = ExtractPublicPropTypes<typeof envViewProps>

export type EnvViewEmits = typeof envViewEmits
