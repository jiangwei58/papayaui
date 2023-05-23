import { computed, reactive, toRefs } from 'vue'

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
  /** 是否空数据 */
  isEmpty?: boolean
  /** 限制列表总数量，超过则不会触发加载 */
  limit?: number
}

export type UseListResult<T> = Pick<UseListData<T>, 'list'> &
  Partial<Pick<UseListData<T>, 'pageNumber' | 'pageSize'>>

export type UseListProps<T> = Partial<Pick<UseListData<T>, 'pageNumber' | 'pageSize' | 'limit'>>

export default <T = any>(props: UseListProps<T> = {}) => {
  const state: UseListData<T> = reactive({
    list: [],
    loadStatus: LoadStatusEnum.LOADMORE,
    pageNumber: 0,
    pageSize: 10,
    isEmpty: false,
    ...props,
  })

  const loading = computed<boolean>(() => {
    return state.loadStatus === LoadStatusEnum.LOADING
  })

  const getListData = async (fun: () => Promise<UseListResult<T>>) => {
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
      if (typeof res.pageNumber !== 'undefined') {
        state.pageNumber = res.pageNumber
      }
      const newList = state.pageNumber === 0 ? res.list : state.list.concat(res.list)
      // 判定数量限制
      if (typeof state.limit !== 'undefined' && newList.length >= state.limit) {
        state.loadStatus = LoadStatusEnum.NOMORE
      } else {
        state.loadStatus =
          res.list.length >= state.pageSize ? LoadStatusEnum.LOADMORE : LoadStatusEnum.NOMORE
      }
      // 是否为空
      state.isEmpty = state.pageNumber === 0 && res.list.length === 0
      state.list = newList
    } catch (e) {
      state.loadStatus = LoadStatusEnum.LOADMORE
    }
  }

  const reset = () => {
    state.pageNumber = 0
    state.list = []
  }

  return {
    ...toRefs(state),
    loading,
    getListData,
    reset,
  }
}
