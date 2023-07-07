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
import { SidebarExposeData, SidebarValue } from '../sidebar/sidebar.vue'
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
@import '../../styles/vars.scss';

.#{$prefix}-sidebar-item {
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: _var(sidebar-padding, 20px 12px);
  overflow: hidden;
  color: _var(color-black);
  font-size: _var(sidebar-font-size, 14px);
  line-height: _var(sidebar-line-height, 20px);
  background-color: _var(sidebar-bg-color, #f7f8fa);
  cursor: pointer;
  user-select: none;

  &--active {
    background-color: #fff;
    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 4px;
      height: 16px;
      background-color: _var(sidebar-active-color, _var(color-primary));
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      content: '';
    }
  }

  &--disabled {
    color: _var(sidebar-disabled-color, #c8c9cc);
    cursor: not-allowed;
  }
}
</style>
