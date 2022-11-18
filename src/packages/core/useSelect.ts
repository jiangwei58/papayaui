import { computed, isRef, Ref, ref, toRef, watch } from 'vue'

export interface UseSelectProps<T, V> {
  /** 选项数据 */
  options: T[] | Ref<T[]>
  /** 默认数据 */
  defaultValue?: V | V[]
  /** 数据值的字段名 */
  valueKey?: keyof T
  /** 是否多选 */
  multiple?: boolean
  /** 是否支持反选（只在单选有效） */
  inverse?: boolean
}

export default <T, V>(props: UseSelectProps<T, V>) => {
  const { defaultValue, valueKey = 'value' as keyof T, multiple, inverse } = props

  const options = (isRef(props.options) ? props.options : toRef(props, 'options')) as Ref<T[]>
  const selectedSet = ref<Set<V>>(new Set())

  const selectedItems = computed<T | T[]>(() => {
    const result = options.value.filter((item) => selectedSet.value.has(item[valueKey] as V))
    return multiple ? result : result[0]
  })

  const selectedValues = computed<V | V[]>(() => {
    const result = [...selectedSet.value.values()]
    return multiple ? result : result[0]
  })

  watch(
    () => defaultValue ?? [],
    (value) => {
      const defaultValues = Array.isArray(value) ? value : [value]
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
    if (selectedSet.value.has(value)) {
      ;(multiple ? true : inverse) && selectedSet.value.delete(value)
      return false
    } else {
      if (!multiple) {
        selectedSet.value.clear()
      }
      selectedSet.value.add(value)
    }
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
