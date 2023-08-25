<template>
  <view
    :class="[
      ns.b(),
      ns.is('scrollable', scrollable),
      ns.is('animated', animated),
      ns.is('shrink', shrink),
    ]"
  >
    <scroll-view
      id="tabsScrollContainer"
      :class="ns.e('wrapper')"
      scroll-x
      :scroll-left="lineScrollLeft"
      scroll-with-animation
    >
      <view :class="ns.e('list')">
        <view
          v-for="(item, index) in navList"
          :key="index"
          :class="[
            ns.e('item'),
            ns.is('item-active', index === currentTabIndex),
            ns.is('item-disabled', !!item.disabled),
          ]"
          @click="onChangeTab(item, index)"
        >
          {{ item.title }}
        </view>
        <view :class="ns.e('line')" :style="lineStyle"></view>
      </view>
    </scroll-view>

    <view
      v-if="$slots.default"
      :class="[ns.e('content'), currentTabIndex.toString()]"
      :style="contentStyle"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watch,
  type CSSProperties,
} from 'vue'
import useNamespace from '../../core/useNamespace'
import { useRect } from '../../hooks'
import { getUnitValue } from '../../utils'
import { tabsEmits, tabsProps, type TabItem } from './props'

const ns = useNamespace('tabs')

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const { modelValue } = toRefs(props)

const instance = getCurrentInstance()

const navWrapperWidth = ref(0)
const children = ref<TabItem[]>([])
const childrenWidths = ref<number[]>([])
const lineScrollLeft = ref(0)
const lineOffsetLeft = ref(0)

const navList = computed<TabItem[]>(() => {
  if (Array.isArray(props.tabs)) {
    // 传入的tabs数据，转换成统一的格式
    return props.tabs.map<TabItem>((tab, index) => {
      return {
        ...tab,
        title: tab[props.labelKey as keyof typeof tab] ?? '',
        name: props.valueKey ? tab[props.valueKey as keyof typeof tab] : index,
        disabled: tab['disabled' as keyof typeof tab] ?? false,
      }
    })
  }
  return children.value
})

const currentTabIndex = computed(() => {
  const index = navList.value.findIndex((nav) => {
    return nav.name === modelValue.value
  })
  return index === -1 ? 0 : index
})

const lineStyle = computed(() => {
  const style: CSSProperties = {
    transform: `translateX(${lineOffsetLeft.value}px) translateX(-50%)`,
    transitionDuration: props.duration + 's',
  }
  if (props.lineWidth) {
    style.width = getUnitValue(props.lineWidth)
  }
  if (props.lineHeight) {
    style.height = getUnitValue(props.lineHeight)
  }
  return style
})

const contentStyle = computed(() => {
  if (!props.animated) return
  return {
    transform: `translate3d(${currentTabIndex.value * -100}%, 0px, 0px)`,
    transitionDuration: props.duration + 's',
  }
})

// 更新底部条左侧偏移位置
const updateTabLineLeft = () => {
  const prevLeftTotal = childrenWidths.value
    .slice(0, currentTabIndex.value)
    .reduce((total, nodeWidth) => total + nodeWidth, 0)
  lineOffsetLeft.value = prevLeftTotal + childrenWidths.value[currentTabIndex.value] / 2
  updateScrollLeft()
}

// 更新滚动的距离左侧的位置
const updateScrollLeft = async () => {
  if (props.scrollable) {
    lineScrollLeft.value = lineOffsetLeft.value - navWrapperWidth.value / 2
  }
}

const onChangeTab = (item: TabItem, _index: number) => {
  if (item.disabled) return
  emit('update:modelValue', item.name)
  emit('change', item)
  emit('click', item)
}

onMounted(() => {
  if (instance) {
    // 获取导航容器的宽度
    useRect(instance, '#tabsScrollContainer').then((node) => {
      if (node) {
        navWrapperWidth.value = node.width
      }
    })
    // 获取每个tab标题区域的宽度
    useRect(instance, `.${ns.e('item')}`, true).then((nodes) => {
      childrenWidths.value = nodes.map((node) => node.width)
      updateTabLineLeft()
    })
  }
})

watch(modelValue, async () => {
  await nextTick()
  updateTabLineLeft()
})

defineExpose({
  children,
  update: updateTabLineLeft,
})
</script>

<style lang="scss" scoped>
@import './tabs.scss';
</style>
