<template>
  <view class="width-full" :class="computedClass('list-wrapper')">
    <slot></slot>
    <Loadmore v-if="status" :status="status" :config="loadStatusConfig" />
  </view>
</template>

<script lang="ts" setup>
import { computedClass } from '../../utils/style'
import Loadmore, { LoadStatus } from '../loadmore/loadmore.vue'

export interface ListProps {
  status?: keyof LoadStatus
  loadStatusConfig?: LoadStatus
}

withDefaults(defineProps<ListProps>(), {
  status: undefined,
  loadStatusConfig: () => ({ loadmore: '', loading: '加载中...', nomore: '没有更多了' }),
})
</script>

<style lang="scss" scoped></style>
