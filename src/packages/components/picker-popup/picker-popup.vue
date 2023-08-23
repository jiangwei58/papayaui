<template>
  <BottomPopup
    :class="ns.b()"
    :show="show"
    :title="title"
    :height="height"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', $event as boolean)"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="onClose"
    @closed="emit('closed')"
    @confirm="onOk"
  >
    <view :class="ns.b('content')">
      <Search
        v-if="showSearch"
        v-model="searchText"
        :class="ns.e('search')"
        @change="debounceSearchChange"
      />
      <scroll-view scroll-y :class="ns.e('list')" @scrolltolower="onScrolltolower">
        <ListItem
          v-for="(item, index) in filterOptions"
          :key="index"
          :text="item[labelKey]"
          :selected="isSelected(item[valueKey])"
          :use-slot="!!$slots.default"
          :custom-class="itemClass"
          :custom-style="itemStyle"
          @click="onSelect(item[valueKey])"
        >
          <slot v-if="$slots.default" :item="item" />
        </ListItem>
        <view
          v-if="!filterOptions.length || !!pagination"
          :class="[ns.e('empty'), { 'height-full': !filterOptions.length }]"
          @tap="onScrolltolower"
        >
          <Loadmore :status="loadStatus" :config="{ nomore: isEmpty ? '无数据' : '没有更多了' }" />
        </view>
        <SafeBottom v-if="safeAreaInsetBottom && !multiple" />
      </scroll-view>
    </view>

    <template v-if="safeAreaInsetBottom && multiple" #footer>
      <view :class="ns.e('footer')">
        <ButtonComponent type="primary" block @click="onOk()">
          {{ confirmButtonText }}
        </ButtonComponent>
      </view>
      <SafeBottom />
    </template>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue'
import { useList, LoadStatusEnum } from '../../core/useList'
import useNamespace from '../../core/useNamespace'
import { useSelect } from '../../core/useSelect'
import { debounce } from '../../utils'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import ButtonComponent from '../button/button.vue'
import ListItem from '../list-item/list-item.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'
import type { Option, OptionValue } from './props'
import { pickerPopupEmits, pickerPopupProps } from './props'

const ns = useNamespace('picker-popup')

const props = defineProps(pickerPopupProps)
const emit = defineEmits(pickerPopupEmits)

const { show, data, modelValue, labelKey, valueKey, multiple, pagination } = toRefs(props)

const searchText = ref<string>('')

const {
  list: options,
  pageNumber,
  pageSize,
  loadStatus,
  isEmpty,
  getListData,
} = useList<Option>(typeof props.pagination === 'object' ? props.pagination : undefined)

const {
  selectedItems,
  selectedValues,
  isSelected,
  onSelect: _onSelect,
  onClear: _onClear,
} = useSelect<Option, OptionValue>({
  options,
  valueKey,
  defaultValue: modelValue,
  multiple,
})

const filterOptions = computed(() => {
  // 远程情况不作处理
  if (props.remote) return options.value
  // 本地数据情况，直接做过滤
  return options.value.filter(
    (item) => item[labelKey.value]?.indexOf(searchText.value.trim()) !== -1,
  )
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    if (props.initData) {
      onClean(false)
    }
    if (!options.value.length) {
      getData()
    }
  }
})

watch(
  data,
  (newVal) => {
    options.value = newVal
  },
  {
    immediate: true,
  },
)

watch(pagination, (newVal) => {
  if (typeof newVal === 'object') {
    pageNumber.value = newVal.pageNumber ?? pageNumber.value
    pageSize.value = newVal.pageSize ?? pageSize.value
  }
})

const getData = async (extra?: Record<string, unknown>) => {
  return getListData(async () => {
    let res = props.load?.(searchText.value, pageNumber.value, pageSize.value, extra)
    if (res instanceof Promise) {
      res = await res
    }
    return {
      list: res ?? [],
    }
  })
}

const onScrolltolower = () => {
  if (!props.pagination) return
  pageNumber.value += 1
  getData()
}

const onSearchChange = () => {
  if (props.remote) {
    pageNumber.value = 0
    getData()
  } else {
    // 本地搜索额外考虑无数据的情况
    if (!filterOptions.value.length) {
      loadStatus.value = LoadStatusEnum.NOMORE
    }
  }
}
const debounceSearchChange = debounce(onSearchChange, 300)

const onSelect = async (value: OptionValue) => {
  if (_onSelect(value) && !multiple.value) {
    onOk()
  }
}

const onOk = () => {
  emit('update:modelValue', selectedValues.value)
  emit('change', selectedItems.value)
  onClose()
  if (props.resetAfterConfirm) {
    onReset()
  }
}

const onClose = () => {
  emit('update:show', false)
  emit('close')
}

/** 清除搜索框 */
const onClearSearch = () => {
  searchText.value = ''
  onSearchChange()
}

const onReset = () => {
  _onClear()
  onClearSearch()
}

const onClean = (reset = true) => {
  pageNumber.value = 0
  options.value = []
  reset && onReset()
}

/** 刷新列表数据，会重新触发load方法 */
const onRefresh = () => {
  getData({ refresh: true })
}

/** 获取当前内部选项数据 */
const __getOptions = () => {
  return options.value
}

/** 更新当前内部选项数据 */
const __updateOptions = (iterator: (item: Option) => Option) => {
  options.value = options.value.map((option) => {
    return iterator(option)
  })
}

defineExpose({
  reset: onReset,
  clean: onClean,
  refresh: onRefresh,
  clearSearch: onClearSearch,
  getOptions: __getOptions,
  updateOptions: __updateOptions,
})
</script>

<style lang="scss" scoped>
@import './picker-popup.scss';
</style>
