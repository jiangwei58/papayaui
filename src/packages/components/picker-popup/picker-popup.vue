<template>
  <BottomPopup
    :model-value="show"
    :title="title"
    :height="height"
    :safe-area-inset-bottom="false"
    @update:model-value="emit('update:show', $event as boolean)"
    @close="onClose"
    @confirm="onOk"
  >
    <view class="content flex flex-col">
      <Search
        v-if="showSearch"
        :model-value="searchText"
        class="flex-shrink-0"
        @update:model-value="onChangeSearch"
      />
      <scroll-view
        scroll-y
        class="flex-1"
        style="overflow: hidden"
        @scrolltolower="onScrolltolower"
      >
        <view
          v-for="(item, index) in filterOptions"
          :key="index"
          class="list-item flex items-center justify-between px-32 py-20 text-28 leading-40"
          :class="{ 'color-primary': selectedSet.has(item[valueKey]) }"
          hover-class="bg-hover"
          @tap="onSelect(item[valueKey])"
        >
          <slot v-if="$slots.default" :item="item" />
          <text v-else>{{ item[labelKey] }}</text>
          <Icon
            v-if="selectedSet.has(item[valueKey])"
            name="success"
            :color="`var(--${PREFIX}-color-primary)`"
            block
          />
        </view>
        <view
          v-if="!filterOptions.length || !!pagination"
          class="flex flex-col justify-center"
          :class="{ 'height-full': !filterOptions.length }"
        >
          <loadmore :status="loadStatus" :config="{ nomore: '无数据' }" />
        </view>
        <SafeBottom v-if="safeAreaInsetBottom && !multiple" />
      </scroll-view>
    </view>

    <template v-if="safeAreaInsetBottom && multiple" #footer>
      <view class="px-26 pt-15 flex-shrink-0">
        <ButtonComponent type="primary" @click="onOk()">确定</ButtonComponent>
      </view>
      <SafeBottom />
    </template>
  </BottomPopup>
</template>

<script lang="ts" setup>
import { watch, toRefs, ref, computed } from 'vue'
import BottomPopup from '../bottom-popup/bottom-popup.vue'
import Icon from '../icon/icon.vue'
import Search from '../search/search.vue'
import { PREFIX } from '../../utils/style'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import ButtonComponent from '../button/button.vue'
import Loadmore from '../loadmore/loadmore.vue'
import useList, { UseListData } from '../../hooks/useList'

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
  load?: (query?: string, pageNumber?: number, pageSize?: number) => Option[] | Promise<Option[]>
  /** 是否远程搜索 */
  remote?: boolean
  /** 是否支持分页 */
  pagination?: boolean | Partial<Pick<UseListData<Option>, 'pageNumber' | 'pageSize'>>
  /** 是否留出底部安全距离 */
  safeAreaInsetBottom?: boolean
}

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
})

const emit = defineEmits<{
  (event: 'update:show', show: boolean): void
  (event: 'update:modelValue', value: OptionValue | OptionValue[]): void
  (event: 'change', item: Option | Option[]): void
}>()

const { show, data } = toRefs(props)

const searchText = ref<string>('')
const selectedSet = ref<Set<OptionValue>>(new Set())
const loading = ref<boolean>(false)

const {
  list: options,
  pageNumber,
  pageSize,
  loadStatus,
  getListData,
} = useList<Option>(typeof props.pagination === 'object' ? props.pagination : undefined)

const filterOptions = computed(() => {
  if (props.remote) return options.value
  return options.value.filter((item) => item[props.labelKey].indexOf(searchText.value) !== -1)
})

watch(show, async (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
    if (!options.value.length) {
      getData()
    }
    init()
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

const init = () => {
  const defaultValues = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
  defaultValues.forEach((value) => {
    if (typeof value !== 'undefined') {
      selectedSet.value.add(value)
    }
  })
}

const getData = async () => {
  loading.value = true
  return getListData(async () => {
    let res = props.load?.(searchText.value, pageNumber.value, pageSize.value)
    if (res instanceof Promise) {
      res = await res
    }
    loading.value = false
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

const onChangeSearch = (text: string) => {
  searchText.value = text
  if (props.remote) {
    pageNumber.value = 0
    getData()
  }
}

const onSelect = async (value: OptionValue) => {
  if (selectedSet.value.has(value)) {
    selectedSet.value.delete(value)
  } else {
    if (!props.multiple) {
      selectedSet.value.clear()
    }
    selectedSet.value.add(value)
  }
  if (!props.multiple) {
    onOk()
  }
}

const onOk = () => {
  const selectedNodes = options.value.filter((item) => selectedSet.value.has(item[props.valueKey]))
  emit('update:modelValue', props.multiple ? [...selectedSet.value] : [...selectedSet.value][0])
  emit('change', props.multiple ? selectedNodes : selectedNodes[0])
  onClose()
}

const onClose = () => {
  selectedSet.value.clear()
  emit('update:show', false)
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  height: 100%;
}
</style>
