<template>
  <view
    :class="[
      ns.b(),
      ns.is('border', _index !== 0 && props.border),
      ns.is('expanded', expanded),
      ns.is('disabled', disabled),
      ns.is('readonly', readonly),
    ]"
  >
    <Cell
      :class="ns.e('title')"
      :name="name"
      :title="title"
      :icon="icon"
      :value="value"
      :is-link="isLink"
      :border="props.border"
      @click.stop="onClick"
    >
      <template #title>
        <slot v-if="$slots.title" name="title" />
        <text>{{ title }}</text>
      </template>
      <template #default>
        <slot v-if="$slots.default" name="value" />
        <text>{{ value }}</text>
      </template>
    </Cell>
    <view :class="ns.e('wrapper')" :animation="wrapperAnimation">
      <view :class="ns.e('content')">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { CSSProperties, getCurrentInstance, inject, onMounted, Ref, ref, toRefs } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { useRect } from '../../hooks'
import { noop } from '../../utils'
import Cell from '../cell/cell.vue'
import { CollapseProvideData } from '../collapse/collapse.vue'

export interface CollapseItemInstance {
  index: Ref<number>
  /** 唯一标识符 */
  name: Ref<CollapseItemProps['name']>
  /** 打开状态 */
  expanded: Ref<boolean>
  /** 禁用状态 */
  disabled: Ref<boolean>
  /** 切换打开状态 */
  toggle: typeof toggle
}

export type CollapseItemValue = string | number

export interface CollapseItemProps {
  /**
   * 唯一标识符，默认为索引值
   */
  name?: CollapseItemValue
  /**
   * 标题栏左侧内容
   */
  title?: string
  /**
   * 标题栏左侧图标名称或图片链接，可选值见 Icon 组件
   */
  icon?: string
  /**
   * 标题栏右侧内容
   */
  value?: string
  /**
   * 是否显示内边框
   */
  border?: boolean
  /**
   * 是否展示标题栏右侧箭头并开启点击反馈
   */
  isLink?: boolean
  /**
   * 是否禁用面板
   */
  disabled?: boolean
  /**
   * 是否为只读状态，只读状态下无法操作面板
   */
  readonly?: boolean
}

const ns = useNamespace('collapse-item')

const instance = getCurrentInstance()

const props = withDefaults(defineProps<CollapseItemProps>(), {
  name: undefined,
  title: '',
  icon: 'right-icon',
  value: undefined,
  border: true,
  isLink: true,
})

const { name, disabled } = toRefs(props)
const _index = ref<number>(0)

const collapseProvide = inject<CollapseProvideData>(`${defaultNamespace}-collapse-provide`, {
  setChildren: noop,
  onChildExpand: noop,
})

const expanded = ref(false)
const wrapperAnimation = ref<CSSProperties>()

const getRect = () => {
  if (!instance) return Promise.resolve(null)
  return useRect(instance, `.${ns.e('content')}`)
}

const toggle = async (show = !expanded.value) => {
  collapseProvide.onChildExpand(_index.value, show)
  expanded.value = show

  const rect = await getRect()
  if (!rect) return
  const height = expanded.value ? rect.height : 0

  const animation = uni.createAnimation({
    timingFunction: 'ease-in-out',
  })
  animation.height(height).step({
    duration: 300,
  })
  wrapperAnimation.value = animation.export()
}

const onClick = () => {
  if (props.disabled || props.readonly) return
  toggle()
}

onMounted(() => {
  // 将自身组件实例添加到父组件
  if (instance) {
    collapseProvide.setChildren({
      index: _index,
      name,
      expanded,
      disabled,
      toggle,
    })
  }
})

defineExpose({
  toggle,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-collapse-item {
  position: relative;

  &__title {
    @include _setVar(cell-icon-right-rotate, 90deg);
  }

  &__wrapper {
    overflow: hidden;
    height: 0;
    transition: height _var(collapse-item-duration, 0.3s) ease-in-out;
    will-change: height;
  }

  &__content {
    padding: _var(collapse-item-content-padding, 12px 16px);
    color: _var(collapse-item-content-color, _var(color-black-3));
    font-size: _var(collapse-item-content-font-size, 14px);
    line-height: _var(collapse-item-content-line-height, 1.5);
    background-color: _var(collapse-item-content-background, #fff);
  }

  &--border::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -1px;
    right: 16px;
    left: 16px;
    border-top: 1px solid #ebedf0;
    transform: scaleY(0.5);
  }

  &--expanded &__title {
    @include _setVar(cell-icon-right-rotate, -90deg);
  }

  &--disabled {
    @include _setVar(cell-color, _var(color-disabled));
    @include _setVar(cell-title-color, _var(color-disabled));
  }
}
</style>
