<template>
  <view
    :class="[ns.b(), ns.is('on', isChecked), ns.is('disabled', disabled)]"
    :style="switchStyle"
    @tap="onToggle"
  >
    <view :class="ns.e('bg')" :style="ns.style({ backgroundColor: inactiveColor })" />
    <view :class="ns.e('node')">
      <LoadingIcon v-if="loading" size="100%" class="block width-full height-full" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, toRefs } from 'vue'
import useNamespace from '../../core/useNamespace'
import useSwitch, { SwitchValue as _SwitchValue } from '../../core/useSwitch'
import { getUnitValue } from '../../utils'
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
  /** 开关尺寸 */
  size?: string
}

const ns = useNamespace('switch')

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  activeColor: undefined,
  inactiveColor: undefined,
  size: undefined,
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
  if (props.size) {
    style.fontSize = getUnitValue(props.size)
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
  $gap: 4px;

  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: _var(switch-size, $nodeSize);
  width: calc(2em + $gap);
  padding: $gap 0;
  background-color: $defaultBgColor;
  border-radius: 100px;
  transition: background-color $duration;
  &__bg {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - (1em / 2));
    height: 100%;
    background-color: $defaultBgColor;
    border-radius: 100px;
    transform: scale(1);
    transition: transform $duration ease;
  }
  &__node {
    width: 1em;
    height: 1em;
    padding: 3px;
    background-color: #fff;
    border-radius: 50%;
    transform: translateX($gap);
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
    background-color: #fff;
    transform: translateX(100%);
  }
  &--disabled {
    opacity: 0.6;
  }
}
</style>
