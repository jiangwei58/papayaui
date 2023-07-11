<template>
  <DocDemoBlock title="选择年月日" card>
    <pa-date-picker v-model="dateValue" title="选择年月日" @confirm="onConfirm" />
  </DocDemoBlock>

  <DocDemoBlock title="配合Popup使用" card>
    <pa-cell title="选择年月日" :value="dateText" clickable @click="datePickerShow = true" />
    <pa-popup v-model:show="datePickerShow" position="bottom">
      <pa-date-picker title="选择年月日" @confirm="onConfirm" />
    </pa-popup>
  </DocDemoBlock>

  <DocDemoBlock title="选择年月" card>
    <pa-date-picker title="选择年月" :columns-type="['year', 'month']" :formatter="formatter" />
  </DocDemoBlock>

  <DocDemoBlock title="选择月日" card>
    <pa-date-picker title="选择月日" :columns-type="['month', 'day']" :formatter="formatter" />
  </DocDemoBlock>

  <DocDemoBlock title="选择时间" card>
    <pa-date-picker title="选择时间" :columns-type="['hour', 'minute']" />
  </DocDemoBlock>

  <DocDemoBlock title="选择完整时间" card>
    <pa-date-picker
      title="选择完整时间"
      :columns-type="['year', 'month', 'day', 'hour', 'minute']"
    />
  </DocDemoBlock>

  <DocDemoBlock title="选择年月日小时" card>
    <pa-date-picker title="选择年月日小时" :columns-type="['year', 'month', 'day', 'hour']" />
  </DocDemoBlock>

  <DocDemoBlock title="显示列标题" card>
    <pa-date-picker
      v-model="dateValue"
      title="选择年月日"
      show-columns-header
      @confirm="onConfirm"
    />
  </DocDemoBlock>

  <DocDemoBlock title="选项过滤器" card>
    <pa-date-picker title="选项过滤器" :columns-type="['hour', 'minute']" :filter="filter" />
  </DocDemoBlock>

  <DocDemoBlock title="选择顺序控制" card>
    <pa-date-picker
      title="选择顺序控制"
      :columns-type="['day', 'month', 'year']"
      :min-date="dayjs().subtract(10, 'year').toDate()"
      :max-date="dayjs().add(10, 'year').toDate()"
    />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { DatePickerColumnType, DatePickerOption } from '../../core/useDatePicker'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const dateValue = ref<Date>(new Date())
const datePickerShow = ref<boolean>(false)
const dateText = ref<string>('')

const formatter = (type: DatePickerColumnType, value: string) => {
  if (type === 'year') {
    return `${value}年`
  } else if (type === 'month') {
    return `${value}月`
  } else if (type === 'day') {
    return `${value}日`
  }
  return value
}

const filter = (type: DatePickerColumnType, options: DatePickerOption[]) => {
  if (type === 'minute') {
    return options.filter((option) => option.value % 5 === 0)
  }
  return options
}

const onConfirm = (date: Date) => {
  const newVal = dayjs(date)
  dateText.value = newVal.format('YYYY-MM-DD')
  datePickerShow.value = false
  uni.showToast({
    icon: 'none',
    title: `当前选中的值是：${newVal.format('YYYY-MM-DD HH:mm:ss')}`,
  })
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
