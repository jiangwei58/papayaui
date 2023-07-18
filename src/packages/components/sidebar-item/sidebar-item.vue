<template>
  <view
    :class="[
      ns.b(),
      ns.is('active', getParentExpose()?.isSelected(value)),
      ns.is('disabled', disabled),
      customClass,
    ]"
    :style="customStyle"
    @tap="onSelect"
  >
    <Badge :show="dot || !isUndefined(badge)" :dot="dot" :content="badge">
      <text :class="ns.e('text')">{{ title }}</text>
    </Badge>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { isUndefined } from '../../utils'
import Badge from '../badge/badge.vue'
import type { SidebarExposeData, SidebarValue } from '../sidebar/sidebar.vue'
import { sidebarItemEmits, sidebarItemProps } from './props'

const ns = useNamespace('sidebar-item')

const props = defineProps(sidebarItemProps)
const emit = defineEmits(sidebarItemEmits)

const instance = getCurrentInstance()

const index = (instance?.parent?.proxy as any).$children.length as number // 默认以当前节点在父节点的添加顺序当初始值
const value = ref<SidebarValue>(props.name ?? index)

const getParentExpose = () => {
  if (!instance) return
  return instance.proxy?.$parent as unknown as SidebarExposeData | undefined
}

const onSelect = () => {
  if (props.disabled) return
  const parentExpose = getParentExpose()
  if (!parentExpose) return
  parentExpose.onSelect(value.value)
  emit('click', value.value)
}
</script>

<style lang="scss" scoped>
@import './sidebar-item.scss';
</style>
