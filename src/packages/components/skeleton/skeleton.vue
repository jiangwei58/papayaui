<template>
  <view :class="[ns.b(), ns.is('animate', animate && loading)]">
    <template v-if="loading">
      <SkeletonAvatar v-if="avatar" :avatar-size="avatarSize" :avatar-shape="avatarShape" />
      <view :class="ns.e('content')">
        <SkeletonTitle v-if="title" :round="round" :title-width="titleWidth" />
        <SkeletonParagraph
          v-for="(item, index) in rowList"
          :key="index"
          :round="round"
          :row-width="item.width"
        />
      </view>
    </template>

    <slot v-else />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { skeletonProps } from '.'
import useNamespace from '../../core/useNamespace'
import SkeletonAvatar from './skeleton-avatar.vue'
import SkeletonParagraph from './skeleton-paragraph.vue'
import SkeletonTitle from './skeleton-title.vue'

const ns = useNamespace('skeleton')

const props = defineProps(skeletonProps)

const rowList = computed(() => {
  const rowLength = Number(props.row)
  if (typeof rowLength !== 'number') {
    console.error('row value type error')
    return []
  }
  return new Array(rowLength).fill(0).map((_, index) => {
    let width = Array.isArray(props.rowWidth) ? props.rowWidth[index] : props.rowWidth
    // 最后一行默认短一点，好看一点
    if (index === rowLength - 1 && typeof width === 'undefined') {
      width = '60%'
    }
    return { width }
  })
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

@keyframes skeleton-animate {
  50% {
    opacity: 0.6;
  }
}

.#{$prefix}-skeleton {
  display: flex;
  padding: _var(skeleton-padding, 0 16px);

  &__content {
    width: 100%;
  }

  &--animate {
    animation: skeleton-animate 1.8s ease infinite;
  }
}
</style>
