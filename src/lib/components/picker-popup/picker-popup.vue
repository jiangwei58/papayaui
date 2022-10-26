<template>
  <BottomPopup
    :model-value="show"
    :title="title"
    :height="height"
    @update:model-value="emit('update:show', $event as boolean)"
    @close="onClose"
    @confirm="onOk"
  >
    <view class="content flex flex-col">
      <Search v-if="showSearch" v-model="searchText" class="flex-shrink-0" />
      <scroll-view scroll-y class="flex-1" style="overflow: hidden">
        <view
          v-for="(item, index) in filterOptions"
          :key="index"
          class="list-item flex items-center justify-between px-32 py-20 text-28 leading-40"
          :class="{ 'color-primary': selectedSet.has(item[valueKey]) }"
          hover-class="bg-hover"
          @tap="onSelect(item[valueKey])"
        >
          <slot v-if="$slots.default" :item="item" />
          <text v-else>{{ item[labelKey] }}</text>
          <Icon
            v-if="selectedSet.has(item[valueKey])"
            name="success"
            :color="`var(--${PREFIX}-color-primary)`"
            block
          />
        </view>
        <view v-if="loading" class="height-full flex flex-col items-center justify-center">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </view>
        <view
          v-if="!filterOptions.length"
          class="height-full flex flex-col items-center justify-center text-28 text-black-2"
        >
          无数据
        </view>
        <SafeBottom v-if="!multiple" />
      </scroll-view>
      <view v-if="multiple" class="footer px-26 py-15 flex-shrink-0">
        <button class="base-btn" @click="onOk()">确定</button>
      </view>
      <SafeBottom v-if="multiple" />
    </view>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { watch, toRefs, ref, computed } from 'vue'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import Icon from '../icon/icon.vue'
import Search from '../search/search.vue'
import { PREFIX } from '@/lib/utils/style'
import SafeBottom from '../safe-bottom/safe-bottom.vue'

type NodeItem = any
type NodeItemValue = number | string

interface OwnProps {
  modelValue?: NodeItemValue | NodeItemValue[]
  /** 显示状态 */
  show?: boolean
  /** 高度 */
  height?: string
  /** 标题 */
  title?: string
  /** 树形数据 */
  data?: NodeItem[]
  /** 数据标题的字段名 */
  labelKey?: string
  /** 数据值的字段名 */
  valueKey?: string
  /** 是否显示搜索 */
  showSearch?: boolean
  /** 是否多选 */
  multiple?: boolean
  /** 动态获取下一级节点数据 */
  load?: (level: number, node?: NodeItem) => NodeItem[] | Promise<NodeItem[]>
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: undefined,
  show: false,
  height: undefined,
  title: '',
  data: () => [],
  labelKey: 'label',
  valueKey: 'value',
  multiple: false,
  load: () => [],
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:modelValue', value: NodeItemValue | NodeItemValue[]): void
  (event: 'change', item: NodeItem | NodeItem[]): void
}>()

const { show, modelValue, data, labelKey, valueKey, multiple, showSearch, load } = toRefs(props)

const searchText = ref<string>('')
const options = ref<NodeItem[]>(data.value)
const selectedSet = ref<Set<NodeItemValue>>(new Set())
const loading = ref<boolean>(false)

const filterOptions = computed(() => {
  return options.value.filter((item) => item[labelKey.value].indexOf(searchText.value) !== -1)
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    if (!options.value.length) {
      options.value = await getData()
    }
    init()
  }
})

const init = () => {
  const defaultValues = Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
  defaultValues.forEach((value) => {
    if (typeof value !== 'undefined') {
      selectedSet.value.add(value)
    }
  })
}

const getData = async (level = 0, node?: NodeItem) => {
  try {
    loading.value = true
    let res = load.value(level, node)
    if (res instanceof Promise) {
      res = await res
    }
    loading.value = false
    return res
  } catch (e) {
    loading.value = false
    return []
  }
}

const onSelect = async (value: NodeItemValue) => {
  if (selectedSet.value.has(value)) {
    selectedSet.value.delete(value)
  } else {
    selectedSet.value.add(value)
  }
  if (!multiple.value) {
    onOk()
  }
}

const onOk = () => {
  const selectedNodes = options.value.filter((item) => selectedSet.value.has(item[valueKey.value]))
  emit('update:modelValue', multiple.value ? [...selectedSet.value] : [...selectedSet.value][0])
  emit('change', multiple.value ? selectedNodes : selectedNodes[0])
  onClose()
}

const onClose = () => {
  selectedSet.value.clear()
  emit('update:show', false)
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  height: 100%;
}
</style>
