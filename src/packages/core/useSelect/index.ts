import type { Ref } from 'vue'
import { computed, ref, toRef, watch } from 'vue'
import type { IncludeRefs } from '../../types'

export interface UseSelectProps<T, V> {
  /** 选项数据 */
  options?: T[]
  /** 默认数据 */
  defaultValue?: V | V[]
  /** 数据值的字段名 */
  valueKey?: keyof T
  /** 是否多选 */
  multiple?: boolean
  /** 是否支持反选（只在单选有效，多选强制支持） */
  inverse?: boolean
  /** 最大可选数量 */
  max?: number
}

export function useSelect<T, V = T>(props: IncludeRefs<UseSelectProps<T, V>>) {
  type OwnProps = UseSelectProps<T, V>

  const options = toRef(props, 'options', []) as Ref<Required<OwnProps>['options']>
  const defaultValue = toRef(props, 'defaultValue', []) as Ref<Required<OwnProps>['defaultValue']>
  const valueKey = toRef(props, 'valueKey', 'value' as OwnProps['valueKey']) as Ref<
    Required<OwnProps>['valueKey']
  >
  const multiple = toRef(props, 'multiple') as Ref<OwnProps['multiple']>
  const inverse = toRef(props, 'inverse') as Ref<OwnProps['inverse']>
  const max = toRef(props, 'max') as Ref<OwnProps['max']>

  const selectedSet = ref<Set<V>>(new Set())

  const selectedItems = computed<T | T[]>(() => {
    const result = options.value.filter((item) => selectedSet.value.has(item[valueKey.value] as V))
    return multiple.value ? result : result[0]
  })

  const selectedValues = computed<V | V[]>(() => {
    const result = [...selectedSet.value.values()]
    return multiple.value ? result : result[0]
  })

  watch(
    defaultValue,
    (value) => {
      const defaultValues = Array.isArray(value) ? value : [value]
      selectedSet.value.clear()
      defaultValues.forEach((value) => {
        if (typeof value !== 'undefined') {
          selectedSet.value.add(value)
        }
      })
    },
    {
      immediate: true,
    },
  )

  const isSelected = (value: V) => {
    return selectedSet.value.has(value)
  }

  const onSelect = (value: V) => {
    // 已选中情况
    if (selectedSet.value.has(value)) {
      ;(multiple.value ? true : inverse.value) && selectedSet.value.delete(value)
      return false
    }
    // 超过最大选中数量限制情况
    if (typeof max.value !== 'undefined' && selectedSet.value.size >= max.value) {
      return false
    }
    // 多选判定
    if (!multiple.value) {
      selectedSet.value.clear()
    }
    selectedSet.value.add(value)
    return true
  }

  const onClear = () => {
    selectedSet.value.clear()
  }

  return {
    selectedItems,
    selectedValues,
    onSelect,
    isSelected,
    onClear,
  }
}
