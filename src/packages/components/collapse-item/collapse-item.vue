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
import type { CSSProperties, Ref } from 'vue'
import { getCurrentInstance, inject, onMounted, ref, toRefs } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { useRect } from '../../hooks'
import { noop } from '../../utils'
import Cell from '../cell/cell.vue'
import type { CollapseProvideData } from '../collapse/collapse.vue'
import type { CollapseItemProps } from './props'
import { collapseItemProps } from './props'

export interface CollapseItemInstance {
  index: Ref<number>
  /** 唯一标识符 */
  name?: Ref<CollapseItemProps['name']>
  /** 打开状态 */
  expanded: Ref<boolean>
  /** 禁用状态 */
  disabled: Ref<boolean>
  /** 切换打开状态 */
  toggle: (show?: boolean) => void
}

const ns = useNamespace('collapse-item')

const instance = getCurrentInstance()

const props = defineProps(collapseItemProps)

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
@import './collapse-item.scss';
</style>
