<template>
  <view
    :class="
      computedClass('switch', {
        'switch--on': isActive,
        'switch--disabled': disabled,
      })
    "
    :style="switchStyle"
    @tap="onToggle"
  >
    <view :class="computedClass('switch__node')">
      <Loadmore
        v-if="loading"
        class="pl-16"
        :config="{ loading: '' }"
        :status="LoadStatusEnum.LOADING"
        icon-size="16px"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { LoadStatusEnum } from '../../hooks'
import { computedClass } from '../../utils/style'
import Loadmore from '../loadmore/loadmore.vue'

export type SwitchValue = boolean | string | number

export interface SwitchProps {
  /** 开关状态 */
  modelValue?: SwitchValue
  /** 打开时组件的值 */
  activeValue?: SwitchValue
  /** 关闭组件的值 */
  inactiveValue?: SwitchValue
  /** 打开时的背景颜色 */
  activeColor?: CSSProperties['background-color']
  /** 关闭时的背景颜色 */
  inactiveColor?: CSSProperties['background-color']
  /** 禁用状态 */
  loading?: boolean
  /** 加载状态 */
  disabled?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  activeColor: undefined,
  inactiveColor: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: SwitchValue): void
  (event: 'change', value: SwitchValue): void
}>()

const switchStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (isActive.value && props.activeColor) {
    style.backgroundColor = props.activeColor
  }
  if (!isActive.value && props.inactiveColor) {
    style.backgroundColor = props.inactiveColor
  }
  return style
})

const isActive = computed<boolean>(() => props.modelValue === props.activeValue)

const onToggle = () => {
  if (props.loading || props.disabled) return
  const value = props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-switch {
  $duration: 0.3s;
  display: inline-flex;
  align-items: center;
  width: 52px;
  height: 32px;
  line-height: 32px;
  background-color: #e6e6e6;
  border-radius: 100px;
  transition: background-color $duration;
  &__node {
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    transform: translateX(14%);
    transition: transform $duration cubic-bezier(0.3, 1.05, 0.4, 1.05);

    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--on {
    background-color: _var(color-primary);
    border-color: _var(color-primary);
  }
  &--on &__node {
    width: 24px;
    height: 24px;
    background-color: #fff;
    transform: translateX(100%);
  }
  &--disabled {
    opacity: 0.6;
  }
}
</style>
