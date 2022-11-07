<template>
  <view
    :class="computedClass('iconfont', `icon-${name}`)"
    :style="{ display: block ? 'block' : 'inline-block', fontSize: getUnitValue(size), color }"
    @click="emit('click', $event)"
  />
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'

export interface IconProps {
  name: string
  size?: string
  color?: string
  block?: boolean
}

withDefaults(defineProps<IconProps>(), {
  size: '16px',
  color: '#969799',
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-iconfont {
  position: relative;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
</style>
