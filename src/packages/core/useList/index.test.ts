import { describe, test, expect } from 'vitest'
import { LoadStatusEnum, useList } from '.'

interface ListItem {
  id: number
  name: string
}

const fetchListData = (pageNumber: number, pageSize: number, total: number) => {
  let num = total - pageNumber * pageSize
  if (num > pageSize) {
    num = pageSize
  }
  return new Promise<ListItem[]>((resolve) => {
    setTimeout(() => {
      const list = new Array(num).fill(0).map<ListItem>((_, index) => {
        const id = pageNumber * pageSize + index
        return {
          id,
          name: `列表数据${id}`,
        }
      })
      resolve(list)
    }, 300)
  })
}

describe('useList test', () => {
  test('should initial values is correct', () => {
    const { list, pageNumber, pageSize, loadStatus, loading, isEmpty, onlyOnePage, limit } =
      useList()

    expect(list.value).toEqual([])
    expect(pageNumber.value).toBe(0)
    expect(pageSize.value).toBe(10)
    expect(loadStatus.value).toBe(LoadStatusEnum.LOADMORE)
    expect(loading.value).toBe(false)
    expect(isEmpty.value).toBe(false)
    expect(onlyOnePage.value).toBe(false)
    expect(limit?.value).toBe(undefined)
  })

  test('should configuration is correct', () => {
    const { pageNumber, pageSize, limit } = useList({ pageNumber: 1, pageSize: 20, limit: 100 })

    expect(pageNumber.value).toBe(1)
    expect(pageSize.value).toBe(20)
    expect(limit?.value).toBe(100)
  })

  test('should request data is correct', async () => {
    const { list, pageNumber, pageSize, getListData } = useList()

    const getData = () => {
      return getListData(() =>
        fetchListData(pageNumber.value, pageSize.value, pageSize.value).then((res) => ({
          list: res,
        })),
      )
    }

    expect(list.value).toEqual([])
    expect(pageNumber.value).toBe(0)

    await getData()

    expect(list.value.length).toBe(pageSize.value)
    expect(list.value[0]).toHaveProperty('id')
    expect(list.value[0]).toHaveProperty('name')
  })

  test.each([
    { total: 0, onePage: false, empty: true },
    { total: 5, onePage: true, empty: false },
    { total: 10, onePage: false, empty: false },
    { total: 15, onePage: false, empty: false },
  ])('should request paging data is correct (total: $total)', async ({ total, onePage, empty }) => {
    const { list, pageNumber, pageSize, loadStatus, isEmpty, onlyOnePage, getListData } = useList()

    const getData = (pageNumber: number, pageSize: number, total: number) => {
      return getListData(() =>
        fetchListData(pageNumber, pageSize, total).then((res) => ({
          list: res,
        })),
      )
    }

    expect(list.value).toEqual([])
    expect(pageNumber.value).toBe(0)
    expect(isEmpty.value).toBe(false)
    expect(onlyOnePage.value).toBe(false)

    let pages = Math.ceil(total / pageSize.value)
    if (pages === 0) {
      pages = 1
    }
    let current = 0
    while (current < pages) {
      expect(loadStatus.value).toBe(LoadStatusEnum.LOADMORE)
      pageNumber.value = current
      await getData(current, pageSize.value, total)
      current++
    }

    expect(list.value.length).toBe(total)
    expect(isEmpty.value).toBe(empty)
    expect(onlyOnePage.value).toBe(onePage)
  })
})
