<template>
  <view
    :class="[
      ns.b(),
      ns.is('clickable', clickable || isLink),
      ns.is('required', required),
      ns.is('border', border),
      `items-${center ? 'center' : 'start'}`,
      customClass,
    ]"
    @click="onClick"
  >
    <Icon v-if="icon" :name="icon" block :class="ns.e('icon')" />
    <view
      v-if="!!title || $slots.title"
      :class="[ns.e('title'), titleClass]"
      :style="{ flex: titleWidth ? `0 ${getUnitValue(titleWidth)}` : '1' }"
    >
      <slot v-if="$slots.title" name="title" />
      <text v-else>{{ title }}</text>
    </view>
    <view :class="[ns.e('value'), valueClass]">
      <slot v-if="$slots.default" />
      <text v-else>{{ value }}</text>
      <view v-if="errorMessage" :class="ns.e('error-message')" :style="{ textAlign: valueAlign }">
        {{ errorMessage }}
      </view>
    </view>
    <slot v-if="$slots['right-icon'] && !isLink" name="right-icon" />
    <Icon v-if="isLink" :class="ns.e('icon-right')" name="right" size="18px" block />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils/common'
import Icon from '../icon/icon.vue'

export interface CellProps {
  /** 标题 */
  title?: string
  /** 内容 */
  value?: string | number | boolean
  /** 标题宽度 */
  titleWidth?: string
  /** 是否开启点击反馈 */
  clickable?: boolean
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
  /** 是否显示下边框 */
  border?: boolean
  /** 根节点样式类 */
  customClass?: string
  /** 标题样式类 */
  titleClass?: string
  /** 右侧内容样式类 */
  valueClass?: string
}

const ns = useNamespace('cell')

const props = withDefaults(defineProps<CellProps>(), {
  title: '',
  value: '',
  titleWidth: undefined,
  icon: '',
  valueAlign: 'right',
  errorMessage: '',
  border: true,
  customClass: '',
  titleClass: '',
  valueClass: '',
})

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()

const onClick = (event: MouseEvent) => {
  if (!props.clickable && !props.isLink) return
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cell {
  $padding-x: 16px;

  display: flex;
  position: relative;
  padding: _var(cell-padding-y, 10px) _var(cell-padding-x, $padding-x);
  background-color: _var(cell-bg-color, #fff);
  color: _var(cell-color, _var(color-black-3));
  font-size: _var(cell-font-size, 14px);
  line-height: _var(cell-line-height, 24px);
  overflow: hidden;
  &__title,
  &__value {
    flex: 1;
  }

  &__icon,
  &__title {
    color: _var(cell-title-color, _var(color-black));
  }

  &__icon {
    margin-right: 4rpx;
  }

  &__value {
    position: relative;
    overflow: hidden;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
    @include _setVar(textarea-padding, 0);
    @include _setVar(textarea-color, _var(color-primary));
  }

  &__icon-right {
    font-weight: bold;
    margin-left: 8rpx;
  }

  &__error-message {
    color: _var(color-error);
    font-size: 12px;
    text-align: left;
  }

  &--clickable:active {
    background-color: _var(color-gray);
  }

  &--clickable &__value {
    color: _var(cell-value-color, _var(color-primary));
  }

  &--required::before {
    position: absolute;
    left: 8px;
    color: #ee0a24;
    font-size: 14px;
    content: '*';
  }

  &--border::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: _var(cell-padding-x, $padding-x);
    bottom: 0;
    left: _var(cell-padding-x, $padding-x);
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
