<template>
  <view
    :class="
      computedClass('checkbox', {
        [`checkbox--${shape}`]: true,
        'checkbox--checked': modelValue || p_data?.isSelected(name),
        'checkbox--disabled': disabled || p_data?.disabled,
      })
    "
    @tap.stop="onClick"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="computedClass('checkbox__label')"
      class="mr-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
    <view :class="computedClass('checkbox__icon')">
      <IconComponent name="success" size="0.8em" block />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="computedClass('checkbox__label')"
      class="ml-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, CSSProperties, getCurrentInstance, inject, Ref } from 'vue'
import { computedClass } from '../../utils/style'
import IconComponent from '../icon/icon.vue'
import { CheckboxProvideData } from '../checkbox-group/checkbox-group.vue'

export interface CheckboxInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: CheckboxProps
}

export type CheckboxValue = string | number | boolean

export interface CheckboxProps {
  /** 是否选中 */
  modelValue?: boolean
  /** 标识符 */
  name?: CheckboxValue
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

const props = withDefaults(defineProps<CheckboxProps>(), {
  name: '',
  shape: 'round',
  labelPosition: 'right',
  iconSize: '20px',
  checkedColor: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'change', value: boolean, name: CheckboxValue): void
}>()

const p_children = inject<Ref<CheckboxInstance[]>>('checkboxChildren')
const p_data = inject<CheckboxProvideData>('checkboxData')

const instance = getCurrentInstance()

if (instance && p_children?.value) {
  p_children.value = [...p_children.value, instance]
}

const onClick = () => {
  if (props.disabled) return
  p_data?.onSelect(props.name)
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue, props.name)
}

const onLabelClick = () => {
  if (props.labelDisabled) return
  onClick()
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-checkbox {
  $size: 20px;
  $gray: #c8c9cc;

  display: _var(checkbox-display, flex);
  align-items: center;
  user-select: none;
  margin: _var(checkbox-margin, 0);

  &__icon {
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
    font-size: _var(checkbox-font-size, 16px);
    line-height: $size;
    color: _var(checkbox-label-color, _var(color-black));
  }

  &--square &__icon {
    border-radius: 0;
  }
  &--round &__icon {
    border-radius: 50%;
  }
  &--checked &__icon {
    color: #fff;
    background-color: _var(checkbox-checked-color, _var(color-primary));
    border-color: _var(checkbox-checked-color, _var(color-primary));
  }
  &--disabled &__icon {
    background-color: #ebedf0;
    border-color: $gray;
  }
  &--disabled.#{$prefix}-checkbox--checked &__icon {
    color: $gray;
  }
  &--disabled &__label {
    color: $gray;
  }
}
</style>
