import { describe, expect, test } from 'vitest'
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
})
