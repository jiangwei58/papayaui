<template>
  <view
    :class="[ns.b(), ns.is('dot', dot), ns.is('border', border), ns.is('fixed', !!$slots.default)]"
  >
    <slot></slot>
    <view
      v-if="visible"
      :class="ns.e('content')"
      :style="
        ns.style({
          backgroundColor: color,
          top: getUnitValue(offset[1].toString()),
          right: getUnitValue(offset[0].toString()),
          borderColor,
        })
      "
    >
      <slot v-if="$slots.content" name="content"></slot>
      <text v-else>{{ value }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useNamespace } from '@papayaui/core'
import { getUnitValue } from '@papayaui/utils'
import { computed } from 'vue'
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

<style lang="scss">
@import './badge.scss';
</style>
