<template>
  <view
    :class="computedClass('iconfont', `icon-${name}`)"
    :style="{ fontSize: getUnitValue(size), color: closeColor }"
  ></view>
</template>

<script lang="ts" setup>
import { getUnitValue } from '@/weiui/utils/common'
import { computedClass } from '@/weiui/utils/style'

interface OwnProps {
  name: string
  size?: string
  closeColor?: string
}

withDefaults(defineProps<OwnProps>(), {
  size: '16px',
  closeColor: '#969799',
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-iconfont {
  display: inline;
}
</style>
