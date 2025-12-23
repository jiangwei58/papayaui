<template>
  <view :class="[ns.b(), ns.m(size), ns.is('block', block), ns.is('disabled', disabled)]">
    <view
      v-for="(option, index) in normalizedOptions"
      :key="option.value"
      :class="[
        ns.e('item'),
        ns.is('active', isSelected(option.value)),
        ns.is('disabled', isOptionDisabled(option)),
      ]"
      @tap="handleSelect(option, index)"
    >
      <view :class="ns.e('item-label')">
        <Icon v-if="option.icon" :name="option.icon" :class="ns.e('item-icon')" />
        <text>{{ option.label }}</text>
      </view>
    </view>
    <view :class="ns.e('indicator')" :style="indicatorStyle" />
  </view>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  nextTick,
  watch,
  onMounted,
  getCurrentInstance,
  toRefs,
  type CSSProperties,
} from 'vue'
import useNamespace from '../../core/useNamespace'
import { useSelect } from '../../core/useSelect'
import Icon from '../icon/icon.vue'
import { segmentedEmits, segmentedProps, type SegmentedOption, type SegmentedValue } from './props'

const ns = useNamespace('segmented')

const props = defineProps(segmentedProps)
const emit = defineEmits(segmentedEmits)

const instance = getCurrentInstance()
const { modelValue } = toRefs(props)

// 规范化选项数据
const normalizedOptions = computed<SegmentedOption[]>(() => {
  return props.options.map((option) => {
    if (typeof option === 'object') {
      return option as SegmentedOption
    }
    return {
      value: option,
      label: String(option),
    }
  })
})

// 使用 useSelect 管理选中状态
const { onSelect: _onSelect, isSelected } = useSelect<SegmentedOption, SegmentedValue>({
  options: normalizedOptions,
  defaultValue: modelValue,
  valueKey: 'value',
  multiple: false,
  inverse: false,
})

// 当前激活的索引
const activeIndex = computed(() => {
  return normalizedOptions.value.findIndex((option) => isSelected(option.value))
})

// 指示器位置和尺寸
const indicatorWidth = ref(0)
const indicatorLeft = ref(0)
const isUpdating = ref(false) // 防止重复更新

// 指示器样式
const indicatorStyle = computed<CSSProperties>(() => {
  if (activeIndex.value === -1) {
    return {
      opacity: 0,
    }
  }

  // 块级模式使用百分比
  if (props.block) {
    const total = normalizedOptions.value.length
    const width = `${100 / total}%`
    const translateX = `${100 * activeIndex.value}%`
    return {
      width,
      transform: `translateX(${translateX})`,
      opacity: 1,
    }
  }

  // 非块级模式使用实际尺寸
  if (!indicatorWidth.value) {
    return {
      opacity: 0,
    }
  }
  return {
    width: `${indicatorWidth.value}px`,
    transform: `translateX(${indicatorLeft.value}px)`,
    opacity: 1,
  }
})

// 更新指示器位置
const updateIndicatorPosition = () => {
  // 块级模式不需要动态计算
  if (props.block) return
  if (activeIndex.value === -1) return
  // 防止重复调用
  if (isUpdating.value) return

  isUpdating.value = true

  nextTick(() => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select(`.${ns.b()}`)
      .boundingClientRect()
      .selectAll(`.${ns.e('item')}`)
      .boundingClientRect()
      .exec((res: any) => {
        isUpdating.value = false
        if (!res?.[0] || !res?.[1]?.[activeIndex.value]) return

        const containerRect = res[0]
        const itemRect = res[1][activeIndex.value]

        indicatorWidth.value = itemRect.width
        // 减去容器的 padding
        indicatorLeft.value = itemRect.left - containerRect.left - 2
      })
  })
}

// 判断选项是否禁用
const isOptionDisabled = (option: SegmentedOption) => {
  return props.disabled || option.disabled
}

// 处理选择
const handleSelect = (option: SegmentedOption, index: number) => {
  if (isOptionDisabled(option) || isSelected(option.value)) return

  _onSelect(option.value)
  emit('update:modelValue', option.value)
  emit('change', option.value)

  // 触发震动反馈
  if (uni.getDeviceInfo().platform !== 'devtools') {
    uni.vibrateShort({})
  }
}

// 监听激活索引变化
watch(
  activeIndex,
  () => {
    updateIndicatorPosition()
  },
  { flush: 'post' },
)

// 监听规范化选项变化
watch(normalizedOptions, () => {
  updateIndicatorPosition()
})

// 组件挂载后更新位置
onMounted(() => {
  updateIndicatorPosition()
})
</script>

<style lang="scss">
@import './segmented.scss';
</style>
