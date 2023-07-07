<template>
  <view :class="ns.b()">
    <view :class="ns.e('bar')" :style="{ zIndex: isMenuItemShow ? zIndex + 1 : 'auto' }">
      <view
        v-for="(item, index) in menuBarList"
        :key="index"
        :class="[ns.e('item'), ns.is('active', item.show)]"
        @tap="onShowMenu(index)"
      >
        <text :class="ns.e('title')">{{ item.title }}</text>
      </view>
    </view>
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, provide, Ref, ref } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { useRect } from '../../hooks'
import { MenuItemInstance } from '../menu-item/menu-item.vue'
import { MenuProps, menuProps } from './props'

export interface MenuProvideData {
  props: Required<MenuProps>
  setChildren: (node: MenuItemInstance) => void
  isMenuItemShow: boolean
  offset: Ref<{ top: number; bottom: number }>
}

const ns = useNamespace('menu')

const props = defineProps(menuProps)

const systemInfo = uni.getSystemInfoSync()
const instance = getCurrentInstance()

const children = ref<MenuItemInstance[]>([])
const menuBarList = computed(() => {
  return children.value.map((child) => {
    return {
      title: child.title || child.activeItem.text,
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
  useRect(instance, `.${ns.b()}`).then((node) => {
    if (node) {
      offset.value = { top: node.top + node.height, bottom: systemInfo.windowHeight - node.top }
    }
  })
})

const setChildren = (node: MenuItemInstance) => {
  children.value.push(node as any)
}

const onShowMenu = (index: number) => {
  children.value.forEach((node, nodeIndex) => {
    const nodeExpose = node
    if (nodeIndex === index) {
      nodeExpose?.toggle()
    } else if (node.show) {
      nodeExpose?.toggle(false)
    }
  })
}

provide(`${defaultNamespace}-menu-data`, {
  props,
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
