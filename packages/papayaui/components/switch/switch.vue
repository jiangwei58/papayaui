<template>
  <view
    :class="[ns.b(), ns.is('on', isChecked), ns.is('disabled', disabled)]"
    :style="switchStyle"
    @tap="onToggle"
  >
    <view :class="ns.e('bg')" :style="ns.style({ backgroundColor: inactiveColor })" />
    <view :class="ns.e('node')">
      <LoadingIcon v-if="loading" size="100%" class="block width-full height-full" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, toRefs } from 'vue'
import { useNamespace } from '@papayaui/core'
import { useSwitch } from '@papayaui/core'
import { getUnitValue } from '@papayaui/utils'
import LoadingIcon from '../loading-icon/loading-icon.vue'
import { switchEmits, switchProps } from './props'

const ns = useNamespace('switch')

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const { modelValue, activeValue, inactiveValue, loading, disabled } = toRefs(props)

const {
  checked,
  isChecked,
  onToggle: _onToggle,
} = useSwitch({
  modelValue,
  activeValue,
  inactiveValue,
  loading,
  disabled,
})

const switchStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (isChecked.value && props.activeColor) {
    style.backgroundColor = props.activeColor
  }
  if (!isChecked.value && props.inactiveColor) {
    style.backgroundColor = props.inactiveColor
  }
  if (props.size) {
    style.fontSize = getUnitValue(props.size)
  }
  return style
})

const onToggle = () => {
  if (typeof _onToggle() === 'undefined') return
  emit('update:modelValue', checked.value)
  emit('change', checked.value)
  if (uni.getSystemInfoSync().platform !== 'devtools') {
    uni.vibrateShort({})
  }
}
</script>

<style lang="scss">
@import './switch.scss';
</style>
