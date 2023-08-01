import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { defaultNamespace } from '../../core/useNamespace'

export const loadMoreProps = {
  /**
   *  加载状态配置{loadmore, loading, nomore}
   */
  config: Object as PropType<Partial<LoadStatus>>,
  /**
   *  当前状态
   */
  status: {
    type: String as PropType<keyof LoadStatus>,
    default: 'loadmore',
  },
  /**
   *  加载图标颜色
   */
  color: {
    type: String as PropType<CSSProperties['color']>,
    default: `var(--${defaultNamespace}-color-primary)`,
  },
  /**
   *  文字颜色
   */
  textColor: {
    type: String as PropType<CSSProperties['color']>,
    default: '#646566',
  },
  /**
   *  加载图标大小
   */
  iconSize: {
    type: String,
    default: '20px',
  },
  /**
   *  显示文字
   */
  showText: {
    type: Boolean,
    default: true,
  },
}

export const loadMoreEmits = {}

export interface LoadStatus {
  loadmore: string
  loading: string
  nomore: string
}

export type LoadMoreProps = ExtractPropTypes<typeof loadMoreProps>
export type LoadMoreEmits = typeof loadMoreEmits
