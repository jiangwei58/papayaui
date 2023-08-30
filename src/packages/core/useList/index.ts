import { computed, reactive, toRefs } from 'vue'

/** 加载状态 */
export enum LoadStatusEnum {
  /** 加载更多 */
  LOADMORE = 'loadmore',
  /** 加载中 */
  LOADING = 'loading',
  /** 没有更多了 */
  NOMORE = 'nomore',
}

export interface UseListData<T> {
  /** 列表数据 */
  list: T[]
  /** 加载状态 */
  loadStatus: LoadStatusEnum
  /** 页码 */
  pageNumber: number
  /** 每页数量 */
  pageSize: number
  /** 限制列表总数量，超过则不会触发加载 */
  limit?: number
}

export type UseListResult<T> = Pick<UseListData<T>, 'list'> &
  Partial<Pick<UseListData<T>, 'pageNumber' | 'pageSize'>>

export type UseListProps<T> = Partial<Pick<UseListData<T>, 'pageNumber' | 'pageSize' | 'limit'>>

export function useList<T = any>(props: UseListProps<T> = {}) {
  const state: UseListData<T> = reactive({
    list: [],
    loadStatus: LoadStatusEnum.LOADMORE,
    pageNumber: 0,
    pageSize: 10,
    ...props,
  })

  /** 是否加载中 */
  const loading = computed(() => {
    return state.loadStatus === LoadStatusEnum.LOADING
  })

  /** 是否空数据 */
  const isEmpty = computed(() => {
    return (
      state.loadStatus === LoadStatusEnum.NOMORE &&
      state.pageNumber === 0 &&
      state.list.length === 0
    )
  })

  /** 是否只有一页数据，无数据情况不算 */
  const onlyOnePage = computed(() => {
    return state.pageNumber === 0 && state.list.length > 0 && state.list.length < state.pageSize
  })

  const getListData = async (
    fun: () => UseListResult<T> | Promise<UseListResult<T>>,
  ): Promise<void> => {
    if (
      state.loadStatus === LoadStatusEnum.LOADING ||
      (state.loadStatus === LoadStatusEnum.NOMORE && state.pageNumber !== 0)
    ) {
      return
    }

    state.loadStatus = LoadStatusEnum.LOADING
    if (state.pageNumber === 0) {
      state.list = []
    }

    try {
      const res = await fun()
      if (typeof res.pageNumber === 'number') {
        state.pageNumber = res.pageNumber
      }
      const newList = state.pageNumber === 0 ? res.list : state.list.concat(res.list)
      // 最大数量限制（如有设置）
      if (typeof state.limit === 'number' && newList.length >= state.limit) {
        state.loadStatus = LoadStatusEnum.NOMORE
      } else {
        // 根据当前页加载的数量判断是否还有更多
        state.loadStatus =
          res.list.length >= state.pageSize ? LoadStatusEnum.LOADMORE : LoadStatusEnum.NOMORE
      }
      state.list = newList
    } catch (e) {
      state.loadStatus = LoadStatusEnum.LOADMORE
      return Promise.reject(e)
    }
  }

  const reset = () => {
    state.pageNumber = 0
    state.list = []
  }

  return {
    ...toRefs(state),
    loading,
    isEmpty,
    onlyOnePage,
    getListData,
    reset,
  }
}
