<template>
  <BottomPopup
    :model-value="show"
    :title="title"
    @update:model-value="emit('update:show', $event as boolean)"
    @close="onClose"
    @confirm="onOk"
  >
    <view class="content">
      <view v-if="show" class="tab">
        <WeiTabs v-model="tabCurrent" :tabs="tabList" label-key="name" :scrollable="true" />
      </view>
      <scroll-view scroll-y :scroll-top="scrollTop" class="height-full pt-12" @scroll="onScroll">
        <view
          v-for="(item, index) in currentData"
          :key="index"
          class="list-item flex justify-between px-32 py-20 text-30 leading-40"
          :class="{ 'color-primary': index === currentIndexs[tabCurrent] }"
          hover-class="bg-hover"
          @tap="onSelect(index)"
        >
          {{ item[labelKey] }}
          <WeiIcon v-if="index === currentIndexs[tabCurrent]" name="success" />
        </view>
        <view v-if="loading" class="height-full flex flex-col items-center justify-center">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </view>
        <view
          v-if="!currentData.length"
          class="height-full flex flex-col items-center justify-center text-30 text-black-2"
        >
          无数据
        </view>
      </scroll-view>
    </view>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, watch, toRefs, ref, nextTick } from 'vue'
import BottomPopup from '../wei-bottom-popup/wei-bottom-popup.vue'
import WeiTabs from '../wei-tabs/wei-tabs.vue'
import WeiIcon from '../wei-icon/wei-icon.vue'

type TreeNode = any

interface OwnProps {
  modelValue?: number
  show?: boolean
  title?: string
  data?: TreeNode[]
  labelKey?: string
  valueKey?: string
  childrenKey?: string
  max?: number
  confirmButton?: boolean
  load?: (level: number, node?: TreeNode) => TreeNode[] | Promise<TreeNode[]>
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: undefined,
  show: false,
  title: '',
  data: () => [],
  labelKey: 'label',
  valueKey: 'value',
  childrenKey: 'children',
  max: 3,
  confirmButton: false,
  load: () => [],
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:value', id: number): void
  (event: 'change', item: TreeNode): void
}>()

const { show, data, labelKey, childrenKey, max, confirmButton, load } = toRefs(props)

const tabCurrent = ref<number>(0)
const oldScrollTop = ref<number>(0)
const scrollTop = ref<number>(0)
const treeData = ref<TreeNode[]>(data.value)
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
  if (tabList.length < max.value) {
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
  return currentData
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    if (!treeData.value.length) {
      getData()
    }
    // 一级节点只有一条默认选择
    if (treeData.value.length === 1) {
      onSelect(0)
    }
  }
})

const getData = async (level = 0, node?: TreeNode) => {
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

const onScroll = (e: any) => {
  oldScrollTop.value = e.detail.scrollTop
}

const onSelect = async (valueIndex: number) => {
  const newIndexs = [...currentIndexs.value]
  newIndexs.splice(tabCurrent.value, currentIndexs.value.length, valueIndex)
  currentIndexs.value = newIndexs
  const currentNode = currentData.value[valueIndex]
  if (currentNode && newIndexs.length < max.value) {
    if (!currentNode[childrenKey.value]?.length) {
      getData(tabCurrent.value + 1, currentNode).then((res) => {
        currentNode[childrenKey.value] = res
      })
    }
    tabCurrent.value += 1
    scrollTop.value = oldScrollTop.value
    nextTick(function () {
      scrollTop.value = 0
    })
  } else {
    if (!confirmButton.value) {
      onOk()
    }
  }
}

const onOk = () => {
  const item = currentData.value[currentIndexs.value[max.value - 1]]
  emit('update:value', item.id)
  emit('change', item)
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
