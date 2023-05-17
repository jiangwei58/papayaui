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

export interface EmptyProps {
  /** 图片类型, 支持图片url */
  image?: 'default' | 'error' | 'search' | string
  /** 图片下方的描述文字 */
  description?: string
}

const ns = useNamespace('empty')

withDefaults(defineProps<EmptyProps>(), {
  image: 'default',
  description: '',
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: _var(empty-padding, 32px 0);

  &-image {
    $imageSize: _var(empty-image-size, 160px);
    width: $imageSize;
    height: $imageSize;
  }

  &-description {
    margin-top: 16px;
    padding: 0 60px;
    color: #969799;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
