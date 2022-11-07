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
          v-if="!currentData.length"
          class="height-full flex flex-col items-center justify-center text-28 text-black-2"
        >
          无数据
        </view>
      </scroll-view>
    </view>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, watch, toRefs, ref, nextTick } from 'vue'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import Tabs from '../tabs/tabs.vue'
import Icon from '../icon/icon.vue'
import Search from '../search/search.vue'
import Loadmore from '../loadmore/loadmore.vue'
import { LoadStatusEnum } from '../../hooks/useList'
import { PREFIX } from '../../utils/style'

export interface CascaderNode<T = any> {
  props: T
  level: number
}

type CascaderOption = any
type CascaderValue = number | string

interface OwnProps {
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
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: undefined,
  show: false,
  height: undefined,
  title: '',
  data: () => [],
  labelKey: 'label',
  valueKey: 'value',
  childrenKey: 'children',
  maxLevel: Number.MAX_SAFE_INTEGER,
  load: undefined,
  isLeaf: undefined,
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:modelValue', value: CascaderValue[]): void
  (event: 'change', value: CascaderValue[], items: CascaderOption[], tabIndex: number): void
}>()

const { show, data, labelKey, valueKey, childrenKey, maxLevel, showSearch, load, isLeaf } =
  toRefs(props)

const tabCurrent = ref<number>(0)
const oldScrollTop = ref<number>(0)
const scrollTop = ref<number>(0)

const searchText = ref<string>('')
const treeData = ref<CascaderOption[]>(data.value)
const currentIndexs = ref<number[]>([])
const loading = ref<boolean>(false)

const tabList = computed(() => {
  if (!treeData.value.length || !currentIndexs.value.length) return [{ name: '请选择' }]
  const tabList = []
  let currentData = treeData.value
  for (let i = 0; i < currentIndexs.value.length; i++) {
    if (i !== 0) {
      currentData = currentData[currentIndexs.value[i - 1]][childrenKey.value] || []
    }
    if (currentData) {
      tabList.push({ name: currentData[currentIndexs.value[i]][labelKey.value] })
    }
  }
  if (tabList.length < maxLevel.value) {
    tabList.push({ name: '请选择' })
  }
  return tabList
})

const currentData = computed(() => {
  if (!treeData.value.length) return []
  let currentData = treeData.value
  for (let i = 1; i <= tabCurrent.value; i++) {
    currentData = currentData[currentIndexs.value[i - 1]][childrenKey.value] || []
  }
  return showSearch
    ? currentData.filter((item) => item[labelKey.value].indexOf(searchText.value) !== -1)
    : currentData
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    if (!treeData.value.length) {
      treeData.value = await getData()
    }
  }
})

watch(data, (newVal) => {
  treeData.value = newVal
})

const getData = async (level = 0, nodeProps?: CascaderOption) => {
  try {
    if (typeof load.value !== 'function') throw new Error('未传请求函数')
    loading.value = true
    let res = load.value({ props: nodeProps, level })
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

const getNodeIsLeft = (item: CascaderOption): boolean => {
  if (typeof isLeaf.value === 'string') {
    return !!item[isLeaf.value]
  }
  if (typeof isLeaf.value === 'function') {
    return isLeaf.value(item)
  }
  return !item[childrenKey.value]?.length
}

const onSelect = async (valueIndex: number) => {
  const newIndexs = [...currentIndexs.value]
  newIndexs.splice(tabCurrent.value, currentIndexs.value.length, valueIndex)
  currentIndexs.value = newIndexs
  const currentNode = currentData.value[valueIndex]
  // 达到设置的最大层级时直接完成
  if (newIndexs.length >= maxLevel.value) {
    onOk()
    return
  }
  // 根据有无子节点判断
  if (getNodeIsLeft(currentNode)) {
    if (typeof load.value === 'function') {
      getData(tabCurrent.value + 1, currentNode).then((res) => {
        currentNode[childrenKey.value] = res
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
        currentNode = currentNode[childrenKey.value][curIndex]
      }
      result.push({ ...currentNode, [childrenKey.value]: undefined })
      return result
    },
    [],
  )
  const values = selectedOptions.map((item) => item[valueKey.value])
  emit('update:modelValue', values)
  emit('change', values, selectedOptions, tabCurrent.value)
  onClose()
}

const onClose = () => {
  currentIndexs.value = []
  tabCurrent.value = 0
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
