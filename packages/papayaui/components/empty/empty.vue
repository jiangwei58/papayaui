<template>
  <view :class="ns.b()">
    <slot v-if="$slots.image" name="image" />
    <view v-else :class="ns.b('image')">
      <image v-if="/https?:\/\//.test(image)" :src="image" mode="widthFix" style="width: 100%" />
      <image
        v-if="image === 'default'"
        src="../../images/empty-image-default.png"
        mode="widthFix"
        style="width: 100%"
      />
      <image
        v-else-if="image === 'error'"
        src="../../images/empty-image-error.png"
        mode="widthFix"
        style="width: 100%"
      />
      <image
        v-else-if="image === 'search'"
        src="../../images/empty-image-search.png"
        mode="widthFix"
        style="width: 100%"
      />
    </view>
    <slot v-if="$slots.description" name="description" />
    <text v-else :class="ns.b('description')">{{ description }}</text>
    <slot v-if="$slots.default" />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import { emptyProps } from './props'

const ns = useNamespace('empty')

defineProps(emptyProps)
</script>

<style lang="scss">
@import './empty.scss';
</style>
