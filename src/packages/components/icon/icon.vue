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
import { CSSProperties } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { getUnitValue } from '../../utils/common'

export interface IconProps {
  /** 图标名称 */
  name: string
  /** 图标大小 */
  size?: string
  /** 图标颜色 */
  color?: CSSProperties['color']
  /** 是否块级元素 */
  block?: boolean
  /** 自定义样式 */
  customStyle?: CSSProperties
}

const ns = useNamespace('icon')

withDefaults(defineProps<IconProps>(), {
  size: undefined,
  color: undefined,
  customStyle: undefined,
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-iconfont {
  position: relative;
  display: inline-block;
  color: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  vertical-align: middle;
}
</style>
