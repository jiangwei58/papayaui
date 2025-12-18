import type { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import type { LoadStatusEnum } from '../../core'
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
  /**
   * 是否覆盖整个页面
   */
  fullPage: Boolean,
}

export const loadMoreEmits = {
  next: () => true,
}

export type LoadStatus = Record<LoadStatusEnum, string>

export type LoadMoreProps = ExtractPropTypes<typeof loadMoreProps>
export type LoadMorePropsPublic = ExtractPublicPropTypes<typeof loadMoreProps>

export type LoadMoreEmits = typeof loadMoreEmits
