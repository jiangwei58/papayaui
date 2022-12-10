<template>
  <view :class="computedClass('loadmore')">
    <LoadingIcon v-if="status === 'loading'" :size="iconSize" :color="color" />
    <text v-if="showText" :class="computedClass('loadmore__text')" :style="{ color: textColor }">
      {{
        status === 'loadmore'
          ? localConfig.loadmore
          : status === 'loading'
          ? localConfig.loading
          : localConfig.nomore
      }}
    </text>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { computedClass, PREFIX } from '../../utils/style'
import LoadingIcon from '../loading-icon/loading-icon.vue'

export interface LoadStatus {
  loadmore: string
  loading: string
  nomore: string
}

export interface LoadmoreProps {
  /** 加载状态配置{loadmore, loading, nomore} */
  config?: Partial<LoadStatus>
  /** 当前状态 */
  status?: keyof LoadStatus
  /** 加载图标颜色 */
  color?: CSSProperties['color']
  /** 文字颜色 */
  textColor?: CSSProperties['color']
  /** 加载图标大小 */
  iconSize?: string
  /** 显示文字 */
  showText?: boolean
}

const props = withDefaults(defineProps<LoadmoreProps>(), {
  config: undefined,
  status: 'loadmore',
  color: `var(--${PREFIX}-color-primary)`,
  textColor: '#646566',
  iconSize: '20px',
  showText: true,
})

const localConfig = computed<LoadStatus>(() => {
  return {
    loadmore: '轻轻上拉',
    loading: '加载中...',
    nomore: '没有更多了',
    ...props.config,
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-loadmore {
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  justify-content: center;
  &__text {
    font-size: 14px;
    margin-left: 8px;
  }
}
</style>
