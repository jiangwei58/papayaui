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
    <view v-if="!!title || $slots.title" :class="computedClass('cell__title')">
      <slot v-if="$slots.title" name="title" />
      <text v-else>{{ title }}</text>
    </view>
    <view :class="computedClass('cell__value')">
      <slot v-if="$slots.default" />
      <text v-else>{{ value }}</text>
      <view
        v-if="errorMessage"
        :class="computedClass('cell__error-message')"
        :style="{ textAlign: valueAlign }"
      >
        {{ errorMessage }}
      </view>
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
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'
import Icon from '../icon/icon.vue'

export interface CellProps {
  /** 标题 */
  title?: string
  /** 内容 */
  value?: string
  /** 标题宽度 */
  titleWidth?: string
  /** 是否显示箭头，为true同时有点击反馈 */
  isLink?: boolean
  /** 是否显示必填标识 */
  required?: boolean
  /** 内容居中 */
  center?: boolean
  /** 前面的图标 */
  icon?: string
  /** 内容对齐方式 */
  valueAlign?: 'left' | 'center' | 'right'
  /** 错误信息 */
  errorMessage?: string
}

withDefaults(defineProps<CellProps>(), {
  title: '',
  value: '',
  titleWidth: undefined,
  icon: '',
  valueAlign: 'right',
  errorMessage: '',
})

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cell {
  position: relative;
  padding: _var(cell-padding-y) _var(cell-padding-x);
  background-color: _var(cell-bg-color);
  color: _var(color-text-black);
  font-size: _var(cell-font-size);
  line-height: _var(cell-line-height);
  overflow: hidden;
  &.#{$prefix}-cell__clickable:active {
    background-color: _var(color-page-bg-gray);
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
    right: _var(cell-padding-x);
    bottom: 0;
    left: _var(cell-padding-x);
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
  color: _var(color-text-black-3);
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}
.#{$prefix}-cell__icon {
  font-weight: bold;
}
.#{$prefix}-cell__error-message {
  color: _var(color-error);
  font-size: 12px;
  text-align: left;
}
</style>
