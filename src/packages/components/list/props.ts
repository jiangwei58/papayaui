import type { ExtractPropTypes, PropType } from 'vue'
import type { LoadStatus } from '../loadmore/props'

export const listProps = {
  /**
   * 加载状态
   */
  status: String as PropType<keyof LoadStatus>,
  /**
   * 加载状态配置
   */
  loadStatusConfig: {
    type: Object as PropType<LoadStatus>,
    default: () => ({ loadmore: '', loading: '加载中...', nomore: '没有更多了' }),
  },
}

export type ListProps = ExtractPropTypes<typeof listProps>
