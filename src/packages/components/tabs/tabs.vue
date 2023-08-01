<template>
  <view :class="[ns.b(), { scrollable, shrink }]">
    <scroll-view
      id="tabsScrollContainer"
      :class="ns.b('scroll')"
      scroll-x
      :scroll-left="lineScrollLeft"
      scroll-with-animation
    >
      <view :class="ns.b('wrapper')">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          :class="[ns.e('item'), { active: isActive(item, index) }]"
          @click="onChangeTab(item, index)"
        >
          {{ item[labelKey] }}
        </view>
        <view
          :class="ns.e('line')"
          :style="{
            transform: `translateX(${lineOffsetLeft}px) translateX(-50%)`,
            transitionDuration: '0.3s',
          }"
        ></view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, ref, toRefs, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import { useRect } from '../../hooks'
import type { TabItem } from './props'
import { tabsEmits, tabsProps } from './props'

const ns = useNamespace('tabs')

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const { tabs, modelValue } = toRefs(props)

const internalInstance = getCurrentInstance()

const lineScrollLeft = ref<number>(0)
const lineOffsetLeft = ref<number>(0)

// 是否自定义值，默认为index
const isCustomValue = computed<boolean>(() => typeof props.valueKey !== 'undefined')

watch(
  [tabs, modelValue],
  async () => {
    await nextTick()
    updateTabItemWidth()
  },
  {
    immediate: true,
  },
)

const isActive = (item: TabItem, index: number) => {
  return isCustomValue.value
    ? item[props.valueKey as keyof TabItem] === modelValue.value
    : index === modelValue.value
}

const getCurrentTabIndex = () => {
  if (isCustomValue.value) {
    const index = tabs.value.findIndex(
      (tab) => tab[props.valueKey as keyof TabItem] === modelValue.value,
    )
    return index !== -1 ? index : 0
  }
  return modelValue.value
}

// 获取左移动位置
const updateTabItemWidth = async () => {
  if (!internalInstance) return
  // 获取容器的宽度
  const containerNode = await useRect(internalInstance, '#tabsScrollContainer')
  if (!containerNode) return
  const containerWidth = containerNode.width || 0
  // 获取所有的 tab-item 的宽度
  const nodes = await useRect(internalInstance, `.${ns.e('item')}`, true)
  let lineLeft = 0
  let currentWidth = 0
  const currentTabIndex = getCurrentTabIndex()
  for (let i = 0; i < nodes.length; i++) {
    if (i < currentTabIndex) {
      lineLeft += nodes[i].width
    } else if (i == currentTabIndex) {
      currentWidth = nodes[i].width
    } else {
      break
    }
  }
  // 滑块作移动的位置
  lineOffsetLeft.value = lineLeft + currentWidth / 2
  // 计算滚动的距离左侧的位置
  if (props.scrollable) {
    lineScrollLeft.value = lineOffsetLeft.value - containerWidth / 2
  }
}

const onChangeTab = (item: TabItem, index: number) => {
  emit('update:modelValue', isCustomValue.value ? item[props.valueKey as keyof TabItem] : index)
  emit('change', item)
}

defineExpose({
  update: updateTabItemWidth,
})
</script>

<style lang="scss" scoped>
@import './tabs.scss';
</style>
