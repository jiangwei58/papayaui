<template>
  <view
    :class="[
      computedClass('cell', { cell__clickable: isLink, 'cell--required': required }),
      `items-${center ? 'center' : 'start'}`,
    ]"
    class="flex"
    hover-class="clickable-hover"
    :style="{ width: titleWidth ? getUnitValue(titleWidth) : 'auto' }"
    @click="emit('click')"
  >
    <Icon v-if="icon" :name="icon" block class="mr-4" />
    <view v-if="!!title" :class="computedClass('cell__title')">
      <text>{{ title }}</text>
    </view>
    <view :class="computedClass('cell__value')">
      <slot v-if="$slots.default" />
      <text v-else>{{ value }}</text>
    </view>
    <Icon
      v-if="isLink"
      :class="computedClass('cell__icon')"
      name="right"
      size="18px"
      class="ml-8"
      block
    />
  </view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '@/weiui/utils/common'
import { computedClass } from '@/weiui/utils/style'
import Icon from '../icon/icon.vue'

export interface CellProps {
  title?: string
  value?: string
  titleWidth?: string
  isLink?: boolean
  required?: boolean
  center?: boolean
  icon?: string // 前面的图标
}

defineProps<CellProps>()

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cell {
  position: relative;
  padding: var(--cell-padding-y) var(--cell-padding-x);
  background-color: var(--cell-bg-color);
  color: var(--color-text-black);
  font-size: var(--cell-font-size);
  line-height: var(--cell-line-height);
  overflow: hidden;
  &.#{$prefix}-cell__clickable:active {
    background-color: var(--color-page-bg-gray);
  }
  &.#{$prefix}-cell--required::before {
    position: absolute;
    left: 8px;
    color: #ee0a24;
    font-size: 14px;
    content: '*';
  }
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: var(--cell-padding-x);
    bottom: 0;
    left: var(--cell-padding-x);
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.#{$prefix}-cell__title,
.#{$prefix}-cell__value {
  flex: 1;
}
.#{$prefix}-cell__value {
  position: relative;
  overflow: hidden;
  color: var(--color-text-black-3);
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}
.#{$prefix}-cell__icon {
  font-weight: bold;
}
</style>
