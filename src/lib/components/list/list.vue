<template>
  <view class="width-full" :class="computedClass('list-wrapper')">
    <slot></slot>
    <Loadmore v-if="status" :status="status" :config="loadStatusConfig" />
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { computedClass } from '../../utils/style'
import Loadmore, { LoadStatus } from '../loadmore/loadmore.vue'

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
