import { computed, Ref, ref, toRaw, toRef, watch } from 'vue'
import { IncludeRefs } from '../types'

export interface UseTreeProps<T> {
  /** 数据源 */
  options?: T[]
  /** 自定义 options 结构中的字段 */
  fieldNames?: Partial<UseTreeFieldNames<T>>
  /** 是否多选 */
  multiple?: boolean
}

export interface UseTreeFieldNames<T> {
  /** 指定选项的值为选项对象的某个属性值 */
  value: keyof T
  /** 指定选项标签为选项对象的某个属性值 */
  label: keyof T
  /** 指定选项的子选项为选项对象的某个属性值 */
  children: keyof T
  /** 指定选项的禁用为选项对象的某个属性值 */
  disabled: keyof T
  /** 指定选项的叶子节点的标志位为选项对象的某个属性值 */
  leaf: keyof T | ((item: T) => boolean)
}

export type TreeNode<T> = T & TreeNodeExtra

export type TreeNodeExtra = {
  __level: number
  __path: string
}

export default <T, V>(props: IncludeRefs<UseTreeProps<T>>) => {
  type OwnProps = UseTreeProps<T>
  type OwnNode = TreeNode<T>

  const _fieldNames = toRef(props, 'fieldNames') as Ref<Partial<UseTreeFieldNames<T>>>
  const fieldNames = computed(() => {
    return {
      label: 'label',
      value: 'value',
      children: 'children',
      disabled: 'disabled',
      ..._fieldNames.value,
    } as UseTreeFieldNames<T>
  })
  const options = toRef(props, 'options', []) as Ref<Required<OwnProps>['options']>
  const multiple = toRef(props, 'multiple') as Ref<OwnProps['multiple']>

  const treeData = ref([]) as Ref<OwnNode[]>
  const selectedMap = ref<Map<V, OwnNode>>(new Map())

  const selectedValues = computed<V[]>(() => [...selectedMap.value.keys()])

  const convertTreeData = (data: T[] = [], parentNode?: OwnNode) => {
    data.forEach((item, index) => {
      const node = item as OwnNode
      node.__level = 0
      node.__path = index.toString()
      if (parentNode) {
        node.__level = parentNode.__level
        node.__path = parentNode.__path + `-${index}`
      }
      if ((node[fieldNames.value.children] as T[])?.length) {
        convertTreeData(node[fieldNames.value.children] as T[], node)
      }
    })
    return data as OwnNode[]
  }

  const setChildren = (data: T[], pNode?: OwnNode) => {
    if (!pNode) {
      treeData.value = convertTreeData(data)
      return
    }
    ;(pNode[fieldNames.value.children] as OwnNode[]) = convertTreeData(data, pNode)
  }

  const getChildren = (path?: number[]) => {
    if (!path?.length) return treeData.value
    let curData = treeData.value
    for (const index of path) {
      curData = curData[index][fieldNames.value.children] as OwnNode[]
    }
    return curData ?? []
  }

  const isLeafNode = (item: OwnNode): boolean => {
    if (typeof fieldNames.value.leaf === 'function') {
      return fieldNames.value.leaf(item)
    }
    const leafKey = (fieldNames.value.leaf || 'leaf') as keyof OwnNode
    if (typeof item[leafKey] !== 'undefined') {
      return !!item[leafKey]
    }
    return !(item[fieldNames.value.children] as OwnNode[] | undefined)?.length
  }

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

  const toRawNode = (node: OwnNode) => {
    const newNode = toRaw(node) as Partial<OwnNode>
    delete newNode.__level
    delete newNode.__path
    return newNode as T
  }

  const getNodePath = (node: OwnNode): number[] => {
    return node.__path.split('-').map((item) => +item)
  }

  watch(
    options,
    (newVal) => {
      setChildren(newVal)
    },
    {
      immediate: true,
    },
  )

  return {
    treeData,
    fieldNames,
    selectedMap,
    selectedValues,
    setChildren,
    getChildren,
    isLeafNode,
    setSelect,
    clearSelect,
    isSelected,
    toRawNode,
    getNodePath,
  }
}
