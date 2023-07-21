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
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import { cellEmits, cellProps } from './props'

const ns = useNamespace('cell')

const props = defineProps(cellProps)
const emit = defineEmits(cellEmits)

const onClick = (event: MouseEvent) => {
  if (!props.clickable && !props.isLink) return
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './cell.scss';
</style>
