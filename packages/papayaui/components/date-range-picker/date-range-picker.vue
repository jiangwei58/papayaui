<template>
  <view :class="ns.b()">
    <view :class="ns.b('inputs')">
      <view :class="ns.b('input')" @click="openStart">
        <view v-if="startLabel" :class="ns.b('label')">
          {{ startLabel }}
        </view>
        <view :class="ns.b('value')">
          {{ startText || placeholderStart }}
        </view>
      </view>
      <view :class="ns.b('separator')">-</view>
      <view :class="ns.b('input')" @click="openEnd">
        <view v-if="endLabel" :class="ns.b('label')">
          {{ endLabel }}
        </view>
        <view :class="ns.b('value')">
          {{ endText || placeholderEnd }}
        </view>
      </view>
    </view>

    <!-- 开始时间选择 -->
    <pa-bottom-popup v-model:show="showStartPopup" :title="title" height="auto">
      <pa-date-picker
        v-model="innerStart"
        :columns-type="columnsType"
        :show-columns-header="true"
        :min-date="minDate"
        :max-date="maxDate"
        :option-height="optionHeight"
        :visible-option-num="visibleOptionNum"
        :formatter="formatter"
        :filter="filter"
        @confirm="onStartConfirm"
        @cancel="onStartCancel"
      />
    </pa-bottom-popup>

    <!-- 结束时间选择 -->
    <pa-bottom-popup v-model:show="showEndPopup" :title="title" height="auto">
      <pa-date-picker
        v-model="innerEnd"
        :columns-type="columnsType"
        :show-columns-header="true"
        :min-date="endMinDate"
        :max-date="maxDate"
        :option-height="optionHeight"
        :visible-option-num="visibleOptionNum"
        :formatter="formatter"
        :filter="filter"
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

const placeholderStart = computed(() => props.startLabel ?? '')
const placeholderEnd = computed(() => props.endLabel ?? '')

const openStart = () => {
  showStartPopup.value = true
}

const openEnd = () => {
  showEndPopup.value = true
}

const emitRangeChange = () => {
  if (props.start && props.end) {
    emit('change', {
      start: props.start,
      end: props.end,
    })
  }
}

const onStartConfirm = (val: Date) => {
  emit('update:start', val)
  showStartPopup.value = false
  if (!props.allowReverse && props.end && dayjs(val).isAfter(props.end)) {
    emit('update:end', val)
  }
  emitRangeChange()
}

const onStartCancel = () => {
  showStartPopup.value = false
  emit('cancel')
}

const onEndConfirm = (val: Date) => {
  let finalEnd = val
  if (!props.allowReverse && props.start && dayjs(val).isBefore(props.start)) {
    finalEnd = props.start
  }
  emit('update:end', finalEnd)
  showEndPopup.value = false
  emitRangeChange()
}

const onEndCancel = () => {
  showEndPopup.value = false
  emit('cancel')
}
</script>

<style lang="scss">
@import './date-range-picker.scss';
</style>
