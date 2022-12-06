<template>
  <view :class="[computedClass('tabs'), { scrollable, shrink }]">
    <scroll-view
      id="tabsScrollContainer"
      :class="computedClass('tabs-scroll')"
      scroll-x
      :scroll-left="lineScrollLeft"
    >
      <view :class="computedClass('tabs-wrapper')">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          :class="[computedClass('tab'), { active: isActive(item, index) }]"
          @click="onChangeTab(item, index)"
        >
          {{ item[labelKey] }}
        </view>
        <view
          :class="computedClass('tabs__line')"
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
import { computedClass } from '../../utils/style'
import { getCurrentInstance, nextTick, ref, toRefs, watch } from 'vue'

export type TabItem = any

export type TabItemValue = number | string

export interface TabsProps {
  modelValue?: TabItemValue
  /** 标签页列表数据 */
  tabs: TabItem[]
  /** 标题对应字段名 */
  labelKey?: string
  /** 值对应字段名 */
  valueKey?: string
  /** 是否滚动 */
  scrollable?: boolean
  /** 是否开启左侧收缩布局 */
  shrink?: boolean
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: 0,
  tabs: () => [],
  labelKey: 'label',
  valueKey: 'value',
  scrollable: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', current: TabItemValue): void
  (event: 'change', item: TabItem): void
}>()

const { tabs, modelValue } = toRefs(props)

const internalInstance = getCurrentInstance()

const lineScrollLeft = ref<number>(0)
const lineOffsetLeft = ref<number>(0)

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
  return typeof item[props.valueKey] !== 'undefined'
    ? item[props.valueKey] === modelValue.value
    : index === modelValue.value
}

// 获取左移动位置
const updateTabItemWidth = () => {
  const query = uni.createSelectorQuery().in(internalInstance)
  let containerWidth = 0
  // 获取容器的宽度
  query
    .select('#tabsScrollContainer')
    .boundingClientRect((data) => {
      if (data) {
        containerWidth = data.width || 0
      }
    })
    .exec()
  // 获取所有的 tab-item 的宽度
  query
    .selectAll(`.${computedClass('tab')}`)
    .boundingClientRect((data) => {
      if (!data) {
        return
      }
      const nodes = data as Required<UniApp.NodeInfo>[]
      let lineLeft = 0
      let currentWidth = 0
      if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
          if (i < modelValue.value) {
            lineLeft += nodes[i].width
          } else if (i == modelValue.value) {
            currentWidth = nodes[i].width
          } else {
            break
          }
        }
      }
      // 滑块作移动的位置
      lineOffsetLeft.value = lineLeft + currentWidth / 2
      // 计算滚动的距离左侧的位置
      if (props.scrollable) {
        lineScrollLeft.value = lineOffsetLeft.value - containerWidth / 2
      }
    })
    .exec()
}

const onChangeTab = (item: TabItem, index: number) => {
  emit(
    'update:modelValue',
    typeof item[props.valueKey] !== 'undefined' ? item[props.valueKey] : index,
  )
  emit('change', item)
}

defineExpose({
  update: updateTabItemWidth,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-tabs {
  height: _var(tabs-height);
  padding: 0 8px;
  background-color: #fff;
  &.scrollable .#{$prefix}-tab {
    flex: 1 0 auto;
    padding: 0 12px;
  }
  &.shrink .#{$prefix}-tab {
    flex: none;
  }
}
.#{$prefix}-tabs-scroll {
  height: 100%;
}
.#{$prefix}-tabs-wrapper {
  position: relative;
  display: flex;
  height: 100%;
  user-select: none;
}
.#{$prefix}-tab {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 4px;
  color: _var(color-text-black-2);
  font-size: _var(tabs-font-size);
  line-height: 20px;
  min-width: _var(tabs-line-width);
  &.active {
    color: _var(color-text-black);
    font-weight: 500;
  }
}
.#{$prefix}-tabs__line {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: _var(tabs-line-width);
  height: _var(tabs-line-height);
  background-color: _var(color-primary);
  border-radius: 3rpx;
}
</style>
