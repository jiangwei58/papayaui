<template>
  <view class="list-wrapper width-full">
    <slot></slot>
    <WeiLoadmore v-if="status" :status="status" :config="loadStatusConfig" />
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import WeiLoadmore, { LoadStatus } from '../wei-loadmore/wei-loadmore.vue'

interface OwnProps {
  status?: keyof LoadStatus
  loadStatusConfig?: LoadStatus
}

const props = withDefaults(defineProps<OwnProps>(), {
  status: undefined,
  loadStatusConfig: () => ({ loadmore: '', loading: '加载中...', nomore: '没有更多了' }),
})

const { status } = toRefs(props)
</script>

<style lang="scss" scoped></style>
