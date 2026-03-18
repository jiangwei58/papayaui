# DateRangePicker

<!--codes start-->

## 年月日区间

```html [template]

<view>
  <pa-date-range-picker
    v-model:start="start"
    v-model:end="end"
  />
  <view class="demo-result">
    <view>开始时间：{{ formatDate(start) }}</view>
    <view>结束时间：{{ formatDate(end) }}</view>
  </view>
</view>

```
```ts [script]

import dayjs from 'dayjs'
import { ref } from 'vue'

const start = ref<Date>(new Date())
const end = ref<Date>(dayjs().add(1, 'day').toDate())

const formatDate = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

```
## 年月日时分区间

```html [template]

<view>
  <pa-date-range-picker
    v-model:start="start"
    v-model:end="end"
    :columns-type="['year', 'month', 'day', 'hour', 'minute']"
  />
  <view class="demo-result">
    <view>开始时间：{{ formatDateTime(start) }}</view>
    <view>结束时间：{{ formatDateTime(end) }}</view>
  </view>
</view>

```
```ts [script]

import dayjs from 'dayjs'
import { ref } from 'vue'

const start = ref<Date>(new Date())
const end = ref<Date>(dayjs().add(1, 'hour').toDate())

const formatDateTime = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

```
## 带 label 的年月日区间

```html [template]

<view>
  <pa-date-range-picker
    v-model:start="start"
    v-model:end="end"
    start-label="出发日期"
    end-label="返回日期"
  />
  <view class="demo-result">
    <view>出发日期：{{ formatDate(start) }}</view>
    <view>返回日期：{{ formatDate(end) }}</view>
  </view>
</view>

```
```ts [script]

import dayjs from 'dayjs'
import { ref } from 'vue'

const start = ref<Date>(new Date())
const end = ref<Date>(dayjs().add(3, 'day').toDate())

const formatDate = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

```

<!--codes end-->

## DateRangePicker Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| start | 开始时间 | date | - |
| end | 结束时间 | date | - |
| columnsType | 选项类型 | DatePickerColumnType[] |  () => ['year', 'month', 'day'] |
| minDate | 可选的最小时间，精确到分 | date | - |
| maxDate | 可选的最大时间，精确到分 | date | - |
| title | 顶部栏标题 | string |  '选择时间区间' |
| showToolbar | 是否显示顶部栏 | boolean |  true |
| optionHeight | 选项高度 | number |  44 |
| visibleOptionNum | 可见选项个数 | number |  6 |
| formatter | 选项格式化函数 | DatePickerFormatter | - |
| filter | 选项过滤函数 | DatePickerFilter | - |
| allowReverse | 是否允许结束时间早于开始时间 | boolean |  false |
| startLabel | 开始时间标签 | string | - |
| endLabel | 结束时间标签 | string | - |
| confirmButtonText | 确认按钮文字 | string |  '确认' |
| cancelButtonText | 取消按钮文字 | string |  '取消' |

<!--props end-->

## DateRangePicker Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:start | (value: Date)  |
| update:end | (value: Date)  |
| change | (value: { start: Date; end: Date })  |
| confirm | (value: { start: Date; end: Date })  |
| cancel | ()  |

<!--event end-->

## DateRangePicker Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

