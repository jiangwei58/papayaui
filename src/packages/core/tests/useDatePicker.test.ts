import { describe, expect, test } from 'vitest'
import useDatePicker, { DatePickerFilter, DatePickerFormatter } from '../useDatePicker'
import { ref } from 'vue'

describe('useDatePicker test', () => {
  test('should initial values is true', () => {
    const { columns } = useDatePicker()

    const now = new Date()
    expect(columns.value.length).toBe(3)
    expect(columns.value[0][0].value).toBe(now.getFullYear() - 10)
    expect(columns.value[0][columns.value[0].length - 1].value).toBe(now.getFullYear() + 10)

    expect(columns.value[1][0].value).toBe(0)
    expect(columns.value[1][columns.value[1].length - 1].value).toBe(11)

    expect(columns.value[2][0].value).toBe(1)
    expect(columns.value[2][columns.value[2].length - 1].value).toBe(
      new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
    )
  })

  test('modelValue should be synchronized correctly', async () => {
    const modelValue = ref<Date>(new Date())
    const { selectedDate, columnsType, columns, indexes } = useDatePicker({ modelValue })

    const isDateEqual = () => {
      expect(selectedDate.value.getFullYear()).toEqual(modelValue.value.getFullYear())
      expect(selectedDate.value.getMonth()).toEqual(modelValue.value.getMonth())
      expect(selectedDate.value.getDate()).toEqual(modelValue.value.getDate())
      const indexesTemp = columnsType.value.map((type, colIndex) => {
        return columns.value[colIndex].findIndex((option) => {
          switch (type) {
            case 'year':
              return selectedDate.value.getFullYear() === option.value
            case 'month':
              return selectedDate.value.getMonth() === option.value
            case 'day':
              return selectedDate.value.getDate() === option.value
          }
        })
      })
      expect(indexes.value).toEqual(indexesTemp)
    }

    isDateEqual()
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        modelValue.value = new Date('2023-02-28')
        resolve()
      }, 500),
    )
    isDateEqual()
  })

  test('formatter test', () => {
    const formatter: DatePickerFormatter = (type, value) => {
      if (type === 'year') return value + '年'
      return value
    }
    const { columns } = useDatePicker({ formatter })
    expect(columns.value[0][0].text).toMatch('年')
  })

  test('filter test', () => {
    const filter: DatePickerFilter = (type, options) => {
      if (type === 'month') return options.filter((item) => item.value % 5 === 0)
      return options
    }
    const { columns } = useDatePicker({ filter })
    expect(columns.value[1].length).toBeLessThan(12)
  })
})
