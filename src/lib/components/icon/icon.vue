<template>
  <view
    :class="computedClass('iconfont', `icon-${name}`)"
    :style="{ display: block ? 'block' : 'inline-block', fontSize: getUnitValue(size), color }"
  />
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'

interface OwnProps {
  name: string
  size?: string
  color?: string
  block?: boolean
}

withDefaults(defineProps<OwnProps>(), {
  size: '16px',
  color: '#969799',
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-iconfont {
  position: relative;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
</style>
