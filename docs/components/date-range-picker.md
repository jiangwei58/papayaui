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

const start = ref<Date | undefined>(undefined)
const end = ref<Date | undefined>(undefined)

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
## 禁用、只读与可清空

```html [template]

<view class="demo-state">
  <view class="demo-state__section">
    <view class="demo-state__title">可清空</view>
    <pa-date-range-picker
      v-model:start="clearableStart"
      v-model:end="clearableEnd"
      clearable
      @clear="onClear"
    />
    <view class="demo-result">
      <view>开始时间：{{ formatDate(clearableStart) }}</view>
      <view>结束时间：{{ formatDate(clearableEnd) }}</view>
      <view>清空次数：{{ clearCount }}</view>
    </view>
  </view>

  <view class="demo-state__section">
    <view class="demo-state__title">只读</view>
    <pa-date-range-picker
      v-model:start="readonlyStart"
      v-model:end="readonlyEnd"
      readonly
    />
    <view class="demo-result">
      <view>开始时间：{{ formatDate(readonlyStart) }}</view>
      <view>结束时间：{{ formatDate(readonlyEnd) }}</view>
    </view>
  </view>

  <view class="demo-state__section">
    <view class="demo-state__title">禁用</view>
    <pa-date-range-picker
      v-model:start="disabledStart"
      v-model:end="disabledEnd"
      disabled
    />
    <view class="demo-result">
      <view>开始时间：{{ formatDate(disabledStart) }}</view>
      <view>结束时间：{{ formatDate(disabledEnd) }}</view>
    </view>
  </view>
</view>

```
```ts [script]

import dayjs from 'dayjs'
import { ref } from 'vue'

const clearableStart = ref<Date>(new Date())
const clearableEnd = ref<Date>(dayjs().add(7, 'day').toDate())
const readonlyStart = ref<Date>(new Date())
const readonlyEnd = ref<Date>(dayjs().add(2, 'day').toDate())
const disabledStart = ref<Date>(new Date())
const disabledEnd = ref<Date>(dayjs().add(5, 'day').toDate())
const clearCount = ref(0)

/** 格式化日期展示 */
const formatDate = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

/** 处理清空事件 */
const onClear = () => {
  clearCount.value += 1
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
| disabled | 是否禁用 | boolean | - |
| readonly | 是否只读 | boolean | - |
| clearable | 是否显示清空控件 | boolean | - |
| startLabel | 开始时间标签 | string | - |
| endLabel | 结束时间标签 | string | - |
| startPlaceholder | 开始时间占位文字 | string |  '开始时间' |
| endPlaceholder | 结束时间占位文字 | string |  '结束时间' |
| confirmButtonText | 确认按钮文字 | string |  '确认' |
| cancelButtonText | 取消按钮文字 | string |  '取消' |

<!--props end-->

## DateRangePicker Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:start | (value?: Date)  |
| update:end | (value?: Date)  |
| change | (value: { start: Date; end: Date })  |
| confirm | (value: { start: Date; end: Date })  |
| cancel | ()  |
| clear | ()  |

<!--event end-->

## DateRangePicker Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-date-range-picker-background | #fff |
| --pa-date-range-picker-border-color | var(--pa-color-border) |
| --pa-date-range-picker-border-radius | 12rpx |
| --pa-date-range-picker-clear-color | var(--pa-color-disabled) |
| --pa-date-range-picker-disabled-background | var(--pa-color-background-disabled, #f7f8fa) |
| --pa-date-range-picker-disabled-color | var(--pa-color-disabled) |
| --pa-date-range-picker-label-color | var(--pa-color-black) |
| --pa-date-range-picker-padding-x | 20rpx |
| --pa-date-range-picker-padding-y | 16rpx |
| --pa-date-range-picker-placeholder-color | var(--pa-color-disabled) |
| --pa-date-range-picker-readonly-background | #fff |
| --pa-date-range-picker-readonly-color | var(--pa-color-text-secondary) |
| --pa-date-range-picker-separator-color | var(--pa-color-text-secondary) |
| --pa-date-range-picker-separator-margin | 12rpx |
| --pa-date-range-picker-value-color | var(--pa-color-text) |
| --pa-date-range-picker-clear-font-size | 32rpx |
| --pa-date-range-picker-clear-padding-right | 20rpx |
| --pa-date-range-picker-disabled-border-color | var(--pa-color-border) |
| --pa-date-range-picker-label-font-size | 24rpx |
| --pa-date-range-picker-label-margin-bottom | 8rpx |
| --pa-date-range-picker-value-font-size | 26rpx |

<!--cssVar end-->

