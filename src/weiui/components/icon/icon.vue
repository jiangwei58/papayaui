<template>
  <view
    :class="computedClass('iconfont', `icon-${name}`)"
    :style="{ fontSize: getUnitValue(size), color }"
  ></view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computedClass } from '../../utils/style'

interface OwnProps {
  name: string
  size?: string
  color?: string
}

withDefaults(defineProps<OwnProps>(), {
  size: '16px',
  color: '#969799',
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-iconfont {
  display: inline;
}
</style>
