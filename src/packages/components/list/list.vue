<template>
  <view :class="ns.b()">
    <slot></slot>
    <Loadmore v-if="status" :status="status" :config="loadStatusConfig" />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import Loadmore, { LoadStatus } from '../loadmore/loadmore.vue'

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

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-list-wrapper {
  width: 100%;
}
</style>
