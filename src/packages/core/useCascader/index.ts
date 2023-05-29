import { computed, ref, shallowRef } from 'vue'
import { MaybeRef } from '../../types'
import useTree, { TreeNode, UseTreeProps } from '../useTree'

export interface UseCascaderProps<T extends object> extends UseTreeProps<T> {
  /** 是否多选 */
  multiple?: MaybeRef<boolean>
}

export default <T extends object, V>(props: UseCascaderProps<T>) => {
  type OwnNode = TreeNode<T>

  const useTreeState = useTree<T>(props)
  const { fieldNames } = useTreeState

  const multiple = ref(props.multiple)

  const selectedMap = shallowRef<Map<V, OwnNode>>(new Map())
  const selectedValues = computed<V[]>(() => [...selectedMap.value.keys()])

  const setSelect = (item: OwnNode) => {
    const value = item[fieldNames.value.value] as V
    if (selectedMap.value.has(value)) {
      multiple.value && selectedMap.value.delete(value)
      return false
    } else {
      if (!multiple.value) {
        selectedMap.value.clear()
      }
      selectedMap.value.set(value, item)
    }
    return true
  }

  const clearSelect = () => {
    selectedMap.value.clear()
  }

  const isSelected = (value: V) => {
    return selectedMap.value.has(value)
  }

  return {
    ...useTreeState,
    selectedMap,
    selectedValues,
    setSelect,
    clearSelect,
    isSelected,
  }
}
