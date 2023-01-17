<template>
  <view
    :class="computedClass('menu-item', `menu-item--${getParentProps()?.direction}`)"
    :style="customStyle"
  >
    <Popup
      :show="visible"
      :custom-style="{ position: 'absolute' }"
      :overlay-style="{ position: 'absolute' }"
      :safe-area-inset-bottom="false"
      v-bind="popupAttrs"
      @update:show="(val) => (visible = !!val)"
      @closed="visibleEnded = true"
    >
      <Cell
        v-for="item in options"
        :key="item.value"
        :class="computedClass({ 'menu-item--active': isSelected(item.value) })"
        :title="item.text"
        clickable
        @click="onChange(item)"
      >
        <template #right-icon>
          <IconComponent v-if="isSelected(item.value)" name="success" block />
        </template>
      </Cell>
      <slot v-if="$slots.default" />
    </Popup>
  </view>
</template>

<script lang="ts" setup>
import {
  ComponentInternalInstance,
  computed,
  CSSProperties,
  getCurrentInstance,
  onMounted,
  ref,
  toRefs,
} from 'vue'
import useSelect from '../../core/useSelect'
import { computedClass } from '../../utils/style'
import Cell from '../cell/cell.vue'
import IconComponent from '../icon/icon.vue'
import { MenuExposeData, MenuProps } from '../menu/menu.vue'
import Popup, { PopupProps } from '../popup/popup.vue'

export interface MenuItemInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: MenuItem
  /** 是否显示 */
  show: boolean
  /** 选中项的数据 */
  activeItem: MenuItemOption
}

export interface MenuItem {
  /** 菜单项标题 */
  title?: string
  /** 当前选中项对应的 value */
  modelValue?: MenuItemOptionValue
  /** 选项数组 */
  options?: MenuItemOption[]
  /** 是否禁用菜单 */
  disabled?: boolean
  /** 标题额外类名 */
  titleClass?: string
}

export interface MenuItemOption {
  /** 文字 */
  text: string
  /** 标识符 */
  value: MenuItemOptionValue
}

export type MenuItemOptionValue = number | string

const props = withDefaults(defineProps<MenuItem>(), {
  title: '',
  modelValue: undefined,
  options: () => [],
  titleClass: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: MenuItemOptionValue): void
  (event: 'change', value: MenuItemOptionValue): void
}>()

const instance = getCurrentInstance()

const { options, modelValue } = toRefs(props)

const visible = ref<boolean>(false)
const visibleEnded = ref<boolean>(true)
const { isSelected, onSelect, selectedItems } = useSelect<MenuItemOption, MenuItemOptionValue>({
  options,
  defaultValue: modelValue,
})

const getParentProps = () => {
  if (!instance) return
  return instance.parent?.props as MenuProps
}

const getParentExpose = () => {
  if (!instance) return
  return instance.proxy?.$parent as unknown as MenuExposeData | undefined
}

const customStyle = computed(() => {
  const parentProps = getParentProps()
  if (!parentProps) return
  const style: CSSProperties = {
    zIndex: parentProps.zIndex ?? 10,
  }
  const parentExpose = getParentExpose()
  if (parentExpose) {
    const direction = parentProps.direction === 'up' ? 'bottom' : 'top'
    style[direction] = parentExpose.offset[direction] + 'px'
  }
  if (visibleEnded.value) {
    style.display = 'none'
  }
  return style
})

const popupAttrs = computed<PopupProps>(() => {
  const parentProps = getParentProps()
  if (!parentProps) return {}
  return {
    position: parentProps.direction === 'up' ? 'bottom' : 'top',
    duration: parentProps.duration,
    overlay: parentProps.overlay,
    closeOnClickOverlay: parentProps.closeOnClickOverlay,
  }
})

const toggle = (show = !visible.value) => {
  visible.value = show
  if (show) {
    visibleEnded.value = false
  } else {
    // 关闭弹窗的时候如果有展开的节点立即关闭，没有的话等待动画完毕再关闭
    const parentExpose = getParentExpose()
    if (parentExpose?.isMenuItemShow && !visible.value) {
      visibleEnded.value = true
    }
  }
}

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const onChange = (item: MenuItemOption) => {
  onSelect(item.value)
  emit('update:modelValue', item.value)
  emit('change', item.value)
  close()
}

onMounted(() => {
  // 将自身组件实例添加到父组件
  if (instance?.proxy?.$parent) {
    ;(instance.proxy.$parent as any | undefined)?.setChildren({
      ...instance,
      show: visible,
      activeItem: selectedItems,
    })
  }
})

defineExpose({
  toggle,
  open,
  close,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-menu-item {
  position: fixed;
  right: 0;
  left: 0;
  overflow: hidden;

  &--down {
    bottom: 0;
  }
  &--up {
    top: 0;
  }

  &--active {
    @include _setVar(cell-color, _var(menu-active-color, _var(color-primary)));
    @include _setVar(cell-title-color, _var(menu-active-color, _var(color-primary)));
  }
}
</style>
