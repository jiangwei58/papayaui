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
import { useRect } from '../../hooks'
import useNamespace from '../../core/useNamespace'
import { TabItem, tabsEmits, tabsProps } from './props'

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
@import '../../styles/vars.scss';
.#{$prefix}-tabs {
  $tabs-line-width: 40px;
  height: _var(tabs-height, 44px);
  padding: 0 8px;
  background-color: _var(tabs-bg-color, #fff);
  &.scrollable &__item {
    flex: 1 0 auto;
    padding: 0 12px;
  }
  &.shrink &__item {
    flex: none;
  }
  &-scroll {
    height: 100%;
  }
  &-wrapper {
    position: relative;
    display: flex;
    height: 100%;
    user-select: none;
  }
  &__item {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 4px;
    color: _var(tabs-color, _var(color-black-2));
    font-size: _var(tabs-font-size, 14px);
    line-height: _var(tabs-line-height, 20px);
    min-width: _var(tabs-line-width, $tabs-line-width);
    &.active {
      color: _var(tabs-color-active, _var(color-black));
      font-weight: 500;
    }
  }
  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: _var(tabs-line-width, $tabs-line-width);
    height: _var(tabs-line-height, 3px);
    background-color: _var(color-primary);
    border-radius: 3rpx;
  }
}
</style>
