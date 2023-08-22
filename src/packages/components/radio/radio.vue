<template>
  <view
    :class="[
      ns.b(),
      ns.m(shape),
      ns.is('checked', radioGroupProvide.isSelected(name)),
      ns.is('disabled', isDisabled),
    ]"
    @tap.stop="onClick"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="[ns.e('label'), ns.e('label-left')]"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
    <view :class="ns.e('icon')" :style="{ lineHeight: getUnitValue(iconSize) }">
      <IconComponent name="success" />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="[ns.e('label'), ns.e('label-right')]"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, inject, type ComponentInternalInstance } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { getUnitValue, noop } from '../../utils'
import IconComponent from '../icon/icon.vue'
import type { RadioProvideData } from '../radio-group/radio-group.vue'
import type { RadioProps } from './props'
import { radioEmits, radioProps } from './props'

export interface RadioInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: RadioProps
}

const ns = useNamespace('radio')

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const radioGroupProvide = inject<RadioProvideData>(`${defaultNamespace}-radio-group-provide`, {
  onSelect: noop,
  isSelected: noop,
})

const isDisabled = computed<boolean>(() => {
  return props.disabled || !!radioGroupProvide?.disabled?.value
})

const onClick = () => {
  if (isDisabled.value) return
  radioGroupProvide.onSelect(props.name)
  emit('change', props.name)
}

const onLabelClick = () => {
  if (props.labelDisabled) return
  onClick()
}
</script>

<style lang="scss" scoped>
@import './radio.scss';
</style>
