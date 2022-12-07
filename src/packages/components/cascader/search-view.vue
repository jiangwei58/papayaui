<template>
  <scroll-view v-show="show" scroll-y :class="computedClass('cascader-search-view')">
    <ListItem
      v-for="(item, index) in searchData"
      :key="`search-${index}`"
      :selected="isSelected(item[fieldNames.value as keyof SearchNode])"
      @select="onSelect(item)"
    >
      <text>{{ item.__label }}</text>
    </ListItem>
    <view v-if="loading" class="height-full flex flex-col items-center justify-center">
      <loadmore :status="LoadStatusEnum.LOADING" />
    </view>
    <view
      v-if="!searchData.length && !loading"
      class="height-full flex flex-col items-center justify-center text-28 text-black-2"
    >
      无数据
    </view>
    <SafeBottom v-if="safeAreaInsetBottom" />
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import { UseTreeFieldNames } from '../../core/useTree'
import { LoadStatusEnum } from '../../hooks'
import { debounce } from '../../utils/common'
import { computedClass } from '../../utils/style'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import { CascaderOption, CascaderValue } from './cascader.vue'
import ListItem from './list-item.vue'

export interface CascaderSearchViewProps {
  show?: boolean
  options: CascaderOption[]
  fieldNames: UseTreeFieldNames<CascaderOption>
  searchText: string
  lazySearch?: (searchText: string) => CascaderOption[] | Promise<CascaderOption[]>
  isSelected: (value: CascaderValue) => boolean
  safeAreaInsetBottom?: boolean
}

export interface SearchNode extends CascaderOption {
  __label: string
  __path: number[]
}

const props = defineProps<CascaderSearchViewProps>()

const emit = defineEmits<{
  (event: 'select', item: SearchNode): void
}>()

const { options, fieldNames, searchText, lazySearch } = toRefs(props)

const searchData = ref<SearchNode[]>([])
const loading = ref<boolean>(false)

watch(searchText, (newVal) => {
  debounceUpdateData(newVal)
})

const getFlattenTreeData = (data: CascaderOption[], filterStr?: string) => {
  const result: SearchNode[] = []
  const loop = (list: CascaderOption[], prefixLabel = '', path: number[] = []) => {
    list.forEach((item, index) => {
      const newItem: SearchNode = {
        ...item,
        __label: `${prefixLabel}${prefixLabel ? '/' : ''}${item[fieldNames.value.label]}`,
        __path: path.concat(index),
      }
      if (item[fieldNames.value.children]?.length) {
        loop(item[fieldNames.value.children], newItem.__label, newItem.__path)
      } else {
        ;(filterStr ? newItem.__label.includes(filterStr) : true) && result.push(newItem)
      }
    })
  }
  loop(data)
  return result
}

const updateData = async (text: string) => {
  if (!text) {
    searchData.value = []
    return
  }
  if (typeof lazySearch?.value === 'function') {
    searchData.value = []
    loading.value = true
    let res = lazySearch.value(text)
    if (res instanceof Promise) {
      res = await res
    }
    searchData.value = getFlattenTreeData(res)
    loading.value = false
  } else {
    searchData.value = getFlattenTreeData(options.value, text)
  }
}
const debounceUpdateData = debounce(updateData, 300)

const onSelect = (item: SearchNode) => {
  emit('select', item)
}

defineExpose({
  searchData,
  onSelect,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cascader-search-view {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: calc(100% - 50px);
  background-color: #fff;
}
</style>
