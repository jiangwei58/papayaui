<template>
  <view
    :class="[
      ns.b(),
      ns.m(shape),
      ns.is('checked', modelValue || p_data?.isSelected(name)),
      ns.is('disabled', disabled || p_data?.disabled),
    ]"
    @tap.stop="onClick"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="ns.e('label')"
      class="mr-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
    <view :class="ns.e('icon')">
      <IconComponent :name="indeterminate ? 'half-check' : 'success'" size="0.8em" block />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="ns.e('label')"
      class="ml-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { inject } from 'vue'
import useNamespace from '../../core/useNamespace'
import { noop } from '../../utils'
import type { CheckboxProvideData } from '../checkbox-group/checkbox-group.vue'
import IconComponent from '../icon/icon.vue'
import type { CheckboxProps } from './props'
import { checkboxEmits, checkboxProps } from './props'

export interface CheckboxInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: CheckboxProps
}

const ns = useNamespace('checkbox')

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const p_data = inject<CheckboxProvideData>('checkboxData', { onSelect: noop, isSelected: noop })

const onClick = () => {
  if (props.disabled || p_data.disabled) return
  p_data?.onSelect(props.name)
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue, props.name)
}

const onLabelClick = () => {
  if (props.labelDisabled) return
  onClick()
}
</script>

<style lang="scss" scoped>
@import './checkbox.scss';
</style>
