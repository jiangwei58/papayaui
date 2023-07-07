<template>
  <view
    :class="[`${defaultNamespace}-iconfont`, ns.b(name)]"
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
import { getUnitValue } from '../../utils/common'
import { iconEmits, iconProps } from './props'

const ns = useNamespace('icon')

defineProps(iconProps)
const emit = defineEmits(iconEmits)
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-iconfont {
  position: relative;
  display: inline-block;
  font-size: _var(icon-size, 16px);
  color: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  vertical-align: middle;
}
</style>
