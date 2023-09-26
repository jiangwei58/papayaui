<template>
  <view :class="[ns.b(), ns.is('full-page', fullPage)]" @tap="onClick">
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
import { LoadStatusEnum } from '../../core'
import useNamespace from '../../core/useNamespace'
import LoadingIcon from '../loading-icon/loading-icon.vue'
import { loadMoreEmits, type LoadStatus } from './props'
import { loadMoreProps } from './props'

const ns = useNamespace('loadmore')

const props = defineProps(loadMoreProps)
const emit = defineEmits(loadMoreEmits)

const localConfig = computed<LoadStatus>(() => {
  return {
    loadmore: '轻轻上拉',
    loading: '加载中...',
    nomore: '没有更多了',
    ...props.config,
  }
})

const onClick = () => {
  if (props.status === LoadStatusEnum.LOADMORE) {
    emit('next')
  }
}
</script>

<style lang="scss">
@import './loadmore.scss';
</style>
