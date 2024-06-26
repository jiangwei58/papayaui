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
    :hover-class="clickable || isLink ? ns.m('hover') : 'none'"
    @click="onClick"
  >
    <IconComponent v-if="icon" :class="ns.e('icon')" :name="icon" />
    <view
      v-if="!!title || $slots.title"
      :class="[ns.e('title'), titleClass]"
      :style="ns.style({ flex: titleWidth ? `0 ${getUnitValue(titleWidth)}` : undefined })"
    >
      <slot v-if="$slots.title" name="title" />
      <template v-else>
        <text>{{ title }}</text>
        <view v-if="label" :class="ns.e('label')">{{ label }}</view>
      </template>
    </view>
    <view
      :class="[ns.e('value'), valueClass]"
      :style="
        ns.style({
          textAlign: valueAlign !== cellProps.valueAlign.default ? valueAlign : undefined,
        })
      "
    >
      <slot v-if="$slots.default" />
      <text v-else :selectable="selectable" :user-select="selectable">{{ value }}</text>

      <view v-if="errorMessage" :class="ns.e('error-message')">
        {{ errorMessage }}
      </view>
    </view>

    <text v-if="suffix" :class="ns.e('suffix')">{{ suffix }}</text>

    <slot v-if="$slots['right-icon'] && !isLink" name="right-icon" />
    <IconComponent v-if="isLink" :class="ns.e('icon-right')" name="right" />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import IconComponent from '../icon/icon.vue'
import { cellEmits, cellProps } from './props'

const ns = useNamespace('cell')

const props = defineProps(cellProps)
const emit = defineEmits(cellEmits)

const onClick = (event: MouseEvent) => {
  if (!props.clickable && !props.isLink) return
  emit('click', event)
}
</script>

<style lang="scss">
@import './cell.scss';
</style>
