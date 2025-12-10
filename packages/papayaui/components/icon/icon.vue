<template>
  <view
    :class="[...iconClassList, customClass]"
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
import { computed } from 'vue'
import { useNamespace } from '@papayaui/core'
import { getUnitValue } from '@papayaui/utils'
import { iconEmits, iconProps } from './props'

const ns = useNamespace('icon')

const props = defineProps(iconProps)
const emit = defineEmits(iconEmits)

const iconClassList = computed(() => {
  return props.classPrefix
    ? [props.classPrefix, `${props.classPrefix}-${props.name}`]
    : [ns.b(), ns.b(props.name)]
})
</script>

<style lang="scss">
@import './icon.scss';
/* #ifdef MP */
:host {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* #endif */
</style>
