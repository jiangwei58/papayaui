<template>
  <BottomPopup
    :show="show"
    :title="title"
    :height="height"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', $event as boolean)"
    @close="onClose"
  >
    <view :class="computedClass('cascader-content')" class="flex flex-col">
      <Search
        v-if="showSearch"
        v-model="searchText"
        :class="computedClass('cascader-search')"
        class="flex-shrink-0"
      />
      <view v-if="show" class="tab flex-shrink-0">
        <Tabs v-model="tabActive" :tabs="tabList" label-key="name" scrollable shrink />
      </view>
      <scroll-view
        scroll-y
        :scroll-top="scrollTop"
        class="flex-1 pt-10"
        style="overflow: hidden"
        @scroll="onScroll"
      >
        <ListItem
          v-for="(item, index) in currentData"
          :key="`${tabActive}-${index}`"
          :selected="
            tabActive < tabList.length - 1
              ? index === currentIndexs[tabActive]
              : isSelected(item[_fieldNames.value])
          "
          @select="onSelect(item, index)"
        >
          <slot v-if="$slots.default" :item="item" />
          <text v-else>{{ item[_fieldNames.label] }}</text>
        </ListItem>
        <view v-if="loading" class="height-full flex flex-col items-center justify-center">
          <loadmore :status="LoadStatusEnum.LOADING" />
        </view>
        <view
          v-if="!currentData.length && !loading"
          class="height-full flex flex-col items-center justify-center text-28 text-black-2"
        >
          无数据
        </view>
        <SafeBottom v-if="safeAreaInsetBottom && !multiple" />
      </scroll-view>
      <SearchView
        ref="searchViewRef"
        :show="localState.isSearch"
        :options="treeData"
        :field-names="_fieldNames"
        :search-text="searchText"
        :lazy-search="lazySearch"
        :is-selected="isSelected"
        :safe-area-inset-bottom="safeAreaInsetBottom && !multiple"
        @select="onSelectSearch"
      />
    </view>
    <template v-if="safeAreaInsetBottom && multiple" #footer>
      <view class="px-26 pt-15 flex flex-shrink-0">
        <ButtonComponent type="default" block style="width: 30%" @click="onReset()">
          {{ resetButtonText }}
        </ButtonComponent>
        <ButtonComponent
          class="ml-16"
          type="primary"
          block
          :disabled="!selectedValues.length"
          style="width: 70%"
          @click="onConfirm()"
        >
          {{
            confirmButtonText ?? selectedValues.length
              ? `已选中${selectedValues.length}个`
              : '请选择'
          }}
        </ButtonComponent>
      </view>
      <SafeBottom />
    </template>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, toRaw, toRefs, watch } from 'vue'
import { LoadStatusEnum } from '../../core/useList'
import useTree, { UseTreeFieldNames } from '../../core/useTree'
import { EventDetail } from '../../types'
import { computedClass } from '../../utils/style'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import ButtonComponent from '../button/button.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'
import Tabs from '../tabs/tabs.vue'
import ListItem from './list-item.vue'
// import ListView from './list-view.vue'
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
}

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
const currentIndexs = ref<number[]>([])

const searchViewRef = ref<InstanceType<typeof SearchView>>()
const searchText = ref<string>('')

const localState = computed(() => {
  return {
    isLazyLoad: typeof props.lazyLoad === 'function',
    isLazySearch: typeof props.lazySearch === 'function',
    isSearch: !!searchText.value,
  }
})

const tabList = computed(() => {
  if (searchText.value) return []
  if (!treeData.value.length || !currentIndexs.value.length) return [{ name: '请选择' }]
  const tabList = []
  let currentData = treeData.value
  const maxLength = Math.max(tabActive.value + 1, tabMaxLevel.value + 1, currentIndexs.value.length)
  for (let i = 0; i < maxLength; i++) {
    if (i !== 0) {
      currentData = currentData[currentIndexs.value[i - 1]][_fieldNames.value.children] || []
    }
    const index: number | undefined = currentIndexs.value[i]
    const name =
      typeof index !== 'undefined'
        ? currentData[currentIndexs.value[i]][_fieldNames.value.label]
        : '请选择'
    tabList.push({ name })
  }
  return tabList
})

const currentData = computed(() => {
  const path = currentIndexs.value.slice(0, tabActive.value)
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
    console.warn('data or lazyLoad is required')
  }
}

const getData = async (level = 0, nodeProps?: CascaderOption) => {
  try {
    loading.value = true
    let res = props.lazyLoad({ props: nodeProps, level })
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

const onSelect = async (item: CascaderOption, valueIndex: number) => {
  const currentNode = currentData.value[valueIndex]
  currentIndexs.value.splice(tabActive.value, currentIndexs.value.length, valueIndex)
  // 达到设置的最大层级时直接完成
  if (currentIndexs.value.length >= props.maxLevel) {
    onSelectFinish(item)
    return
  }
  // 根据有无子节点判断
  if (isLeafNode(currentNode)) {
    onSelectFinish(item)
    return
  }
  // 动态数据
  if (!currentNode[_fieldNames.value.children]?.length && localState.value.isLazyLoad) {
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
    currentIndexs.value = item.__path
    onSelectFinish(item)
  } else {
    onSelectFinish(item, item.__path)
  }
}

const onSelectFinish = (item: CascaderOption, path: number[] = [...currentIndexs.value]) => {
  if (setSelect(item, path) && !multiple.value) {
    onConfirm()
  }
}

const onConfirm = () => {
  const newSelectedOptions: CascaderOption[] = []
  const newSelectedValues: CascaderValue[] = []

  const paths = [...selectedMap.value.values()]

  if (localState.value.isSearch && localState.value.isLazySearch) {
    // 远程搜索数据场景
    const data = searchViewRef.value?.searchData ?? []
    paths.forEach((path, index) => {
      if (path.length > 1) return
      newSelectedOptions[index] = []
      newSelectedValues[index] = []
      const node: CascaderOption = data[path[0]]
      newSelectedOptions[index].push(node)
      newSelectedValues[index].push(node[_fieldNames.value.value])
    })
  } else {
    // 本地数据或已经加载到本地数据的场景
    paths.forEach((path, index) => {
      newSelectedOptions[index] = []
      newSelectedValues[index] = []
      let data = treeData.value
      for (let i = 0; i < path.length; i++) {
        const node = toRaw(data[path[i]])
        newSelectedOptions[index].push(node)
        newSelectedValues[index].push(node[_fieldNames.value.value])
        if (i < path.length - 1) {
          data = node[_fieldNames.value.children]
        }
      }
    })
  }

  const values = multiple.value ? newSelectedValues : newSelectedValues[0]
  emit('update:modelValue', values)
  emit('change', values, multiple.value ? newSelectedOptions : newSelectedOptions[0], {
    tabIndex: tabActive.value,
    isSearch: localState.value.isSearch,
  })
  onClose()
}

const onReset = () => {
  tabActive.value = 0
  currentIndexs.value = []
  clearSelect()
}

const onClose = () => {
  // currentIndexs.value = []
  // tabActive.value = 0
  searchText.value = ''
  emit('update:show', false)
}

const onClean = () => {
  treeData.value = []
  onReset()
}

defineExpose({
  clean: onClean,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cascader-content {
  position: relative;
  height: 100%;
}
.#{$prefix}-cascader-search {
  @include _setVar(search-padding, 0 12px);
}
</style>
