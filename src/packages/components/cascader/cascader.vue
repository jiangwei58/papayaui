<template>
  <BottomPopup
    :show="show"
    :title="title"
    :height="height"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', $event as boolean)"
    @close="onClose"
    @confirm="onOk"
  >
    <view class="content flex flex-col">
      <view v-if="show" class="tab flex-shrink-0">
        <Tabs v-model="tabCurrent" :tabs="tabList" label-key="name" :scrollable="true" />
      </view>
      <Search v-if="showSearch" v-model="searchText" class="flex-shrink-0" />
      <scroll-view
        scroll-y
        :scroll-top="scrollTop"
        class="flex-1"
        :class="{ 'pt-12': !showSearch }"
        style="overflow: hidden"
        @scroll="onScroll"
      >
        <view
          v-for="(item, index) in currentData"
          :key="index"
          class="list-item flex items-center justify-between px-32 py-20 text-28 leading-40"
          :class="{ 'color-primary': index === currentIndexs[tabCurrent] }"
          hover-class="bg-hover"
          @tap="onSelect(index)"
        >
          <slot v-if="$slots.default" :item="item" />
          <text v-else>{{ item[labelKey] }}</text>
          <Icon
            v-if="index === currentIndexs[tabCurrent]"
            name="success"
            :color="`var(--${PREFIX}-color-primary)`"
            block
          />
        </view>
        <view v-if="loading" class="height-full flex flex-col items-center justify-center">
          <loadmore :status="LoadStatusEnum.LOADING" />
        </view>
        <view
          v-if="!currentData.length && !loading"
          class="height-full flex flex-col items-center justify-center text-28 text-black-2"
        >
          无数据
        </view>
        <SafeBottom v-if="safeAreaInsetBottom" />
      </scroll-view>
    </view>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch, toRefs } from 'vue'
import { LoadStatusEnum } from '../../core/useList'
import { PREFIX } from '../../utils/style'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import Icon from '../icon/icon.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'
import Tabs from '../tabs/tabs.vue'

export interface CascaderNode<T = any> {
  props: T
  level: number
}

export type CascaderOption = any
export type CascaderValue = number | string

export interface CascaderProps {
  modelValue?: CascaderValue[]
  /** 显示状态 */
  show?: boolean
  /** 高度 */
  height?: string
  /** 标题 */
  title?: string
  /** 树形数据 */
  data?: CascaderOption[]
  /** 数据标题的字段名 */
  labelKey?: string
  /** 数据值的字段名 */
  valueKey?: string
  /** 数据子级节点的字段名 */
  childrenKey?: string
  /** 叶子节点 */
  isLeaf?: string | ((item: CascaderOption) => boolean)
  /** 最大层级，把哪一层级作为叶子节点 */
  maxLevel?: number
  /** 是否显示搜索 */
  showSearch?: boolean
  /** 动态获取下一级节点数据 */
  load?: (node: CascaderNode) => CascaderOption[] | Promise<CascaderOption[]>
  /** 底部安全距离 */
  safeAreaInsetBottom?: boolean
}

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: undefined,
  show: false,
  height: undefined,
  title: '',
  data: undefined,
  labelKey: 'label',
  valueKey: 'value',
  childrenKey: 'children',
  maxLevel: Number.MAX_SAFE_INTEGER,
  load: undefined,
  isLeaf: undefined,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:modelValue', value: CascaderValue[]): void
  (event: 'change', value: CascaderValue[], items: CascaderOption[], tabIndex: number): void
}>()

const { show, data } = toRefs(props)

const tabCurrent = ref<number>(0)
const oldScrollTop = ref<number>(0)
const scrollTop = ref<number>(0)

const searchText = ref<string>('')
const treeData = ref<CascaderOption[]>([])
const currentIndexs = ref<number[]>([])
const treeMaxLevel = ref<number>(props.maxLevel)
const loading = ref<boolean>(false)

const tabList = computed(() => {
  if (!treeData.value.length || !currentIndexs.value.length) return [{ name: '请选择' }]
  const tabList = []
  let currentData = treeData.value
  for (let i = 0; i < currentIndexs.value.length; i++) {
    if (i !== 0) {
      currentData = currentData[currentIndexs.value[i - 1]][props.childrenKey] || []
    }
    if (currentData) {
      tabList.push({ name: currentData[currentIndexs.value[i]][props.labelKey] })
    }
  }
  if (tabList.length < treeMaxLevel.value) {
    tabList.push({ name: '请选择' })
  }
  return tabList
})

const currentData = computed(() => {
  if (!treeData.value.length) return []
  let currentData = treeData.value
  for (let i = 1; i <= tabCurrent.value; i++) {
    currentData = currentData[currentIndexs.value[i - 1]][props.childrenKey] || []
  }
  return props.showSearch
    ? currentData.filter((item) => item[props.labelKey].indexOf(searchText.value) !== -1)
    : currentData
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    init()
  }
})

const init = async () => {
  if (treeData.value.length) return
  if (typeof props.data !== 'undefined') {
    treeData.value = props.data
  } else if (typeof props.load === 'function') {
    treeData.value = await getData()
  } else {
    console.warn('data or load is required')
  }
}

watch(data, (newVal) => {
  treeData.value = newVal
})

const getData = async (level = 0, nodeProps?: CascaderOption) => {
  try {
    loading.value = true
    let res = props.load({ props: nodeProps, level })
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

const onScroll = (e: any) => {
  oldScrollTop.value = e.detail.scrollTop
}

const getNodeIsLeaf = (item: CascaderOption): boolean => {
  if (typeof props.isLeaf === 'string') {
    return !!item[props.isLeaf]
  }
  if (typeof props.isLeaf === 'function') {
    return props.isLeaf(item)
  }
  return !item[props.childrenKey]?.length
}

const onSelect = async (valueIndex: number) => {
  const newIndexs = [...currentIndexs.value]
  newIndexs.splice(tabCurrent.value, currentIndexs.value.length, valueIndex)
  currentIndexs.value = newIndexs
  const currentNode = currentData.value[valueIndex]
  // 达到设置的最大层级时直接完成
  if (newIndexs.length >= props.maxLevel) {
    onOk()
    return
  }
  // 根据有无子节点判断
  if (getNodeIsLeaf(currentNode)) {
    if (typeof props.load === 'function') {
      getData(tabCurrent.value + 1, currentNode).then((res) => {
        currentNode[props.childrenKey] = res
      })
    } else {
      onOk()
      return
    }
  }
  tabCurrent.value += 1
  scrollTop.value = oldScrollTop.value
  nextTick(function () {
    scrollTop.value = 0
  })
}

const onOk = () => {
  let currentNode: CascaderOption
  const selectedOptions = currentIndexs.value.reduce<CascaderOption[]>(
    (result, curIndex, index) => {
      if (index === 0) {
        currentNode = treeData.value[curIndex]
      } else {
        currentNode = currentNode[props.childrenKey][curIndex]
      }
      result.push({ ...currentNode, [props.childrenKey]: undefined })
      return result
    },
    [],
  )
  const values = selectedOptions.map((item) => item[props.valueKey])
  treeMaxLevel.value = currentIndexs.value.length
  emit('update:modelValue', values)
  emit('change', values, selectedOptions, tabCurrent.value)
  onClose()
}

const onClose = () => {
  // currentIndexs.value = []
  // tabCurrent.value = 0
  emit('update:show', false)
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  height: 100%;
  padding-top: 90rpx;
}
.tab {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
