import { describe, test, expect } from 'vitest'
import { formatNumericTypeString, minAndMax, useInputNumber } from '.'

describe('formatNumericTypeString', () => {
  test('should format basic numbers correctly', () => {
    expect(formatNumericTypeString('123')).toBe('123')
    expect(formatNumericTypeString('123.45')).toBe('123')
    expect(formatNumericTypeString('abc123')).toBe('123')
    expect(formatNumericTypeString('12.34.56', Number.MAX_SAFE_INTEGER.toString().length, 2)).toBe(
      '12.34',
    )
  })

  test('should format numbers with decimal length', () => {
    expect(formatNumericTypeString('123.456', Number.MAX_SAFE_INTEGER.toString().length, 2)).toBe(
      '123.45',
    )
    expect(formatNumericTypeString('123.4', Number.MAX_SAFE_INTEGER.toString().length, 2)).toBe(
      '123.4',
    )
    expect(formatNumericTypeString('123', Number.MAX_SAFE_INTEGER.toString().length, 2)).toBe('123')
    expect(
      formatNumericTypeString('123.123456', Number.MAX_SAFE_INTEGER.toString().length, 3),
    ).toBe('123.123')
  })

  test('should format numbers with integer length limit', () => {
    expect(formatNumericTypeString('123456', 3)).toBe('123')
    expect(formatNumericTypeString('12', 3)).toBe('12')
    expect(formatNumericTypeString('1234.56', 3, 2)).toBe('123.56')
  })

  test('should remove leading dot', () => {
    expect(formatNumericTypeString('.123')).toBe('123')
    expect(formatNumericTypeString('.123', Number.MAX_SAFE_INTEGER.toString().length, 2)).toBe(
      '123',
    )
  })

  test('should handle negative numbers when allowNegative is true', () => {
    expect(
      formatNumericTypeString('-123', Number.MAX_SAFE_INTEGER.toString().length, 0, true),
    ).toBe('-123')
    expect(
      formatNumericTypeString('-123.45', Number.MAX_SAFE_INTEGER.toString().length, 2, true),
    ).toBe('-123.45')
    expect(
      formatNumericTypeString('-123.456', Number.MAX_SAFE_INTEGER.toString().length, 2, true),
    ).toBe('-123.45')
    expect(
      formatNumericTypeString('-0.5', Number.MAX_SAFE_INTEGER.toString().length, 2, true),
    ).toBe('-0.5')
  })

  test('should remove negative sign when allowNegative is false', () => {
    expect(
      formatNumericTypeString('-123', Number.MAX_SAFE_INTEGER.toString().length, 0, false),
    ).toBe('123')
    expect(
      formatNumericTypeString('-123.45', Number.MAX_SAFE_INTEGER.toString().length, 2, false),
    ).toBe('123.45')
  })

  test('should handle negative numbers with integer length limit', () => {
    expect(formatNumericTypeString('-123456', 3, 0, true)).toBe('-123')
    expect(formatNumericTypeString('-12', 3, 0, true)).toBe('-12')
    expect(formatNumericTypeString('-1234.56', 3, 2, true)).toBe('-123.56')
  })

  test('should handle multiple negative signs correctly', () => {
    expect(
      formatNumericTypeString('--123', Number.MAX_SAFE_INTEGER.toString().length, 0, true),
    ).toBe('-123')
    expect(
      formatNumericTypeString('-12-3', Number.MAX_SAFE_INTEGER.toString().length, 0, true),
    ).toBe('-123')
    expect(
      formatNumericTypeString('1-23', Number.MAX_SAFE_INTEGER.toString().length, 0, true),
    ).toBe('123')
  })

  test('should handle edge cases', () => {
    expect(formatNumericTypeString('')).toBe('')
    expect(formatNumericTypeString('0')).toBe('0')
    expect(formatNumericTypeString('-0', Number.MAX_SAFE_INTEGER.toString().length, 0, true)).toBe(
      '-0',
    )
    expect(formatNumericTypeString('abc')).toBe('')
    expect(formatNumericTypeString('-', Number.MAX_SAFE_INTEGER.toString().length, 0, true)).toBe(
      '-',
    )
  })
})

describe('minAndMax', () => {
  test('should limit value by min', () => {
    expect(minAndMax(5, 10)).toBe(10)
    expect(minAndMax(10, 10)).toBe(10)
    expect(minAndMax(15, 10)).toBe(15)
  })

  test('should limit value by max', () => {
    expect(minAndMax(5, undefined, 10)).toBe(5)
    expect(minAndMax(10, undefined, 10)).toBe(10)
    expect(minAndMax(15, undefined, 10)).toBe(10)
  })

  test('should limit value by both min and max', () => {
    expect(minAndMax(5, 10, 20)).toBe(10)
    expect(minAndMax(15, 10, 20)).toBe(15)
    expect(minAndMax(25, 10, 20)).toBe(20)
  })

  test('should handle negative min and max', () => {
    expect(minAndMax(-15, -10, 10)).toBe(-10)
    expect(minAndMax(-5, -10, 10)).toBe(-5)
    expect(minAndMax(15, -10, 10)).toBe(10)
    expect(minAndMax(-20, -10)).toBe(-10)
  })

  test('should return value when no limits provided', () => {
    expect(minAndMax(5)).toBe(5)
    expect(minAndMax(-5)).toBe(-5)
    expect(minAndMax(0)).toBe(0)
  })
})

describe('useInputNumber', () => {
  test('should initialize with default values', () => {
    const { numberVal, safeNumberVal } = useInputNumber({})

    expect(numberVal.value).toBe(0)
    expect(safeNumberVal.value).toBe(0)
  })

  test('should initialize with provided modelValue', () => {
    const { numberVal, safeNumberVal } = useInputNumber({ modelValue: 10 })

    expect(numberVal.value).toBe(10)
    expect(safeNumberVal.value).toBe(10)
  })

  test('should initialize with string modelValue', () => {
    const { numberVal, safeNumberVal } = useInputNumber({ modelValue: '25' })

    expect(numberVal.value).toBe(25)
    expect(safeNumberVal.value).toBe(25)
  })

  test('should handle negative modelValue', () => {
    const { numberVal, safeNumberVal } = useInputNumber({ modelValue: -10, allowNegative: true })

    expect(numberVal.value).toBe(-10)
    expect(safeNumberVal.value).toBe(-10)
  })

  test('should add value correctly', () => {
    const { numberVal, onAdd } = useInputNumber({ modelValue: 5, step: 2 })

    expect(numberVal.value).toBe(5)
    const newVal = onAdd()
    expect(newVal).toBe(7)
    expect(numberVal.value).toBe(7)
  })

  test('should reduce value correctly', () => {
    const { numberVal, onReduce } = useInputNumber({ modelValue: 10, step: 3 })

    expect(numberVal.value).toBe(10)
    const newVal = onReduce()
    expect(newVal).toBe(7)
    expect(numberVal.value).toBe(7)
  })

  test('should reduce to negative value when allowNegative is true', () => {
    const { numberVal, onReduce } = useInputNumber({
      modelValue: 5,
      step: 10,
      min: -20,
      allowNegative: true,
    })

    expect(numberVal.value).toBe(5)
    const newVal = onReduce()
    expect(newVal).toBe(-5)
    expect(numberVal.value).toBe(-5)
  })

  test('should respect min limit', () => {
    const { numberVal, onReduce } = useInputNumber({ modelValue: 5, step: 10, min: 0 })

    expect(numberVal.value).toBe(5)
    const newVal = onReduce()
    expect(newVal).toBe(0)
    expect(numberVal.value).toBe(0)
  })

  test('should respect max limit', () => {
    const { numberVal, onAdd } = useInputNumber({ modelValue: 15, step: 10, max: 20 })

    expect(numberVal.value).toBe(15)
    const newVal = onAdd()
    expect(newVal).toBe(20)
    expect(numberVal.value).toBe(20)
  })

  test('should format decimal correctly', () => {
    const { numberVal, onAdd } = useInputNumber({
      modelValue: 0,
      step: 0.1,
      decimalLength: 2,
      min: 0,
    })

    expect(numberVal.value).toBe(0)
    onAdd()
    expect(numberVal.value).toBe(0.1)
    onAdd()
    expect(numberVal.value).toBe(0.2)
  })

  test('should format value string correctly', () => {
    const { getFormatVal } = useInputNumber({ intLength: 3, decimalLength: 2 })

    expect(getFormatVal('123.456')).toBe('123.45')
    expect(getFormatVal('1234.56')).toBe('123.56')
    expect(getFormatVal('12.3')).toBe('12.3')
  })

  test('should format negative value string when allowNegative is true', () => {
    const { getFormatVal } = useInputNumber({
      intLength: 3,
      decimalLength: 2,
      allowNegative: true,
    })

    expect(getFormatVal('-123.456')).toBe('-123.45')
    expect(getFormatVal('-1234.56')).toBe('-123.56')
    expect(getFormatVal('-12.3')).toBe('-12.3')
  })

  test('should not format negative value string when allowNegative is false', () => {
    const { getFormatVal } = useInputNumber({
      intLength: 3,
      decimalLength: 2,
      allowNegative: false,
    })

    expect(getFormatVal('-123.456')).toBe('123.45')
    expect(getFormatVal('-1234.56')).toBe('123.56')
  })

  test('should not update value when updateValue is false', () => {
    const { numberVal, onAdd } = useInputNumber({ modelValue: 5, step: 2 })

    expect(numberVal.value).toBe(5)
    const newVal = onAdd(false)
    expect(newVal).toBe(7)
    expect(numberVal.value).toBe(5) // value should not be updated
  })

  test('should handle complex scenario with negative numbers', () => {
    const { numberVal, onAdd, onReduce } = useInputNumber({
      modelValue: 0,
      step: 5,
      min: -20,
      max: 20,
      allowNegative: true,
    })

    expect(numberVal.value).toBe(0)

    // Add to positive
    onAdd()
    expect(numberVal.value).toBe(5)
    onAdd()
    expect(numberVal.value).toBe(10)
    onAdd()
    expect(numberVal.value).toBe(15)

    // Try to exceed max
    onAdd()
    expect(numberVal.value).toBe(20)
    onAdd()
    expect(numberVal.value).toBe(20) // capped at max

    // Reduce to negative
    onReduce()
    onReduce()
    onReduce()
    onReduce()
    expect(numberVal.value).toBe(0)
    onReduce()
    expect(numberVal.value).toBe(-5)
    onReduce()
    expect(numberVal.value).toBe(-10)

    // Try to exceed min
    onReduce()
    onReduce()
    onReduce()
    expect(numberVal.value).toBe(-20)
    onReduce()
    expect(numberVal.value).toBe(-20) // capped at min
  })
})
