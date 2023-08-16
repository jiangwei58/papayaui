# DatePicker

## 示例

<!--codes start-->

::: code-group

```html [template]
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
```
```ts [script]
<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { DatePickerColumnType, DatePickerOption } from '../../core/useDatePicker'
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
```

<!--codes end-->

## DatePicker Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | date | - |
| columnsType | 选项类型，由选项组成数组，数据顺序代表排序顺序 | DatePickerColumnType[] | - |
| minDate | 可选的最小时间，精确到分 | date | - |
| maxDate | 可选的最大时间，精确到分 | date | - |
| title | 顶部栏标题 | string |  '' |
| showToolbar | 是否显示顶部栏 | boolean |  true |
| showColumnsHeader | 是否显示列标题栏 | boolean | - |
| columnsHeader | 列标题名称 | string[]\|((types:DatePickerColumnType[])=\>string[]) | - |
| confirmButtonText | 确认按钮文字 | string |  '确认' |
| cancelButtonText | 取消按钮文字 | string |  '取消' |
| optionHeight | 选项高度 | number |  44 |
| visibleOptionNum | 可见选项个数 | number |  6 |
| formatter | 选项格式化函数 | DatePickerFormatter | - |
| filter | 选项过滤函数 | DatePickerFilter | - |

<!--props end-->

## DatePicker Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: Date)  |
| change | (value: Date)  |
| confirm | (value: Date)  |
| cancel | ()  |

<!--event end-->

## DatePicker Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| columns-top | - |
| default | - |
| default | - |

<!--slot end-->

