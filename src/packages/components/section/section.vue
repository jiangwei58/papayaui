<template>
  <view
    :class="computedClass('section')"
    class="flex items-center"
    :style="{ backgroundColor: bgColor }"
  >
    <view :class="computedClass('section-line')"></view>
    <view :class="computedClass('section-title')">
      <slot v-if="$slots.title" name="title" />
      <text v-else>{{ title }}</text>
    </view>
    <slot v-if="$slots.default"></slot>
  </view>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { computedClass } from '../../utils/style'

export interface SectionProps {
  title?: string
  bgColor?: CSSProperties['background-color']
}

withDefaults(defineProps<SectionProps>(), {
  title: '',
  bgColor: '#fff',
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-section {
  font-weight: 400;
  padding: _var(section-padding);
  .#{$prefix}-section-line {
    width: 4px;
    height: 12px;
    border-radius: 10px;
    margin-right: 6px;
    background-color: _var(color-primary);
  }
  .#{$prefix}-section-title {
    font-size: _var(section-font-size);
    color: _var(color-text-black);
  }
}
</style>
