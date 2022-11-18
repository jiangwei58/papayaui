import { computed, reactive, toRefs } from 'vue'

export enum LoadStatusEnum {
  LOADMORE = 'loadmore',
  LOADING = 'loading',
  NOMORE = 'nomore',
}

export interface UseListData<T> {
  list: T[]
  loadStatus: LoadStatusEnum
  pageNumber: number
  pageSize: number
  isEmpty?: boolean
  limit?: number
}

export type UseListResult<T> = Pick<UseListData<T>, 'list'> &
  Partial<Pick<UseListData<T>, 'pageNumber' | 'pageSize'>>

export default <T = any>(
  defaultData: Partial<Pick<UseListData<T>, 'pageNumber' | 'pageSize' | 'limit'>> = {},
) => {
  const state: UseListData<T> = reactive({
    list: [],
    loadStatus: LoadStatusEnum.LOADMORE,
    pageNumber: 0,
    pageSize: 10,
    isEmpty: false,
    ...defaultData,
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

  return {
    ...toRefs(state),
    loading,
    getListData,
  }
}
