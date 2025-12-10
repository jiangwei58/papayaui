<template>
  <BottomPopup
    :class="ns.b()"
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
    @confirm="onOk"
  >
    <view :class="ns.e('content')">
      <slot name="before" />
      <Search
        v-if="showSearch"
        v-model="searchText"
        v-bind="searchProps"
        :class="ns.e('search')"
        @change="debounceSearchChange"
      />
      <scroll-view scroll-y :class="ns.e('list')" @scrolltolower="onScrollNext">
        <ListItem
          v-for="(item, index) in filterOptions"
          :key="index"
          :text="item[labelKey]"
          :selected="isSelected(item[valueKey])"
          :use-slot="!!$slots.default"
          :custom-class="itemClass"
          :custom-style="itemStyle"
          @click="onSelect(item[valueKey], item)"
        >
          <slot v-if="$slots.default" :item="item" :isCreate="!!item.__isCreate" />
        </ListItem>
        <LoadMore
          v-if="!filterOptions.length || !!pagination"
          :status="loadStatus"
          :config="{ nomore: isEmpty ? emptyText : '没有更多了' }"
          :full-page="isEmpty"
          :show-text="!onlyOnePage"
          @next="onScrollNext"
        />
        <SafeBottom v-if="safeAreaInsetBottom && !showView.footer" />
      </scroll-view>
    </view>

    <template v-if="showView.footer" #footer>
      <view :class="[ns.e('footer'), ns.is('is-two-buttons', showView.create, showView.confirm)]">
        <ButtonComponent
          v-if="showView.create"
          :class="ns.e('create-button')"
          :type="showView.confirm ? 'default' : 'primary'"
          ellipsis
          block
          @click="onCreate"
        >
          创建 “{{ searchText }}”
        </ButtonComponent>
        <ButtonComponent
          v-if="showView.confirm"
          :class="ns.e('confirm-button')"
          type="primary"
          block
          @click="onOk()"
        >
          {{ confirmButtonText }}
        </ButtonComponent>
      </view>
      <SafeBottom v-if="safeAreaInsetBottom" />
    </template>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue'
import { useList, LoadStatusEnum } from '@papayaui/core'
import { useNamespace } from '@papayaui/core'
import { useSelect } from '@papayaui/core'
import { debounce } from '@papayaui/utils'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import ButtonComponent from '../button/button.vue'
import ListItem from '../list-item/list-item.vue'
import LoadMore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'
import type { Option, OptionValue } from './props'
import { pickerPopupEmits, pickerPopupProps } from './props'

const ns = useNamespace('picker-popup')

const props = defineProps(pickerPopupProps)
const emit = defineEmits(pickerPopupEmits)

const { show, data, modelValue, labelKey, valueKey, multiple, pagination } = toRefs(props)

const searchText = ref<string>('')
const createOptions = ref<Option[]>([])

const {
  list: options,
  pageNumber,
  pageSize,
  loadStatus,
  isEmpty,
  onlyOnePage,
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
  const fullOptions = createOptions.value.concat(options.value)
  const text = searchText.value.trim()
  // 远程情况不作处理
  if (props.remote) return text ? options.value : fullOptions
  // 本地数据情况，直接做过滤
  if (!text) return fullOptions
  return fullOptions.filter((item) => item[labelKey.value]?.indexOf(text) !== -1)
})

const showView = computed(() => {
  const create = props.allowCreate && !!searchText.value
  const confirm = props.multiple || props.showConfirm
  return {
    footer: create || confirm,
    create,
    confirm,
  }
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

const onScrollNext = () => {
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

const onCreate = async () => {
  let newOption: {
    [key: string]: unknown
    __isCreate?: boolean
  } = {
    [labelKey.value]: searchText.value,
    [valueKey.value]: searchText.value,
  }
  // 自定义创建时的数据，通常用于定义唯一标识
  if (typeof props.beforeCreate === 'function') {
    newOption = await props.beforeCreate(searchText.value)
  }
  newOption.__isCreate = true
  createOptions.value.unshift(newOption)
  onSelect(searchText.value, newOption)
  emit('create', searchText.value)
  onClearSearch()
}

const onSelect = async (value: OptionValue, item: Option) => {
  emit('select', value, item)

  // 多选或者开启确认按钮时，只设置选中数据
  if (showView.value.confirm) {
    _onSelect(value)
    return
  }
  // 单选时，选中已选中的节点时直接关闭弹窗
  if (isSelected(value)) {
    onClose()
    return
  }
  // 单选时，节点选择成功时修改数据并关闭弹窗
  if (_onSelect(value)) {
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

<style lang="scss">
@import './picker-popup.scss';
</style>
