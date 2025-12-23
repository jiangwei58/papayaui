import { describe, expect, test, vi } from 'vitest'
import { reactive } from 'vue'
import { useModel } from '.'

describe('useModel test', () => {
  test('should use default value when no value prop provided', () => {
    const props = reactive<{ modelValue?: string }>({})
    const emit = vi.fn()
    const model = useModel(props, 'modelValue', emit, 'default')

    expect(model.value).toBe('default')
  })

  test('should use external value when value prop provided', () => {
    const props = reactive({ modelValue: 'external' })
    const emit = vi.fn()
    const model = useModel(props, 'modelValue', emit)

    expect(model.value).toBe('external')
  })

  test('should update internal value when no external value', () => {
    const props = reactive<{ modelValue?: string }>({})
    const emit = vi.fn()
    const model = useModel(props, 'modelValue', emit, 'initial')

    model.value = 'updated'
    expect(model.value).toBe('updated')
  })

  test('should emit update event when value changes', () => {
    const props = reactive<{ modelValue?: string }>({})
    const emit = vi.fn()
    const model = useModel(props, 'modelValue', emit, 'initial')

    model.value = 'new value'
    expect(emit).toHaveBeenCalledWith('update:modelValue', 'new value')
    expect(emit).toHaveBeenCalledTimes(1)
  })

  test('should work with external reactive value', () => {
    const props = reactive({ modelValue: 'external' })
    const emit = vi.fn()
    const model = useModel(props, 'modelValue', emit)

    expect(model.value).toBe('external')

    model.value = 'new value'
    expect(emit).toHaveBeenCalledWith('update:modelValue', 'new value')
    expect(model.value).toBe('external') // 仍然是外部值，因为外部值没变
  })

  test('should switch between internal and external values', () => {
    const props = reactive({ modelValue: 'external' as string | undefined })
    const emit = vi.fn()
    const model = useModel(props, 'modelValue', emit, 'default')

    expect(model.value).toBe('external')

    // 模拟外部值变为 undefined
    props.modelValue = undefined
    expect(model.value).toBe('default')
  })

  test('should work with number type', () => {
    const props = reactive<{ count?: number }>({})
    const emit = vi.fn()
    const model = useModel(props, 'count', emit, 0)

    expect(model.value).toBe(0)

    model.value = 42
    expect(model.value).toBe(42)
    expect(emit).toHaveBeenCalledWith('update:count', 42)
  })

  test('should work with object type', () => {
    const props = reactive<{ data?: { name: string } }>({})
    const emit = vi.fn()
    const defaultObj = { name: 'test' }
    const model = useModel(props, 'data', emit, defaultObj)

    expect(model.value).toEqual({ name: 'test' })

    const newObj = { name: 'updated' }
    model.value = newObj
    expect(model.value).toEqual({ name: 'updated' })
    expect(emit).toHaveBeenCalledWith('update:data', newObj)
  })

  test('should work with array type', () => {
    const props = reactive<{ items?: string[] }>({})
    const emit = vi.fn()
    const model = useModel<string[]>(props, 'items', emit, [])

    expect(model.value).toEqual([])

    model.value = ['a', 'b', 'c']
    expect(model.value).toEqual(['a', 'b', 'c'])
    expect(emit).toHaveBeenCalledWith('update:items', ['a', 'b', 'c'])
  })

  test('should handle undefined default value', () => {
    const props = reactive<{ value?: string }>({})
    const emit = vi.fn()
    const model = useModel(props, 'value', emit)

    expect(model.value).toBeUndefined()

    model.value = 'value'
    expect(model.value).toBe('value')
  })

  test('should work with multiple properties', () => {
    const props = reactive<{ name?: string; age?: number }>({})
    const emit = vi.fn()

    const name = useModel(props, 'name', emit, 'John')
    const age = useModel(props, 'age', emit, 18)

    expect(name.value).toBe('John')
    expect(age.value).toBe(18)

    name.value = 'Jane'
    age.value = 20

    expect(emit).toHaveBeenCalledWith('update:name', 'Jane')
    expect(emit).toHaveBeenCalledWith('update:age', 20)
  })
})
