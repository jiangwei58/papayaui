<template>
  <view
    :class="[ns.b(), ns.m(avatarShape)]"
    :style="ns.style({ width: avatarSize, height: avatarSize })"
  ></view>
</template>

<script setup lang="ts">
import useNamespace from '../../core/useNamespace'
import { pickProps } from '../../utils'
import { skeletonProps } from '../skeleton'

const ns = useNamespace('skeleton-avatar')

defineProps(pickProps(skeletonProps, ['avatarSize', 'avatarShape']))
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-skeleton-avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin-right: 16px;
  background-color: _var(skeleton-title-paragraph-background, _var(color-active));

  &--round {
    border-radius: 50%;
  }
  &--square {
    border-radius: 3px;
  }
}
</style>
