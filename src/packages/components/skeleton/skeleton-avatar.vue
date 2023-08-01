<template>
  <view
    :class="[ns.b(), ns.m(avatarShape)]"
    :style="ns.style({ width: avatarSize, height: avatarSize })"
  ></view>
</template>

<script setup lang="ts">
import { skeletonAvatarProps } from './props'
import useNamespace from '../../core/useNamespace'

const ns = useNamespace('skeleton-avatar')

defineProps(skeletonAvatarProps)
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
