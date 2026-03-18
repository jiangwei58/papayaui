<template>
  <view :class="[ns.b(), ns.is('readonly', readonly), ns.is('disabled', disabled)]">
    <view :class="ns.b('inputs')">
      <view :class="ns.b('input')" @click="openStart">
        <view v-if="startLabel" :class="ns.b('label')">
          {{ startLabel }}
        </view>
        <view :class="[ns.b('value'), ns.is('placeholder', !startText)]">
          {{ startText || startPlaceholder }}
        </view>
      </view>
      <view :class="ns.b('separator')">-</view>
      <view :class="ns.b('input')" @click="openEnd">
        <view v-if="endLabel" :class="ns.b('label')">
          {{ endLabel }}
        </view>
        <view :class="[ns.b('value'), ns.is('placeholder', !endText)]">
          {{ endText || endPlaceholder }}
        </view>
      </view>
      <pa-icon
        v-if="showClear"
        name="round-close-fill"
        :class="ns.b('clear')"
        @tap.stop="onClear"
      />
    </view>

    <!-- 开始时间选择 -->
    <pa-bottom-popup v-model:show="showStartPopup" :title="title" height="auto">
      <pa-date-picker
        v-model="innerStart"
        :columns-type="columnsType"
        :show-toolbar="showToolbar"
        :show-columns-header="true"
        :min-date="minDate"
        :max-date="maxDate"
        :option-height="optionHeight"
        :visible-option-num="visibleOptionNum"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        :formatter="formatter"
        :filter="filter"
        @change="onStartChange"
        @confirm="onStartConfirm"
        @cancel="onStartCancel"
      />
    </pa-bottom-popup>

    <!-- 结束时间选择 -->
    <pa-bottom-popup v-model:show="showEndPopup" :title="title" height="auto">
      <pa-date-picker
        v-model="innerEnd"
        :columns-type="columnsType"
        :show-toolbar="showToolbar"
        :show-columns-header="true"
        :min-date="endMinDate"
        :max-date="maxDate"
        :option-height="optionHeight"
        :visible-option-num="visibleOptionNum"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        :formatter="formatter"
        :filter="filter"
        @change="onEndChange"
        @confirm="onEndConfirm"
        @cancel="onEndCancel"
      />
    </pa-bottom-popup>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, ref, toRefs, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import { dateRangePickerEmits, dateRangePickerProps } from './props'

const ns = useNamespace('date-range-picker')

const props = defineProps(dateRangePickerProps)
const emit = defineEmits(dateRangePickerEmits)

const { columnsType, minDate, maxDate, formatter, filter } = toRefs(props)

const showStartPopup = ref(false)
const showEndPopup = ref(false)

const innerStart = ref<Date | undefined>(props.start)
const innerEnd = ref<Date | undefined>(props.end)

/** 是否允许打开弹窗 */
const canOpenPopup = computed(() => !props.disabled && !props.readonly)

/** 是否显示清空按钮 */
const showClear = computed(() => {
  return !props.disabled && !props.readonly && props.clearable && (!!props.start || !!props.end)
})

watch(
  () => props.start,
  (val) => {
    innerStart.value = val
  },
)

watch(
  () => props.end,
  (val) => {
    innerEnd.value = val
  },
)

const endMinDate = computed(() => {
  const base = minDate?.value || innerStart.value || props.start
  if (!base) return undefined
  if (props.allowReverse) {
    return base
  }
  const startTime = dayjs(innerStart.value || base)
  const minTime = dayjs(minDate?.value || base)
  return startTime.isAfter(minTime) ? startTime.toDate() : minTime.toDate()
})

const getFormatByColumnsType = () => {
  if (!columnsType.value || !columnsType.value.length) {
    return 'YYYY-MM-DD HH:mm'
  }
  const dateParts: string[] = []
  const timeParts: string[] = []

  columnsType.value.forEach((type) => {
    if (type === 'year') dateParts.push('YYYY')
    if (type === 'month') dateParts.push('MM')
    if (type === 'day') dateParts.push('DD')
    if (type === 'hour') timeParts.push('HH')
    if (type === 'minute') timeParts.push('mm')
  })

  let format = ''
  if (dateParts.length) {
    format += dateParts.join('-')
  }
  if (timeParts.length) {
    format += format ? ' ' : ''
    format += timeParts.join(':')
  }

  return format || 'YYYY-MM-DD HH:mm'
}

const startText = computed(() =>
  props.start ? dayjs(props.start).format(getFormatByColumnsType()) : '',
)
const endText = computed(() =>
  props.end ? dayjs(props.end).format(getFormatByColumnsType()) : '',
)

/** 触发区间变更事件 */
const emitRangeChange = (start?: Date, end?: Date) => {
  if (start && end) {
    emit('change', { start, end })
  }
}

/** 触发区间确认事件 */
const emitRangeConfirm = (start?: Date, end?: Date) => {
  if (start && end) {
    emit('confirm', { start, end })
  }
}

const openStart = () => {
  if (!canOpenPopup.value) return
  // 没有已选值时，用 defaultStartDate 或当前时间作为选择器初始时间
  if (!innerStart.value) {
    innerStart.value = props.defaultStartDate || new Date()
  }
  showStartPopup.value = true
}

const openEnd = () => {
  if (!canOpenPopup.value) return
  // 没有已选值时，用 defaultEndDate 或当前时间作为选择器初始时间
  if (!innerEnd.value) {
    innerEnd.value = props.defaultEndDate || new Date()
  }
  showEndPopup.value = true
}

/** 清空当前区间值 */
const onClear = () => {
  showStartPopup.value = false
  showEndPopup.value = false
  emit('update:start', undefined)
  emit('update:end', undefined)
  emit('clear')
}

/** 处理开始时间变更 */
const onStartChange = (val: Date) => {
  if (!props.showToolbar) {
    onStartConfirm(val)
  }
}

const onStartConfirm = (val: Date) => {
  const finalStart = val
  const finalEnd =
    !props.allowReverse && props.end && dayjs(val).isAfter(props.end) ? val : props.end

  emit('update:start', val)
  showStartPopup.value = false
  if (finalEnd !== props.end) {
    emit('update:end', finalEnd)
  }
  emitRangeChange(finalStart, finalEnd)
  emitRangeConfirm(finalStart, finalEnd)
}

const onStartCancel = () => {
  // 取消时恢复内部值，防止临时默认值影响下次打开
  innerStart.value = props.start
  showStartPopup.value = false
  emit('cancel')
}

const onEndConfirm = (val: Date) => {
  let finalEnd = val
  if (!props.allowReverse && props.start && dayjs(val).isBefore(props.start)) {
    finalEnd = props.start
  }
  const finalStart = props.start
  emit('update:end', finalEnd)
  showEndPopup.value = false
  emitRangeChange(finalStart, finalEnd)
  emitRangeConfirm(finalStart, finalEnd)
}

/** 处理结束时间变更 */
const onEndChange = (val: Date) => {
  if (!props.showToolbar) {
    onEndConfirm(val)
  }
}

const onEndCancel = () => {
  // 取消时恢复内部值，防止临时默认值影响下次打开
  innerEnd.value = props.end
  showEndPopup.value = false
  emit('cancel')
}
</script>

<style lang="scss">
@import './date-range-picker.scss';
</style>
