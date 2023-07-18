<template>
  <scroll-view v-show="show" scroll-y :class="ns.b()">
    <ListItem
      v-for="(item, index) in searchData"
      :key="`search-${index}`"
      :text="item.__label"
      :selected="isSelected(item[fieldNames.value as keyof SearchNode])"
      @click="onSelect(item)"
    />
    <view v-if="loading" :class="ns.e('loading')">
      <loadmore :status="LoadStatusEnum.LOADING" />
    </view>
    <view v-if="!searchData.length && !loading" :class="ns.e('empty')">无数据</view>
    <SafeBottom v-if="safeAreaInsetBottom" />
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import { LoadStatusEnum } from '../../core/useList'
import useNamespace from '../../core/useNamespace'
import { debounce } from '../../utils/common'
import ListItem from '../list-item/list-item.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import type { CascaderOption, SearchNode } from './props'
import { cascaderSearchViewEmits, cascaderSearchViewProps } from './props'

const ns = useNamespace('cascader-search-view')

const props = defineProps(cascaderSearchViewProps)
const emit = defineEmits(cascaderSearchViewEmits)

const { options, fieldNames, searchText, lazySearch } = toRefs(props)

const searchData = ref<SearchNode[]>([])
const loading = ref<boolean>(false)

watch(searchText, (newVal) => {
  debounceUpdateData(newVal)
})

const getFlattenTreeData = (data: CascaderOption[], remote?: boolean, filterStr?: string) => {
  const result: SearchNode[] = []
  const loop = (list: CascaderOption[], prefixLabel = '', parentPath = '') => {
    list.forEach((item, index) => {
      const newItem = item as any
      const node: SearchNode = {
        ...newItem,
        __path: parentPath ? `${parentPath}-${index}` : index.toString(),
        __label: `${prefixLabel}${prefixLabel ? '/' : ''}${newItem[fieldNames.value.label]}`,
        __remoteSearch: !!remote,
      }
      if (newItem[fieldNames.value.children]?.length) {
        loop(newItem[fieldNames.value.children], node.__label, node.__path)
      } else {
        ;(filterStr ? node.__label.includes(filterStr) : true) && result.push(node)
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
    searchData.value = getFlattenTreeData(res, true)
    loading.value = false
  } else {
    searchData.value = getFlattenTreeData(options.value, false, text.trim())
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
}
</style>
