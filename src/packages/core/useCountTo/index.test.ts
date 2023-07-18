import { describe, expect, test, vi } from 'vitest'
import { useCountTo } from '.'

describe('useCountTo test', () => {
  const commonProps = {
    startNum: 0,
    endNum: 100,
    duration: 500,
  }

  test('should start count from startNum to endNum', async () => {
    const progressFn = vi.fn()
    const { numValue, start } = useCountTo({
      ...commonProps,
      onProgress() {
        progressFn()
      },
    })

    expect(numValue.value).toBe(commonProps.endNum)
    expect(progressFn).not.toHaveBeenCalled()

    start()
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration))

    expect(numValue.value).toBe(commonProps.endNum)
    expect(progressFn).toHaveBeenCalled()
  })

  test('should pause and resume count', async () => {
    const { numValue, start, pause, resume } = useCountTo(commonProps)

    expect(numValue.value).toBe(commonProps.endNum)

    start()
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration / 2))

    pause()
    const pausedValue = numValue.value
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration / 2))

    expect(numValue.value).toBe(pausedValue)

    resume()
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration / 2))

    expect(numValue.value).not.toBe(pausedValue)
  })

  test('should restart count from startNum', async () => {
    const { numValue, start, restart } = useCountTo(commonProps)

    expect(numValue.value).toBe(commonProps.endNum)

    start()
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration / 2))

    restart()
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration))

    expect(numValue.value).toBe(commonProps.endNum)
  })

  test('should reset count to startNum', async () => {
    const { numValue, start, reset } = useCountTo(commonProps)

    expect(numValue.value).toBe(commonProps.endNum)

    start()
    await new Promise((resolve) => setTimeout(resolve, commonProps.duration / 2))

    reset()

    expect(numValue.value).toBe(commonProps.startNum)
  })
})
