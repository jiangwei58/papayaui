<template>
  <view
    :class="[`${defaultNamespace}-iconfont`, ns.b(name), customClass]"
    :style="
      ns.style({
        ...customStyle,
        display: block ? 'block' : undefined,
        fontSize: size ? getUnitValue(size) : undefined,
        color,
      })
    "
    @click="emit('click', $event)"
  />
</template>

<script lang="ts" setup>
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import { iconEmits, iconProps } from './props'

const ns = useNamespace('icon')

defineProps(iconProps)
const emit = defineEmits(iconEmits)
</script>

<style lang="scss" scoped>
@import './icon.scss';
</style>
