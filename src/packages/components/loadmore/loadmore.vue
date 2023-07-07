<template>
  <view :class="ns.b()">
    <LoadingIcon v-if="status === 'loading'" :size="iconSize" :color="color" />
    <text v-if="showText" :class="ns.e('text')" :style="{ color: textColor }">
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
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import LoadingIcon from '../loading-icon/loading-icon.vue'
import { loadMoreProps, LoadStatus } from './props'

const ns = useNamespace('loadmore')

const props = defineProps(loadMoreProps)

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
