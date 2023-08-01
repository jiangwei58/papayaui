<template>
  <view
    :class="[
      ns.b(),
      ns.m(shape),
      ns.is('checked', p_data?.isSelected(name)),
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
      <IconComponent name="success" size="0.8em" block />
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

const p_data = inject<RadioProvideData>('radioData', { onSelect: noop, isSelected: noop })

const onClick = () => {
  if (props.disabled || p_data.disabled) return
  p_data?.onSelect(props.name)
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
