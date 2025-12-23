import type { ComputedRef } from 'vue'
import { computed, shallowRef, watch } from 'vue'
import type { MaybeRef } from '../../types'
import { toRefValue } from '../../utils'

/** 基础 Props 类型 */
interface UseSelectBaseProps<T> {
  /** 选项数据 */
  options?: T[]
  /**
   * 数据值的字段名
   * @default value
   */
  valueKey?: keyof T
  /** 是否支持反选（只在单选有效，多选强制支持） */
  inverse?: boolean
  /** 最大可选数量 */
  max?: number
}

/** 单选模式 Props */
export interface UseSelectSingleProps<T, V> extends UseSelectBaseProps<T> {
  /** 是否多选 */
  multiple?: false
  /** 默认数据 */
  defaultValue?: V
}

/** 多选模式 Props */
export interface UseSelectMultipleProps<T, V> extends UseSelectBaseProps<T> {
  /** 是否多选 */
  multiple: true
  /** 默认数据 */
  defaultValue?: V[]
}

/** 动态模式 Props（multiple 为运行时 boolean） */
export interface UseSelectDynamicProps<T, V> extends UseSelectBaseProps<T> {
  /** 是否多选 */
  multiple?: boolean
  /** 默认数据 */
  defaultValue?: V | V[]
}

/** 合并的 Props 类型 */
export type UseSelectProps<T, V> =
  | UseSelectSingleProps<T, V>
  | UseSelectMultipleProps<T, V>
  | UseSelectDynamicProps<T, V>

/** 将 Props 的每个属性转为 MaybeRef */
type UseSelectPropsWithRefs<T, V> = {
  [K in keyof UseSelectProps<T, V>]: MaybeRef<UseSelectProps<T, V>[K]>
}

/** 单选模式返回类型 */
interface UseSelectSingleReturn<T, V> {
  selectedItems: ComputedRef<T>
  selectedValues: ComputedRef<V>
  onSelect: (value: V) => boolean
  isSelected: (value: V) => boolean
  onClear: () => void
}

/** 多选模式返回类型 */
interface UseSelectMultipleReturn<T, V> {
  selectedItems: ComputedRef<T[]>
  selectedValues: ComputedRef<V[]>
  onSelect: (value: V) => boolean
  isSelected: (value: V) => boolean
  onClear: () => void
}

/** 动态模式返回类型（multiple 为运行时值时） */
interface UseSelectDynamicReturn<T, V> {
  selectedItems: ComputedRef<T | T[]>
  selectedValues: ComputedRef<V | V[]>
  onSelect: (value: V) => boolean
  isSelected: (value: V) => boolean
  onClear: () => void
}

/** 合并的返回类型 */
export type UseSelectReturn<T, V> =
  | UseSelectSingleReturn<T, V>
  | UseSelectMultipleReturn<T, V>
  | UseSelectDynamicReturn<T, V>

/** 单选模式函数重载 */
export function useSelect<T, V = T>(props: {
  [K in keyof UseSelectSingleProps<T, V>]: MaybeRef<UseSelectSingleProps<T, V>[K]>
}): UseSelectSingleReturn<T, V>

/** 多选模式函数重载 */
export function useSelect<T, V = T>(props: {
  [K in keyof UseSelectMultipleProps<T, V>]: MaybeRef<UseSelectMultipleProps<T, V>[K]>
}): UseSelectMultipleReturn<T, V>

/** 动态模式函数重载（multiple 为运行时 boolean） */
export function useSelect<T, V = T>(props: {
  [K in keyof UseSelectDynamicProps<T, V>]: MaybeRef<UseSelectDynamicProps<T, V>[K]>
}): UseSelectDynamicReturn<T, V>

/** 实现 */
export function useSelect<T, V = T>(props: UseSelectPropsWithRefs<T, V>): UseSelectReturn<T, V> {
  const options = toRefValue(props.options)
  const defaultValue = toRefValue(props.defaultValue)
  const valueKey = toRefValue(props.valueKey, 'value' as keyof T)
  const multiple = toRefValue(props.multiple)
  const inverse = toRefValue(props.inverse)
  const max = toRefValue(props.max)

  // 使用 shallowRef 避免 Vue 对 Set 内部进行深度响应式转换
  const selectedSet = shallowRef<Set<V>>(new Set())

  const getOptions = (): T[] => options.value ?? []

  // 触发响应式更新的辅助函数
  const triggerUpdate = (): void => {
    selectedSet.value = new Set(selectedSet.value)
  }

  const selectedItems = computed(() => {
    const result = getOptions().filter((item) => selectedSet.value.has(item[valueKey.value] as V))
    return multiple.value ? result : result[0]
  })

  const selectedValues = computed(() => {
    const result = [...selectedSet.value.values()]
    return multiple.value ? result : result[0]
  })

  watch(
    defaultValue,
    (value) => {
      const newSet = new Set<V>()
      const defaultValues = Array.isArray(value) ? value : [value]
      defaultValues.forEach((v) => {
        if (typeof v !== 'undefined') {
          newSet.add(v)
        }
      })
      selectedSet.value = newSet
    },
    {
      immediate: true,
    },
  )

  const isSelected = (value: V): boolean => {
    return selectedSet.value.has(value)
  }

  const onSelect = (value: V): boolean => {
    // 已选中情况
    if (selectedSet.value.has(value)) {
      const canDeselect = multiple.value ? true : inverse.value
      if (canDeselect) {
        selectedSet.value.delete(value)
        triggerUpdate()
      }
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
    triggerUpdate()
    return true
  }

  const onClear = (): void => {
    selectedSet.value = new Set()
  }

  return {
    selectedItems,
    selectedValues,
    onSelect,
    isSelected,
    onClear,
  }
}
