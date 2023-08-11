<template>
  <view :class="[ns.b(), ns.m(menuProvide.props.direction)]" :style="customStyle">
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
        :class="ns.is('active', isSelected(item.value))"
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
import type { CSSProperties, Ref } from 'vue'
import { computed, getCurrentInstance, inject, onMounted, ref, toRefs } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { useSelect } from '../../core/useSelect'
import { noop } from '../../utils'
import Cell from '../cell/cell.vue'
import IconComponent from '../icon/icon.vue'
import type { MenuProvideData } from '../menu/menu.vue'
import Popup from '../popup/popup.vue'
import type { PopupProps } from '../popup/props'
import type { MenuItemOption, MenuItemOptionValue } from './props'
import { menuItemEmits, menuItemProps } from './props'

export interface MenuItemInstance {
  /** 标题 */
  title: Ref<string>
  /** 是否显示 */
  show: Ref<boolean>
  /** 选中项的数据 */
  activeItem: Ref<MenuItemOption>
  /** 切换打开状态 */
  toggle: (show?: boolean) => void
}

const ns = useNamespace('menu-item')

const props = defineProps(menuItemProps)
const emit = defineEmits(menuItemEmits)

const instance = getCurrentInstance()

const { title, options, modelValue } = toRefs(props)

const menuProvide = inject<MenuProvideData>(`${defaultNamespace}-menu-provide`, {
  props: {
    direction: 'down',
    zIndex: 10,
    duration: 200,
    overlay: true,
    closeOnClickOverlay: true,
  },
  setChildren: noop,
  isMenuItemShow: false,
  offset: ref({ top: 0, bottom: 0 }),
})

const visible = ref<boolean>(false)
const visibleEnded = ref<boolean>(true)
const { isSelected, onSelect, selectedItems } = useSelect<MenuItemOption, MenuItemOptionValue>({
  options,
  defaultValue: modelValue,
})

const customStyle = computed(() => {
  if (!menuProvide.props) return
  const style: CSSProperties = {
    zIndex: menuProvide.props.zIndex ?? 10,
  }

  const direction = menuProvide.props.direction === 'up' ? 'bottom' : 'top'
  style[direction] = menuProvide.offset.value[direction] + 'px'

  if (visibleEnded.value) {
    style.display = 'none'
  }
  return style
})

const popupAttrs = computed(() => {
  if (!menuProvide.props) return {}
  return {
    position: menuProvide.props.direction === 'up' ? 'bottom' : 'top',
    duration: menuProvide.props.duration,
    overlay: menuProvide.props.overlay,
    closeOnClickOverlay: menuProvide.props.closeOnClickOverlay,
  } as Pick<PopupProps, 'position' | 'duration' | 'overlay' | 'closeOnClickOverlay'>
})

const toggle = (show = !visible.value) => {
  visible.value = show
  if (show) {
    visibleEnded.value = false
  } else {
    // 关闭弹窗的时候如果有展开的节点立即关闭，没有的话等待动画完毕再关闭
    if (menuProvide.isMenuItemShow && !visible.value) {
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
  if (instance) {
    menuProvide.setChildren({
      title,
      toggle,
      show: visible,
      activeItem: selectedItems as Ref<MenuItemOption>,
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
@import './menu-item.scss';
</style>
