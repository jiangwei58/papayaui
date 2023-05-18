<template>
  <BottomPopup
    :show="show"
    :title="title"
    :height="height"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', $event as boolean)"
    @close="onClose"
  >
    <view :class="ns.b('content')">
      <Search v-if="showSearch" v-model="searchText" :class="ns.b('search')" />
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
          @click="onSelect(item, index)"
        >
          <slot v-if="$slots.default" :item="item" />
        </ListItem>
        <view v-if="loading" :class="ns.e('loading')">
          <loadmore :status="LoadStatusEnum.LOADING" />
        </view>
        <view v-if="!currentData.length && !loading" :class="ns.e('empty')">无数据</view>
        <SafeBottom v-if="safeAreaInsetBottom && !localState.hasConfirm" />
      </scroll-view>
      <SearchView
        ref="searchViewRef"
        :show="localState.isSearch"
        :options="treeData"
        :field-names="_fieldNames"
        :search-text="searchText"
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
import { LoadStatusEnum } from '../../core/useList'
import useNamespace from '../../core/useNamespace'
import useTree, { TreeNode, UseTreeFieldNames } from '../../core/useTree'
import { EventDetail } from '../../types'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import ButtonComponent from '../button/button.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'
import Tabs from '../tabs/tabs.vue'
import ListItem from '../list-item/list-item.vue'
import SearchView, { SearchNode } from './search-view.vue'

export interface CascaderNode<T = any> {
  props: T
  level: number
}

export type CascaderOption = any
export type CascaderValue = any

export interface CascaderProps {
  /** 值 */
  modelValue?: CascaderValue[]
  /** 显示状态 */
  show?: boolean
  /** 高度 */
  height?: string
  /** 标题 */
  title?: string
  /** 可选项数据源 */
  options?: CascaderOption[]
  /** 自定义 options 结构中的字段 */
  fieldNames?: Partial<UseTreeFieldNames<CascaderOption>>
  /** 最大层级，把哪一层级作为叶子节点 */
  maxLevel?: number
  /** 是否多选 */
  multiple?: boolean
  /** 是否显示搜索 */
  showSearch?: boolean
  /** 动态获取下一级节点数据 */
  lazyLoad?: (node: CascaderNode) => CascaderOption[] | Promise<CascaderOption[]>
  /** 远程搜索 */
  lazySearch?: (searchText: string) => CascaderOption[] | Promise<CascaderOption[]>
  /** 底部安全距离 */
  safeAreaInsetBottom?: boolean
  /** 确定按钮文案，多选时默认数量显示的文案也要自己定义 */
  confirmButtonText?: string
  /** 重置按钮文案 */
  resetButtonText?: string
  /** 确定后是否重置数据 */
  resetAfterConfirm?: boolean
  /** 是否显示底部确认重置按钮，多选时强制开启 */
  showConfirm?: boolean
  /** 是否允许空值，只在显示底部操作按钮时有效（通常使用场景是未选中值时允许确认） */
  allowEmpty?: boolean
}

const ns = useNamespace('cascader')

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: undefined,
  show: false,
  height: undefined,
  title: '',
  options: undefined,
  fieldNames: undefined,
  maxLevel: Number.MAX_SAFE_INTEGER,
  multiple: false,
  lazyLoad: undefined,
  lazySearch: undefined,
  safeAreaInsetBottom: true,
  confirmButtonText: undefined,
  resetButtonText: '重置',
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:modelValue', value: CascaderValue[]): void
  (
    event: 'change',
    value: CascaderValue[],
    items: CascaderOption[],
    extra: { tabIndex: number; isSearch: boolean },
  ): void
  (event: 'reset'): void
  (event: 'confirm'): void
  (event: 'nodeClick', node: TreeNode<CascaderOption>): void
}>()

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
} = useTree<CascaderOption, CascaderValue>({
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
  const tabList = []
  let currentData = treeData.value
  const maxLength = Math.max(
    tabActive.value + 1,
    tabMaxLevel.value + 1,
    currentIndexes.value.length,
  )
  for (let i = 0; i < maxLength; i++) {
    if (i !== 0) {
      currentData = currentData[currentIndexes.value[i - 1]][_fieldNames.value.children] || []
    }
    const index: number | undefined = currentIndexes.value[i]
    const name =
      typeof index !== 'undefined'
        ? currentData[currentIndexes.value[i]][_fieldNames.value.label]
        : '请选择'
    tabList.push({ name })
  }
  return tabList
})

const currentData = computed(() => {
  const path = currentIndexes.value.slice(0, tabActive.value)
  return getChildren(path)
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    init()
  }
})

const init = async () => {
  if (treeData.value.length) return
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

const onSelect = async (item: TreeNode<CascaderOption>, valueIndex: number) => {
  const currentNode = currentData.value[valueIndex]
  currentIndexes.value.splice(tabActive.value, currentIndexes.value.length, valueIndex)
  emit('nodeClick', currentNode)
  // 达到设置的最大层级时直接完成
  if (currentIndexes.value.length >= props.maxLevel) {
    onSelectFinish(item)
    return
  }
  // 根据有无子节点判断
  if (isLeafNode(currentNode)) {
    onSelectFinish(item)
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
  if (setSelect(item) && !localState.value.hasConfirm) {
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

defineExpose({
  clean: onClean,
  reset: onReset,
  clearSelected: onClearSelected,
  setCheckedNodes,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cascader {
  &-content {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  &-search {
    @include _setVar(search-padding, 0 12px);
    flex-shrink: 0;
  }
  &-tab {
    flex-shrink: 0;
  }
  &-list-wrapper {
    flex: 1;
    padding-top: 10;
    overflow: hidden;
  }
  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 28rpx;
    color: _var(color-black-2);
  }
  &__footer {
    display: flex;
    flex-shrink: 0;
    padding: 15rpx 26rpx;
  }
}
</style>
