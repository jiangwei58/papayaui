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
import { getCurrentInstance, ref, SVGAttributes } from 'vue'
import useNamespace from '../../core/useNamespace'
import { isUndefined } from '../../utils'
import Badge, { BadgeProps } from '../badge/badge.vue'
import { SidebarExposeData, SidebarValue } from '../sidebar/sidebar.vue'

export interface SidebarItemProps {
  /** 标题 */
  title?: string
  /** 当前项标识值 */
  name?: SidebarValue
  /** 是否禁用该项 */
  disabled?: boolean
  /** 是否显示右上角小红点 */
  dot?: BadgeProps['dot']
  /** 图标右上角徽标的内容 */
  badge?: BadgeProps['content']
  /** 根节点样式类 */
  customClass?: string
  /** 根节点样式 */
  customStyle?: SVGAttributes['style']
}

const ns = useNamespace('sidebar-item')

const props = defineProps<SidebarItemProps>()

const emit = defineEmits<{
  (event: 'click', value: SidebarValue): void
}>()

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
