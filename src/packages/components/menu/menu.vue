<template>
  <view :class="computedClass('menu')">
    <view
      :class="computedClass('menu__bar')"
      :style="{ zIndex: isMenuItemShow ? zIndex + 1 : 'auto' }"
    >
      <view
        v-for="(item, index) in menuBarList"
        :key="index"
        :class="computedClass('menu__item', { 'menu--active': item.show })"
        @tap="onShowMenu(index)"
      >
        <text :class="computedClass('menu__title')">{{ item.title }}</text>
      </view>
    </view>
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { useRect } from '../../hooks'
import { computedClass } from '../../utils/style'
import MenuItem, { MenuItemInstance } from '../menu-item/menu-item.vue'
import { PopupProps } from '../popup/popup.vue'
import { TransitionProps } from '../transition/transition.vue'

export interface MenuProps {
  /** 菜单展开方向 */
  direction?: 'up' | 'down'
  /** 菜单栏 z-index 层级 */
  zIndex?: number
  /** 动画时长，单位ms */
  duration?: TransitionProps['duration']
  /** 是否显示遮罩层 */
  overlay?: PopupProps['overlay']
  /** 是否在点击遮罩层后关闭菜单 */
  closeOnClickOverlay?: PopupProps['closeOnClickOverlay']
}

export interface MenuExposeData {
  setChildren: (node: MenuItemInstance) => void
  isMenuItemShow: boolean
  offset: { top: number; bottom: number }
}

type MenuItemExpose = InstanceType<typeof MenuItem> | null

withDefaults(defineProps<MenuProps>(), {
  direction: 'down',
  zIndex: 10,
  duration: 200,
  overlay: true,
  closeOnClickOverlay: true,
})

const systemInfo = uni.getSystemInfoSync()
const instance = getCurrentInstance()

const children = ref<MenuItemInstance[]>([])
const menuBarList = computed(() => {
  return children.value.map((child) => {
    return {
      title: child.props.title || child.activeItem.text,
      show: child.show,
    }
  })
})
// 是否有菜单展开
const isMenuItemShow = computed<boolean>(() => {
  return menuBarList.value.some((item) => item.show)
})
const offset = ref<{ top: number; bottom: number }>({ top: 0, bottom: 0 })

onMounted(() => {
  if (!instance) return
  useRect(instance, `.${computedClass('menu')}`).then((node) => {
    if (node) {
      offset.value = { top: node.top + node.height, bottom: systemInfo.windowHeight - node.top }
    }
  })
})

const setChildren = (node: MenuItemInstance) => {
  children.value.push(node)
}

const onShowMenu = (index: number) => {
  children.value.forEach((node, nodeIndex) => {
    const nodeExpose = node.exposeProxy as MenuItemExpose
    if (nodeIndex === index) {
      nodeExpose?.toggle()
    } else if (node.show) {
      nodeExpose?.close()
    }
  })
}

defineExpose({
  setChildren,
  isMenuItemShow,
  offset,
})
</script>

<style lang="scss">
@import '../../styles/vars.scss';

.#{$prefix}-menu {
  $barHeight: 48px;

  position: relative;
  &__bar {
    position: relative;
    display: flex;
    height: $barHeight;
    background-color: #fff;
    box-shadow: 0 2px 12px rgb(100 101 102 / 12%);
  }

  &__item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 0;
    cursor: pointer;
  }

  &__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0 8px;
    color: _var(color-black);
    font-size: 15px;
    line-height: 22px;

    &::after {
      position: absolute;
      top: 50%;
      right: -4px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      transform: rotate(-45deg);
      opacity: 0.8;
      content: '';
      transition: all 0.2s linear;
    }
  }

  &__body {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: $barHeight;
    overflow: hidden;
  }

  &--active &__title {
    color: _var(menu-active-color, _var(color-primary));
    &::after {
      margin-top: -1px;
      transform: rotate(135deg);
      border-color: transparent transparent currentColor currentColor;
    }
  }
}
</style>
