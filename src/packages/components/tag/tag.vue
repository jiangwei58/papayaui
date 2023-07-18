<template>
  <view
    :class="[ns.b(), ns.m(type), ns.is('plain', plain), ns.is('mark', mark)]"
    :style="ns.style(customStyle)"
  >
    <slot />
    <Icon v-if="closeable" name="close" class="ml-2" @tap="emit('close')" />
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import { tagEmits, tagProps } from './props'

const ns = useNamespace('tag')

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const customStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style[props.plain ? 'borderColor' : 'backgroundColor'] = props.color
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.round) {
    style.borderRadius = props.round === true ? getUnitValue('100px') : getUnitValue(props.round)
  }
  return style
})
</script>

<style lang="scss" scoped>
@import './tag.scss';
</style>
