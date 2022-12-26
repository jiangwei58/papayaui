<template>
  <view
    :class="
      computedClass('switch', {
        'switch--on': isChecked,
        'switch--disabled': disabled,
      })
    "
    :style="switchStyle"
    @tap="onToggle"
  >
    <view
      :class="computedClass('switch__bg')"
      :style="computedStyle({ backgroundColor: inactiveColor })"
    />
    <view :class="computedClass('switch__node')">
      <LoadingIcon v-if="loading" size="18px" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, toRefs } from 'vue'
import useSwitch, { SwitchValue as _SwitchValue } from '../../core/useSwitch'
import { computedClass, computedStyle } from '../../utils/style'
import LoadingIcon from '../loading-icon/loading-icon.vue'

export type SwitchValue = _SwitchValue

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

const { modelValue, activeValue, inactiveValue, loading, disabled } = toRefs(props)

const {
  checked,
  isChecked,
  onToggle: _onToggle,
} = useSwitch({
  modelValue,
  activeValue,
  inactiveValue,
  loading,
  disabled,
})

const switchStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (isChecked.value && props.activeColor) {
    style.backgroundColor = props.activeColor
  }
  if (!isChecked.value && props.inactiveColor) {
    style.backgroundColor = props.inactiveColor
  }
  return style
})

const onToggle = () => {
  if (typeof _onToggle() === 'undefined') return
  emit('update:modelValue', checked.value)
  emit('change', checked.value)
  if (uni.getSystemInfoSync().platform !== 'devtools') {
    uni.vibrateShort({})
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-switch {
  $duration: 0.4s;
  $defaultBgColor: #e6e6e6;
  $nodeSize: 24px;

  position: relative;
  display: inline-flex;
  align-items: center;
  width: 52px;
  height: 32px;
  line-height: 32px;
  background-color: $defaultBgColor;
  border-radius: 100px;
  transition: background-color $duration;
  &__bg {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - ($nodeSize / 2));
    height: 100%;
    background-color: $defaultBgColor;
    border-radius: 100px;
    transform: scale(1);
    transition: transform $duration ease;
  }
  &__node {
    width: $nodeSize;
    height: $nodeSize;
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
  &--on &__bg {
    transform: scale(0);
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
