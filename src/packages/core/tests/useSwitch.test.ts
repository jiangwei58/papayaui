import { describe, expect, test } from 'vitest'
import useSwitch from '../useSwitch'
import { nextTick, ref } from 'vue'

describe('useSwitch test', () => {
  test('初始值是否正确', () => {
    const { checked, isChecked } = useSwitch({})

    expect(checked.value).toBeTypeOf('boolean')
    expect(isChecked.value).toBe(false)
  })

  test('默认值及赋值', async () => {
    const customValue = ref<boolean>(true)
    const { checked, isChecked } = useSwitch({ modelValue: customValue })

    expect(checked.value).toBeTypeOf('boolean')
    expect(isChecked.value).toBe(true)
    customValue.value = false
    await nextTick()
    expect(checked.value).toBe(false)
    expect(isChecked.value).toBe(false)
  })

  test.each([
    [true, false],
    [1, 0],
    ['是', '否'],
  ])('自定义值(%s, %s)', (activeValue, inactiveValue) => {
    const { checked, isChecked, onToggle } = useSwitch({
      activeValue,
      inactiveValue,
    })

    expect(checked.value).toBe(inactiveValue)
    expect(isChecked.value).toBe(false)
    expect(onToggle()).toBe(activeValue)
    expect(checked.value).toBe(activeValue)
    expect(isChecked.value).toBe(true)
  })
})
