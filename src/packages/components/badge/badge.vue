<template>
  <view
    :class="
      computedClass('badge', {
        'badge--dot': dot,
        'badge--fixed': !!$slots.default,
      })
    "
  >
    <slot></slot>
    <view
      v-if="visible"
      :class="computedClass('badge-content')"
      :style="{
        backgroundColor: color,
        top: getUnitValue(offset[1].toString()),
        right: getUnitValue(offset[0].toString()),
      }"
    >
      <slot v-if="$slots.content" name="content"></slot>
      <text v-else>{{ value }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { getUnitValue } from '../../utils'
import { computedClass, PREFIX } from '../../utils/style'

export interface BadgeProps {
  /** 徽标内容 */
  content?: number | string
  /** 徽标背景颜色 */
  color?: CSSProperties['color']
  /** 是否展示为小点 */
  dot?: boolean
  /** max	最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效 */
  max?: number
  /** 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为rpx */
  offset?: Array<number | string>
  /** 当 content 为数字 0 或字符串 '0' 时，是否展示徽标 */
  showZero?: boolean
  /** 是否显示 */
  show?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  content: undefined,
  color: `var(--${PREFIX}-color-danger)`,
  max: undefined,
  offset: () => [0, 0],
  showZero: false,
  show: true,
})

const visible = computed<boolean>(() => {
  if (!props.showZero && Number(props.content) === 0) return false
  return props.show
})

const value = computed(() => {
  if (props.dot) return ''
  let num = Number(props.content)
  if (Number.isNaN(num)) return props.content
  if (typeof props.max !== 'undefined' && num > props.max) {
    return `${props.max}+`
  }
  return num
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-badge {
  position: relative;
  display: inline-block;
  &-content {
    position: relative;
    display: flex;
    flex-direction: row;
    line-height: 11px;
    text-align: center;
    font-size: 11px;
    color: #fff;
    padding: 2px 5px;
    border-radius: 100px;
  }
  &--dot &-content {
    padding: 0;
    width: 8px;
    height: 8px;
  }
  &--fixed &-content {
    position: absolute;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
}
</style>
