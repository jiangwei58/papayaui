<template>
  <view :class="[ns.b(), ns.is('border', props.border)]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { CollapseItemInstance, CollapseItemValue } from '../collapse-item/collapse-item.vue'

export interface CollapseProps {
  /**
   * 当前展开面板的 name
   */
  modelValue?: CollapseItemValue | CollapseItemValue[]
  /**
   * 是否开启手风琴模式
   */
  accordion?: boolean
  /**
   * 是否显示外边框
   */
  border?: boolean
}

export interface CollapseProvideData {
  setChildren: typeof setChildren
  onChildExpand: typeof onChildExpand
}

const ns = useNamespace('collapse')

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: undefined,
  border: true,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: NonNullable<CollapseProps['modelValue']>): void
  (event: 'change', value: NonNullable<CollapseProps['modelValue']>): void
  (event: 'open', name: CollapseItemValue): void
  (event: 'close', name: CollapseItemValue): void
}>()

const children = ref<CollapseItemInstance[]>([])

const setChildren = (node: CollapseItemInstance) => {
  node.index.value = children.value.length
  children.value.push(node as any)
}

const onChildExpand = (index: number, expanded: boolean) => {
  if (props.accordion && expanded) {
    children.value.forEach((node, nodeIndex) => {
      if (nodeIndex !== index && node.expanded) {
        node?.toggle(false)
      }
    })
  }

  const values = children.value.flatMap((node) => {
    const nodeExpanded = node.index === index ? expanded : node.expanded
    return nodeExpanded ? node.name ?? node.index : []
  })
  emit('update:modelValue', props.accordion ? values[0] : values)
  emit('change', props.accordion ? values[0] : values)

  if (expanded) {
    emit('open', children.value[index].name ?? index)
  } else {
    emit('close', children.value[index].name ?? index)
  }
}

/**
 * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
 */
const toggleAll = (options: boolean | { expanded: boolean; skipDisabled: boolean }) => {
  children.value.forEach((node) => {
    if (typeof options === 'boolean') {
      node?.toggle(options)
    } else {
      // 跳过禁用的复选框
      if (options.skipDisabled && node.disabled) return
      node?.toggle(options.expanded)
    }
  })
}

provide<CollapseProvideData>(`${defaultNamespace}-collapse-provide`, {
  setChildren,
  onChildExpand,
})

defineExpose({
  toggleAll,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-collapse {
  &--border::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    transform: scale(0.5);
    border-width: 1px 0;
  }
}
</style>