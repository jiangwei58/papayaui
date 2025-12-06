<template>
  <view :class="ns.b()">
    <slot></slot>
    <LoadMore v-if="status" :status="status" :config="loadStatusConfig" />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import LoadMore from '../loadmore/loadmore.vue'
import type { LoadStatus } from '../loadmore/props'

export interface ListProps {
  status?: keyof LoadStatus
  loadStatusConfig?: LoadStatus
}

const ns = useNamespace('list-wrapper')

withDefaults(defineProps<ListProps>(), {
  status: undefined,
  loadStatusConfig: () => ({ loadmore: '', loading: '加载中...', nomore: '没有更多了' }),
})
</script>

<style lang="scss">
@import './list.scss';
</style>
