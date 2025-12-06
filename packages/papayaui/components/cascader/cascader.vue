<template>
  <BottomPopup
    :show="show"
    :title="title"
    :height="height"
    :round="round"
    :z-index="zIndex"
    :overlay="overlay"
    :bg-color="bgColor"
    :closeable="closeable"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="false"
    :duration="duration"
    @update:show="emit('update:show', $event as boolean)"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="onClose"
    @closed="emit('closed')"
  >
    <view :class="ns.b('content')">
      <slot name="before" />
      <Search v-if="showSearch" v-model="searchText" v-bind="searchProps" :class="ns.b('search')" />
      <slot name="after-search" />
      <view v-if="show" :class="ns.b('tab')">
        <Tabs v-model="tabActive" :tabs="tabList" label-key="name" scrollable shrink />
      </view>
      <scroll-view
        scroll-y
        :scroll-top="scrollTop"
        :class="ns.b('list-wrapper')"
        @scroll="onScroll"
      >
        <ListItem
          v-for="(item, index) in currentData"
          :key="`${tabActive}-${index}`"
          :text="item[_fieldNames.label]"
          :selected="
            tabActive < tabList.length - 1
              ? index === currentIndexes[tabActive]
              : isSelected(item[_fieldNames.value])
          "
          :use-slot="!!$slots.default"
          :custom-class="itemClass"
          :custom-style="itemStyle"
          @click="onSelect(item, index)"
        >
          <slot v-if="$slots.default" :item="item" />
        </ListItem>
        <view v-if="loading" :class="ns.e('loading')">
          <loadmore :status="LoadStatusEnum.LOADING" />
        </view>
        <view v-if="!currentData.length && !loading" :class="ns.e('empty')">{{ emptyText }}</view>
        <SafeBottom v-if="safeAreaInsetBottom && !localState.hasConfirm" />
      </scroll-view>
      <SearchView
        ref="searchViewRef"
        :show="localState.isSearch"
        :options="treeData"
        :field-names="_fieldNames"
        :search-text="searchText"
        :empty-text="emptyText"
        :max-level="maxLevel"
        :lazy-search="lazySearch"
        :is-selected="isSelected"
        :safe-area-inset-bottom="safeAreaInsetBottom && !localState.hasConfirm"
        @select="onSelectSearch"
      />
    </view>
    <template v-if="localState.hasConfirm" #footer>
      <view :class="ns.e('footer')">
        <ButtonComponent type="default" block style="width: 30%" @click="onReset()">
          {{ resetButtonText }}
        </ButtonComponent>
        <ButtonComponent
          class="ml-16"
          type="primary"
          block
          :disabled="!allowEmpty && !selectedValues.length"
          style="width: 70%"
          @click="onConfirm()"
        >
          {{
            confirmButtonText ??
            (selectedValues.length ? `已选中${selectedValues.length}个` : '请选择')
          }}
        </ButtonComponent>
      </view>
      <SafeBottom v-if="safeAreaInsetBottom" />
    </template>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, toRaw, toRefs, watch } from 'vue'
import { useCascader } from '../../core/useCascader'
import { LoadStatusEnum } from '../../core/useList'
import useNamespace from '../../core/useNamespace'
import type { TreeNode } from '../../core/useTree'
import type { EventDetail } from '../../types'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import ButtonComponent from '../button/button.vue'
import ListItem from '../list-item/list-item.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'
import Tabs from '../tabs/tabs.vue'
import type { CascaderOption, CascaderValue, SearchNode } from './props'
import { cascaderEmits, cascaderProps } from './props'
import SearchView from './search-view.vue'

const ns = useNamespace('cascader')

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)

const { show, options, fieldNames, multiple } = toRefs(props)

const {
  treeData,
  fieldNames: _fieldNames,
  selectedMap,
  selectedValues,
  getChildren,
  setChildren,
  isLeafNode,
  setSelect,
  clearSelect,
  isSelected,
  getNodePath,
  getNodesByPath,
} = useCascader<CascaderOption, CascaderValue>({
  options,
  fieldNames,
  multiple,
})
const tabActive = ref<number>(0)
const tabMaxLevel = ref<number>(0)
let oldScrollTop = 0
const scrollTop = ref<number>(0)

const loading = ref<boolean>(false)
const currentIndexes = ref<number[]>([])

const searchViewRef = ref<InstanceType<typeof SearchView>>()
const searchText = ref<string>('')

const localState = computed(() => {
  return {
    isLazyLoad: typeof props.lazyLoad === 'function',
    isLazySearch: typeof props.lazySearch === 'function',
    isSearch: !!searchText.value,
    hasConfirm: props.multiple || props.showConfirm,
  }
})

const tabList = computed(() => {
  if (searchText.value) return []
  if (!treeData.value.length || !currentIndexes.value.length) return [{ name: '请选择' }]
  const maxLength = Math.max(
    tabActive.value + 1,
    tabMaxLevel.value + 1,
    currentIndexes.value.length,
  )

  const tabList = getNodesByPath(currentIndexes.value).map((node) => ({
    name: node[_fieldNames.value.label],
  }))
  if (currentIndexes.value.length < maxLength) {
    tabList.push({ name: '请选择' })
  }
  return tabList
})

const currentData = computed(() => {
  const path = currentIndexes.value.slice(0, tabActive.value)
  return getChildren(path)
})

watch(show, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    init()
  }
})

const init = async () => {
  if (treeData.value.length) {
    setSelectedByValues(props.modelValue)
    return
  }
  if (localState.value.isLazyLoad) {
    setChildren(await getData())
  } else {
    console.warn('options or lazyLoad is required')
  }
}

const getData = async (level = 0, nodeProps?: CascaderOption) => {
  try {
    loading.value = true
    let res = props.lazyLoad?.({ props: nodeProps, level }) ?? []
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

const onScroll = (e: EventDetail<{ scrollTop: number }>) => {
  oldScrollTop = e.detail.scrollTop
}

const onSelect = (item: TreeNode<CascaderOption>, valueIndex: number, autoComplete = true) => {
  const currentNode = currentData.value[valueIndex]
  currentIndexes.value.splice(tabActive.value, currentIndexes.value.length, valueIndex)
  emit('nodeClick', currentNode)
  // 达到设置的最大层级时直接完成
  if (currentIndexes.value.length >= props.maxLevel) {
    autoComplete && onSelectFinish(item)
    return
  }
  // 根据有无子节点判断
  if (isLeafNode(currentNode)) {
    autoComplete && onSelectFinish(item)
    return
  }
  // 动态数据
  if (
    !(currentNode[_fieldNames.value.children] as TreeNode<CascaderOption>[])?.length &&
    localState.value.isLazyLoad
  ) {
    getData(tabActive.value + 1, currentNode).then((res) => {
      setChildren(res, currentNode)
    })
  }
  tabActive.value += 1
  tabMaxLevel.value = tabActive.value
  scrollTop.value = oldScrollTop
  nextTick(() => {
    scrollTop.value = 0
  })
}

const onSelectSearch = (item: SearchNode) => {
  if (!localState.value.isLazySearch) {
    currentIndexes.value = getNodePath(item)
  }
  onSelectFinish(item)
}

const onSelectFinish = (item: TreeNode<CascaderOption>) => {
  // 多选或者开启确认按钮时，只设置选中数据
  if (localState.value.hasConfirm) {
    setSelect(item)
    return
  }
  // 单选时，选中已选中的节点时直接关闭弹窗
  if (isSelected(item[_fieldNames.value.value])) {
    onClose()
    return
  }
  // 单选时，节点选择成功时修改数据并关闭弹窗
  if (setSelect(item)) {
    onConfirm()
  }
}

const onConfirm = () => {
  const newSelectedOptions: TreeNode<CascaderOption>[][] = []
  const newSelectedValues: CascaderValue[][] = []

  const selectedNodes = [...selectedMap.value.values()] as TreeNode<SearchNode>[]
  selectedNodes.forEach((node, index) => {
    const path = getNodePath(node)
    newSelectedOptions[index] = []
    newSelectedValues[index] = []

    if (node.__remoteSearch) {
      // 远程搜索数据场景
      const nodeRaw = toRaw(node)
      newSelectedOptions[index].push(nodeRaw)
      newSelectedValues[index].push(nodeRaw[_fieldNames.value.value as keyof typeof nodeRaw])
    } else {
      // 本地数据或已经加载到本地数据的场景
      let curTreeData = treeData.value
      for (let i = 0; i < path.length; i++) {
        const nodeRaw = toRaw(curTreeData[path[i]])
        newSelectedOptions[index].push(nodeRaw)
        newSelectedValues[index].push(nodeRaw[_fieldNames.value.value])
        if (i < path.length - 1) {
          curTreeData = nodeRaw[_fieldNames.value.children]
        }
      }
    }
  })

  const values = multiple.value ? newSelectedValues : newSelectedValues[0]
  emit('update:modelValue', values)
  emit('change', values, multiple.value ? newSelectedOptions : newSelectedOptions[0], {
    tabIndex: tabActive.value,
    isSearch: localState.value.isSearch,
  })
  emit('confirm')
  onClose()
  if (props.resetAfterConfirm) {
    onReset()
  }
}

const onClose = () => {
  searchText.value = ''
  emit('update:show', false)
  emit('close')
}

/** 重置数据（清除选中数据，还原tab选中状态） */
const onReset = () => {
  tabActive.value = 0
  currentIndexes.value = []
  onClearSelected()
  emit('reset')
}

/** 清除所有数据 */
const onClean = () => {
  treeData.value = []
  onReset()
}

/** 清除选中数据 */
const onClearSelected = () => {
  clearSelect()
}

const setCheckedNodes = (node: CascaderOption | CascaderOption[]) => {
  const nodes = Array.isArray(node) ? node : [node]
  nodes.forEach((nodeItem) => {
    setSelect(nodeItem)
  })
}

/**
 * 根据值反推列表项并选中
 */
const setSelectedByValues = (values?: CascaderValue[]) => {
  // 排除无值、已选中路径的情况
  if (!values?.length || currentIndexes.value.length) return
  // 根据值反推节点，节点值一样的情况下会有问题，无法避免
  let currentData = treeData.value
  const params = values.map<[TreeNode<CascaderOption>, number]>((value) => {
    const findIndex = currentData.findIndex(
      (item) => item[fieldNames.value.value as keyof typeof item] === value,
    )
    currentData = currentData[findIndex][fieldNames.value.children as keyof CascaderOption] ?? []
    return [currentData[findIndex], findIndex]
  })
  // 判定是否能找到完整路径，防止数据不全半路中断
  if (values.length !== params.length) return
  params.forEach((param) => {
    onSelect(...param, false)
  })
}

defineExpose({
  clean: onClean,
  reset: onReset,
  clearSelected: onClearSelected,
  setCheckedNodes,
  setSelectedByValues,
})
</script>

<style lang="scss">
@import './cascader.scss';
</style>
