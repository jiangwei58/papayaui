<template>
  <view :class="[ns.b(), ns.is('dot', dot), ns.is('fixed', !!$slots.default)]">
    <slot></slot>
    <view
      v-if="visible"
      :class="ns.e('content')"
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
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import { badgeProps } from './props'

const ns = useNamespace('badge')

const props = defineProps(badgeProps)

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
  &__content {
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
  &--dot &__content {
    padding: 0;
    width: 8px;
    height: 8px;
  }
  &--fixed &__content {
    position: absolute;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
}
</style>
