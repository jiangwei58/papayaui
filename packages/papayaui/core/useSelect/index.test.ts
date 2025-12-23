import { describe, expect, test } from 'vitest'
import { nextTick, ref } from 'vue'
import { useSelect } from '.'

interface Option {
  name: string
  value: number
}

describe('useSelect test', () => {
  const options: Option[] = [
    { name: 'a', value: 1 },
    { name: 'b', value: 2 },
    { name: 'c', value: 3 },
  ]

  test.each`
    multiple | defaultValue | items                       | values
    ${false} | ${undefined} | ${undefined}                | ${undefined}
    ${false} | ${1}         | ${options[0]}               | ${1}
    ${true}  | ${undefined} | ${[]}                       | ${[]}
    ${true}  | ${[1]}       | ${[options[0]]}             | ${[1]}
    ${true}  | ${[1, 2]}    | ${[options[0], options[1]]} | ${[1, 2]}
  `(
    'should default value is correct (multiple: $multiple, defaultValue: $defaultValue)',
    async ({ multiple, defaultValue, items, values }) => {
      const { selectedItems, selectedValues } = useSelect<Option, Option['value']>({
        options,
        multiple,
        defaultValue,
      })

      expect(selectedItems.value).toEqual(items)
      expect(selectedValues.value).toEqual(values)
    },
  )

  test.each`
    multiple | selectValues | items                       | values
    ${false} | ${[1]}       | ${options[0]}               | ${1}
    ${false} | ${[1, 2]}    | ${options[1]}               | ${2}
    ${true}  | ${[1]}       | ${[options[0]]}             | ${[1]}
    ${true}  | ${[1, 2]}    | ${[options[0], options[1]]} | ${[1, 2]}
  `(
    'should select normally (multiple: $multiple, selectValues: $selectValues)',
    async ({ multiple, selectValues, items, values }) => {
      const { selectedItems, selectedValues, onSelect, isSelected } = useSelect<
        Option,
        Option['value']
      >({ options, multiple })

      for (const value of selectValues) {
        expect(isSelected(value)).toBe(false)
        expect(onSelect(value)).toBe(true)
        expect(isSelected(value)).toBe(true)
      }

      expect(selectedItems.value).toEqual(items)
      expect(selectedValues.value).toEqual(values)
    },
  )

  test('should inverse select normally', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      inverse: true,
    })

    expect(selectedValues.value).toBe(undefined)
    expect(onSelect(1)).toBe(true)
    expect(isSelected(1)).toBe(true)
    expect(selectedValues.value).toBe(1)

    expect(onSelect(1)).toBe(false)
    expect(isSelected(1)).toBe(false)
    expect(selectedValues.value).toBe(undefined)
  })

  test('should max limit is normal', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      max: 2,
    })

    expect(selectedValues.value).toEqual([])

    expect(onSelect(1)).toBe(true)
    expect(onSelect(2)).toBe(true)
    expect(onSelect(3)).toBe(false)

    expect(isSelected(1)).toBe(true)
    expect(isSelected(2)).toBe(true)
    expect(isSelected(3)).toBe(false)

    expect(selectedValues.value).toEqual([1, 2])
  })

  test('should onClear work correctly', async () => {
    const { selectedValues, onClear, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      defaultValue: [1, 2],
    })

    expect(selectedValues.value).toEqual([1, 2])
    expect(isSelected(1)).toBe(true)
    expect(isSelected(2)).toBe(true)

    onClear()

    expect(selectedValues.value).toEqual([])
    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(false)
  })

  test('should onClear work in single mode', async () => {
    const { selectedValues, onClear, isSelected } = useSelect<Option, Option['value']>({
      options,
      defaultValue: 1,
    })

    expect(selectedValues.value).toBe(1)
    expect(isSelected(1)).toBe(true)

    onClear()

    expect(selectedValues.value).toBe(undefined)
    expect(isSelected(1)).toBe(false)
  })

  test('should custom valueKey work correctly', async () => {
    interface CustomOption {
      label: string
      id: number
    }
    const customOptions: CustomOption[] = [
      { label: 'a', id: 10 },
      { label: 'b', id: 20 },
      { label: 'c', id: 30 },
    ]

    const { selectedItems, selectedValues, onSelect, isSelected } = useSelect<
      CustomOption,
      CustomOption['id']
    >({
      options: customOptions,
      valueKey: 'id',
      defaultValue: 10,
    })

    expect(selectedItems.value).toEqual(customOptions[0])
    expect(selectedValues.value).toBe(10)
    expect(isSelected(10)).toBe(true)

    expect(onSelect(20)).toBe(true)
    expect(selectedItems.value).toEqual(customOptions[1])
    expect(selectedValues.value).toBe(20)
    expect(isSelected(10)).toBe(false)
    expect(isSelected(20)).toBe(true)
  })

  test('should defaultValue be reactive', async () => {
    const defaultValue = ref<number | undefined>(1)
    const { selectedValues, isSelected } = useSelect<Option, Option['value']>({
      options,
      defaultValue,
    })

    expect(selectedValues.value).toBe(1)
    expect(isSelected(1)).toBe(true)

    // 修改 defaultValue，应该触发响应式更新
    defaultValue.value = 2
    await nextTick() // 等待响应式更新

    expect(selectedValues.value).toBe(2)
    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(true)

    // 修改为 undefined
    defaultValue.value = undefined
    await nextTick()

    expect(selectedValues.value).toBe(undefined)
    expect(isSelected(2)).toBe(false)
  })

  test('should single mode without inverse not allow deselect', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      inverse: false, // 明确不支持反选
    })

    expect(selectedValues.value).toBe(undefined)

    expect(onSelect(1)).toBe(true)
    expect(isSelected(1)).toBe(true)
    expect(selectedValues.value).toBe(1)

    // 再次选择已选中的项，不应该取消选择
    expect(onSelect(1)).toBe(false)
    expect(isSelected(1)).toBe(true)
    expect(selectedValues.value).toBe(1)
  })

  test('should multiple mode always allow deselect', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      inverse: false, // 即使设置为 false，多选也应该支持反选
    })

    expect(selectedValues.value).toEqual([])

    expect(onSelect(1)).toBe(true)
    expect(onSelect(2)).toBe(true)
    expect(isSelected(1)).toBe(true)
    expect(isSelected(2)).toBe(true)
    expect(selectedValues.value).toEqual([1, 2])

    // 多选模式下应该可以取消选择
    expect(onSelect(1)).toBe(false)
    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(true)
    expect(selectedValues.value).toEqual([2])
  })

  test('should work with empty options', async () => {
    const { selectedItems, selectedValues, onSelect } = useSelect<Option, Option['value']>({
      options: [],
      defaultValue: 1,
    })

    // 虽然 defaultValue 是 1，但 options 为空，所以不会匹配到任何项
    expect(selectedItems.value).toBe(undefined)
    expect(selectedValues.value).toBe(1)

    expect(onSelect(2)).toBe(true)
    expect(selectedValues.value).toBe(2)
  })

  test('should max = 0 prevent any selection', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      max: 0,
    })

    expect(selectedValues.value).toEqual([])

    expect(onSelect(1)).toBe(false)
    expect(onSelect(2)).toBe(false)
    expect(onSelect(3)).toBe(false)

    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(false)
    expect(isSelected(3)).toBe(false)

    expect(selectedValues.value).toEqual([])
  })

  test('should max = 1 in multiple mode work correctly', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      max: 1,
    })

    expect(selectedValues.value).toEqual([])

    expect(onSelect(1)).toBe(true)
    expect(onSelect(2)).toBe(false) // 应该失败，因为已经达到上限

    expect(isSelected(1)).toBe(true)
    expect(isSelected(2)).toBe(false)

    expect(selectedValues.value).toEqual([1])

    // 取消选择后，应该可以选择其他的
    expect(onSelect(1)).toBe(false)
    expect(selectedValues.value).toEqual([])

    expect(onSelect(2)).toBe(true)
    expect(selectedValues.value).toEqual([2])
  })

  test('should handle undefined defaultValue correctly', async () => {
    const { selectedValues, isSelected } = useSelect<Option, Option['value']>({
      options,
      defaultValue: undefined,
    })

    expect(selectedValues.value).toBe(undefined)
    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(false)
  })

  test('should handle array with undefined values in defaultValue', async () => {
    const { selectedValues, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      defaultValue: [1, undefined, 2] as any,
    })

    // undefined 应该被过滤掉
    expect(selectedValues.value).toEqual([1, 2])
    expect(isSelected(1)).toBe(true)
    expect(isSelected(2)).toBe(true)
  })

  test('should selecting already selected item return false', async () => {
    const { onSelect } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
    })

    expect(onSelect(1)).toBe(true)
    expect(onSelect(1)).toBe(false) // 再次选择应该返回 false（取消选择）
    expect(onSelect(1)).toBe(true) // 再次选择应该返回 true（重新选择）
  })

  test('should return correct value when reaching max limit', async () => {
    const { onSelect } = useSelect<Option, Option['value']>({
      options,
      multiple: true,
      max: 2,
    })

    expect(onSelect(1)).toBe(true)
    expect(onSelect(2)).toBe(true)
    expect(onSelect(3)).toBe(false) // 达到上限，返回 false
  })

  test('should handle single select mode switching selection', async () => {
    const { selectedValues, onSelect, isSelected } = useSelect<Option, Option['value']>({
      options,
      multiple: false,
    })

    expect(onSelect(1)).toBe(true)
    expect(selectedValues.value).toBe(1)
    expect(isSelected(1)).toBe(true)

    // 切换到另一个选项
    expect(onSelect(2)).toBe(true)
    expect(selectedValues.value).toBe(2)
    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(true)

    // 再切换到第三个选项
    expect(onSelect(3)).toBe(true)
    expect(selectedValues.value).toBe(3)
    expect(isSelected(1)).toBe(false)
    expect(isSelected(2)).toBe(false)
    expect(isSelected(3)).toBe(true)
  })

  test('should work without options prop', async () => {
    const { selectedItems, selectedValues, onSelect, isSelected } = useSelect<
      Option,
      Option['value']
    >({})

    // options 为 undefined 时，selectedItems 应该返回 undefined
    expect(selectedItems.value).toBe(undefined)
    expect(selectedValues.value).toBe(undefined)

    // 仍然可以选择值
    expect(onSelect(1)).toBe(true)
    expect(selectedValues.value).toBe(1)
    expect(isSelected(1)).toBe(true)

    // 但 selectedItems 仍为 undefined（因为没有 options 可以匹配）
    expect(selectedItems.value).toBe(undefined)
  })
})
