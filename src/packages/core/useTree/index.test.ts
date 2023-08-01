import { describe, expect, test } from 'vitest'
import { nextTick, ref } from 'vue'
import type { UseTreeFieldNames } from '.'
import { useTree } from '.'

describe('useTree test', () => {
  test('should set and get children normally', () => {
    const { treeData, setChildren, getChildren } = useTree<{
      value: number
    }>()

    const item = { value: 1 }

    setChildren([item])
    expect(treeData.value[0]).toEqual(item)

    const children = getChildren()
    expect(children.length).toBe(1)
    expect(children[0].value).toEqual(item.value)
  })

  test('should custom fieldNames normally', () => {
    type Node = {
      name: string
      id: string
      childList: Node[]
    }

    const customFieldNames: { [key in keyof Partial<UseTreeFieldNames>]: keyof Node } = {
      label: 'name',
      value: 'id',
      children: 'childList',
    }
    const { fieldNames } = useTree<Node>({
      fieldNames: customFieldNames,
    })

    expect(fieldNames.value).toMatchObject(customFieldNames)
  })

  test('should watch options change correctly', async () => {
    const options = ref([{ label: '1', value: '1' }])
    const { treeData } = useTree({ options })

    expect(treeData.value).toEqual(options.value)

    options.value = [{ label: '2', value: '2' }]
    await nextTick()
    expect(treeData.value).toEqual(options.value)
  })
})
