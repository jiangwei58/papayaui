<template>
  <BottomPopup
    :class="ns.b()"
    :show="show"
    :title="title"
    :height="height"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', $event as boolean)"
    @close="onClose"
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
import useList, { LoadStatusEnum, UseListProps } from '../../core/useList'
import useNamespace from '../../core/useNamespace'
import useSelect from '../../core/useSelect'
import { debounce } from '../../utils/common'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import ButtonComponent from '../button/button.vue'
import ListItem from '../list-item/list-item.vue'
import Loadmore from '../loadmore/loadmore.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import Search from '../search/search.vue'

export type Option = any
export type OptionValue = number | string

export interface PickerPopupProps {
  modelValue?: OptionValue | OptionValue[]
  /** 显示状态 */
  show?: boolean
  /** 高度 */
  height?: string
  /** 标题 */
  title?: string
  /** 选项数据 */
  data?: Option[]
  /** 数据标题的字段名 */
  labelKey?: string
  /** 数据值的字段名 */
  valueKey?: string
  /** 是否显示搜索 */
  showSearch?: boolean
  /** 是否多选 */
  multiple?: boolean
  /** 动态获取下一级节点数据 */
  load?: (
    query?: string,
    pageNumber?: number,
    pageSize?: number,
    extra?: Record<string, unknown>,
  ) => Option[] | Promise<Option[]>
  /** 是否远程搜索 */
  remote?: boolean
  /** 是否支持分页 */
  pagination?: boolean | UseListProps<Option>
  /** 是否留出底部安全距离 */
  safeAreaInsetBottom?: boolean
  /** 每次打开重新加载数据 */
  initData?: boolean
  /** 确认按钮的文案 */
  confirmButtonText?: string
  /** 确定后是否重置数据 */
  resetAfterConfirm?: boolean
}

const ns = useNamespace('picker-popup')

const props = withDefaults(defineProps<PickerPopupProps>(), {
  modelValue: undefined,
  show: false,
  height: undefined,
  title: '',
  data: () => [],
  labelKey: 'label',
  valueKey: 'value',
  multiple: false,
  load: undefined,
  remote: false,
  pagination: false,
  safeAreaInsetBottom: true,
  confirmButtonText: '确定',
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:modelValue', value: OptionValue | OptionValue[]): void
  (event: 'change', item: Option | Option[]): void
  (event: 'close'): void
}>()

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
  return options.value.filter((item) => item[labelKey.value]?.indexOf(searchText.value) !== -1)
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

const onReset = () => {
  _onClear()
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
  getOptions: __getOptions,
  updateOptions: __updateOptions,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-picker-popup {
  &-content {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__search {
    flex-shrink: 0;
  }

  &__list {
    flex: 1;
    overflow: hidden;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__footer {
    flex-shrink: 0;
    padding: 8px 13px;
  }
}
</style>
