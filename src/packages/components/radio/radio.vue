<template>
  <view
    :class="[
      ns.b(),
      ns.m(shape),
      ns.is('checked', p_data?.isSelected(name)),
      ns.is('disabled', disabled || p_data?.disabled),
    ]"
    @tap.stop="onClick"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="ns.e('label')"
      class="mr-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
    <view :class="ns.e('icon')">
      <IconComponent name="success" size="0.8em" block />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="ns.e('label')"
      class="ml-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, CSSProperties, inject } from 'vue'
import useNamespace from '../../core/useNamespace'
import { noop } from '../../utils'
import IconComponent from '../icon/icon.vue'
import { RadioProvideData } from '../radio-group/radio-group.vue'

export interface RadioInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: RadioProps
}

export type RadioValue = string | number

export interface RadioProps {
  /** 标识符 */
  name?: RadioValue
  /** 形状 */
  shape?: 'square' | 'round'
  /** 是否为禁用状态 */
  disabled?: boolean
  /** 是否禁用文本内容点击 */
  labelDisabled?: boolean
  /** 文本位置 */
  labelPosition?: 'left' | 'right'
  /** 图标大小 */
  iconSize?: string | number
  /** 选中状态颜色 */
  checkedColor?: CSSProperties['color']
}

const ns = useNamespace('radio')

const props = withDefaults(defineProps<RadioProps>(), {
  name: '',
  shape: 'round',
  labelPosition: 'right',
  iconSize: '20px',
  checkedColor: undefined,
})

const emit = defineEmits<{
  (event: 'change', value: RadioValue): void
}>()

const p_data = inject<RadioProvideData>('radioData', { onSelect: noop, isSelected: noop })

const onClick = () => {
  if (props.disabled || p_data.disabled) return
  p_data?.onSelect(props.name)
  emit('change', props.name)
}

const onLabelClick = () => {
  if (props.labelDisabled) return
  onClick()
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-radio {
  $size: 20px;
  $gray: #c8c9cc;

  display: _var(radio-display, flex);
  align-items: center;
  user-select: none;
  margin: _var(radio-margin, 0);

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    font-size: $size;
    color: transparent;
    border: 1px solid $gray;
    transition-property: color, border-color, background-color;
    transition-duration: 0.2s;
  }
  &__label {
    font-size: _var(radio-font-size, 16px);
    line-height: $size;
    color: _var(radio-label-color, _var(color-black));
  }

  &--square &__icon {
    border-radius: 0;
  }
  &--round &__icon {
    border-radius: 50%;
  }
  &--checked &__icon {
    color: #fff;
    background-color: _var(radio-checked-color, _var(color-primary));
    border-color: _var(radio-checked-color, _var(color-primary));
  }
  &--disabled &__icon {
    background-color: #ebedf0;
    border-color: $gray;
  }
  &--disabled.#{$prefix}-radio--checked &__icon {
    color: $gray;
  }
  &--disabled &__label {
    color: $gray;
  }
}
</style>
