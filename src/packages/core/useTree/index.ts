import { computed, isRef, shallowRef, toRaw, triggerRef, watch } from 'vue'
import type { MaybeRef } from '../../types'

export interface UseTreeProps<T extends object> {
  /**
   * 数据源, 通常用来设置静态数据
   */
  options?: MaybeRef<T[]>
  /**
   * 自定义 options 结构中的字段
   *
   * @default
   * ```ts
   * {
   *  label: 'label',
   *  value: 'value',
   *  children: 'children',
   *  disabled: 'disabled'
   * }
   * ```
   */
  fieldNames?: MaybeRef<Partial<UseTreeFieldNames<T>>>
}

export interface UseTreeFieldNames<T extends object = Record<string, string>> {
  /** 指定选项的值为选项对象的某个属性值 */
  value: keyof T
  /** 指定选项标签为选项对象的某个属性值 */
  label: keyof T
  /** 指定选项的子选项为选项对象的某个属性值 */
  children: keyof T
  /** 指定选项的禁用为选项对象的某个属性值 */
  disabled: keyof T
  /** 指定选项的叶子节点的标志位为选项对象的某个属性值 */
  leaf?: keyof T | ((item: T) => boolean)
}

export type TreeNode<T> = T & TreeNodeExtra

export type TreeNodeExtra = {
  __path: string
}

export const defaultFieldNames: Partial<UseTreeFieldNames> = {
  label: 'label',
  value: 'value',
  children: 'children',
  disabled: 'disabled',
}

export function useTree<T extends object>(props: UseTreeProps<T> = {}) {
  type OwnNode = TreeNode<T>

  const fieldNames = computed(() => {
    return {
      ...defaultFieldNames,
      ...(isRef(props.fieldNames) ? props.fieldNames.value : props.fieldNames),
    } as UseTreeFieldNames<T>
  })

  const treeData = shallowRef<OwnNode[]>([])

  const convertTreeNodes = (data: T[] = [], parentNode?: OwnNode) => {
    data.forEach((item, index) => {
      const node = item as OwnNode
      node.__path = index.toString()
      if (parentNode) {
        node.__path = parentNode.__path + `-${index}`
      }

      const children = node[fieldNames.value.children] as T[]
      if (children?.length) {
        convertTreeNodes(children, node)
      }
    })
    return data as OwnNode[]
  }

  const setChildren = (data: T[], pNode?: OwnNode) => {
    const children = convertTreeNodes(data, pNode)
    if (!pNode) {
      treeData.value = children
      return
    }
    ;(pNode[fieldNames.value.children] as OwnNode[]) = children
    triggerRef(treeData)
  }

  const getChildren = (path: number[] = []) => {
    if (!path?.length) return treeData.value
    let curData: OwnNode[] = []
    loopNodeByPath(path, (node) => {
      curData = (node[fieldNames.value.children] ?? []) as OwnNode[]
    })
    return curData
  }

  const isLeafNode = (item: OwnNode): boolean => {
    if (typeof fieldNames.value.leaf === 'function') {
      return fieldNames.value.leaf(item)
    }
    const leafKey = fieldNames.value.leaf ?? ('leaf' as keyof T)
    if (typeof item[leafKey] !== 'undefined') {
      return !!item[leafKey]
    }
    return !(item[fieldNames.value.children] as OwnNode[] | undefined)?.length
  }

  const toRawNode = (node: OwnNode) => {
    const newNode = toRaw(node) as Partial<OwnNode>
    delete newNode.__path
    return newNode as T
  }

  const getNodePath = (node: OwnNode): number[] => {
    return node.__path.split('-').map((item) => +item)
  }

  const loopNodeByPath = (path: number[], iterate: (node: OwnNode) => void | boolean) => {
    let curData = treeData.value
    for (const index of path) {
      if (iterate(curData[index]) === false) {
        break
      }
      curData = curData[index][fieldNames.value.children] as OwnNode[]
    }
  }

  const getNodesByPath = (path: number[]) => {
    const nodes: OwnNode[] = []
    loopNodeByPath(path, (node) => {
      nodes.push(node)
    })
    return nodes
  }

  watch(
    () => props.options,
    (newVal) => {
      if (newVal) {
        setChildren(isRef(newVal) ? newVal.value : newVal)
      }
    },
    {
      immediate: true,
    },
  )

  return {
    treeData,
    fieldNames,
    setChildren,
    getChildren,
    isLeafNode,
    toRawNode,
    getNodePath,
    getNodesByPath,
    loopNodeByPath,
  }
}
