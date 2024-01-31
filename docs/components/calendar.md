# Calendar

<!--codes start-->

## 单个日期

```html [template]

<pa-cell title="单个日期" :value="dateStr" is-link @click="onShow()" />

<pa-calendar v-model:show="visible" type="single" @confirm="onConfirm" />

```
```ts [script]

import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = dayjs(value as Date).format('YYYY-MM-DD')
}

```
## 多个日期

```html [template]

<pa-cell title="多个日期" :value="dateStr" is-link @click="onShow()" />

<pa-calendar v-model:show="visible" type="multiple" @confirm="onConfirm" />

```
```ts [script]

/**
 * @description 设置type为multiple后可以选择多个日期，此时confirm事件返回的 date 为数组结构，数组包含若干个选中的日期。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((date) => dayjs(date).format('YYYY-MM-DD')).toString()
}

```
## 日期区间

```html [template]

<pa-cell title="日期区间" :value="dateStr" is-link @click="onShow()" />

<pa-calendar v-model:show="visible" type="range" @confirm="onConfirm" />

```
```ts [script]

/**
 * @description 设置type为range后可以选择日期区间，此时confirm事件返回的 date 为数组结构，数组第一项为开始时间，第二项为结束时间。
 * @tips 默认情况下，日期区间的起止时间不能为同一天，可以通过设置 allow-same-day 属性来允许选择同一天。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((date) => dayjs(date).format('YYYY-MM-DD')).join('~')
}

```
## 快捷选择

```html [template]

<pa-cell-group inset>
  <pa-cell title="单个日期" :value="dateString(0)" is-link @click="onShow('single', 0)" />
  <pa-cell title="日期区间" :value="dateString(1)" is-link @click="onShow('range', 1)" />
</pa-cell-group>

<pa-calendar
  v-model:show="visible"
  :type="type"
  :default-date="values[current]"
  :show-confirm="false"
  @confirm="onConfirm"
/>

```
```ts [script]

/**
 * @description 将show-confirm设置为false可以隐藏确认按钮，这种情况下选择完成后会立即触发confirm事件。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { CalendarType } from '../../components/calendar'

const visible = ref<boolean>(false)
const type = ref<CalendarType>('single')

const current = ref(0)
const values = ref<Array<number | number[]>>([])

const dateString = (index: number) => {
  const value = values.value[index]
  if (!value) return ''
  return Array.isArray(value)
    ? value.map((item) => dayjs(item).format('YYYY-MM-DD')).toString()
    : dayjs(value).format('YYYY-MM-DD')
}

const onShow = (newType: CalendarType, index: number) => {
  type.value = newType
  current.value = index
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  values.value[current.value] = Array.isArray(value)
    ? value.map((item) => item.getTime())
    : value.getTime()
}

```
## 自定义日期范围

```html [template]

<pa-cell title="自定义日期范围" :value="dateStr" is-link @click="onShow()" />

<pa-calendar
  v-model:show="visible"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="onConfirm"
/>

```
```ts [script]

/**
 * @description 通过 min-date 和 max-date 定义日历的范围
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const minDate = dayjs().startOf('month').valueOf()
const maxDate = dayjs().endOf('month').valueOf()
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = dayjs(value as Date).format('YYYY-MM-DD')
}

```
## 自定义按钮文字

```html [template]

<pa-cell title="自定义按钮文字" :value="dateStr" is-link @click="onShow()" />

<pa-calendar
  v-model:show="visible"
  type="range"
  confirm-text="完成"
  confirm-disabled-text="请选择结束时间"
  @confirm="onConfirm"
/>

```
```ts [script]

/**
 * @description 通过confirm-text设置按钮文字，通过confirm-disabled-text设置按钮禁用时的文字。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((item) => dayjs(item).format('YYYY-MM-DD')).join('~')
}

```
## 自定义日期文案

```html [template]

<pa-cell title="自定义日期文案" :value="dateStr" is-link @click="onShow()" />

<pa-calendar
  v-model:show="visible"
  type="range"
  :min-date="minDate"
  :max-date="maxDate"
  :formatter="formatter"
  @confirm="onConfirm"
/>

```
```ts [script]

/**
 * @description 通过传入formatter函数来对日历上每一格的内容进行格式化
 */
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { DayItem } from '../../core'

const visible = ref<boolean>(false)
const minDate = dayjs('2023-6-1').valueOf()
const maxDate = dayjs('2023-6-30').valueOf()
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const formatter = (dayItem: DayItem) => {
  const month = dayItem.date.month() + 1
  const date = dayItem.date.date()

  if (month === 6) {
    if (date === 6) {
      dayItem.text = '今天'
    } else if (date === 22) {
      dayItem.topInfo = '端午节'
    } else if (date > 22 && date < 25) {
      dayItem.topInfo = '休'
    } else if (date === 25) {
      dayItem.topInfo = '补班'
    }
  }

  if (dayItem.type === 'start') {
    dayItem.bottomInfo = '入住'
  } else if (dayItem.type === 'end') {
    dayItem.bottomInfo = '离店'
  }

  return dayItem
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((item) => dayjs(item).format('YYYY-MM-DD')).join('~')
}

```
## 日期区间最大范围

```html [template]

<pa-cell title="日期区间最大范围" :value="dateStr" is-link @click="onShow()" />

<pa-calendar v-model:show="visible" type="range" :max-range="3" @confirm="onConfirm" />

```
```ts [script]

/**
 * @description 选择日期区间时，可以通过max-range属性来指定最多可选天数
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((item) => dayjs(item).format('YYYY-MM-DD')).join('~')
}

```
## 平铺展示

```html [template]

<pa-calendar :poppable="false" />

```
```ts [script]

/**
 * @description 将poppable设置为false，日历会直接展示在页面内，而不是以弹层的形式出现
 */

```

<!--codes end-->

## Calendar Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| poppable | 是否以弹层的形式展示日历 | boolean |  true |
| height | 高度 | string \| number |  '80vh' |
| show | 是否显示弹层 | boolean |  false |
| closeOnClickOverlay | 点击遮罩是否关闭弹窗 | boolean |  true |
| type | 选择类型 | 'single'\|'multiple'\|'range' |  'single' |
| title | 标题 | string |  '日期选择' |
| minDate | 可选择的最小日期 | number |  Date.now() |
| maxDate | 可选择的最大日期 | number |  Date.now() + 1000 * 60 * 60 * 24 * 180 |
| defaultDate | 默认选中的日期，type 为 multiple 或 range 时为数组 | number\|number[] |  Date.now() |
| formatter | 日期格式化函数 | (day:DayItem)=\>DayItem | - |
| showMark | 是否显示月份背景水印 | boolean |  true |
| showTitle | 是否展示日历标题 | boolean |  true |
| showSubtitle | 是否展示日历副标题（年月） | boolean |  true |
| showConfirm | 是否展示确认按钮 | boolean |  true |
| confirmText | 确认按钮的文字 | string |  '确定' |
| confirmDisabledText | 确认按钮处于禁用状态时的文字 | string |  '确定' |
| firstDayOfWeek | 设置周起始日, 0代表周日开始 | FirstDayOfWeekType |  0 |
| allowSameDay | 是否允许日期范围的起止时间为同一天 | boolean | - |
| maxRange | 日期区间最多可选天数，默认无限制 | number | 无限制 |
| showResultText | 是否显示选择结果文字<br />底部显示当前选中的日期，多选','分隔，范围'~'分隔 | boolean | - |
| readonly | 是否为只读状态，只读状态下不能选择日期 | boolean | - |
| round | 是否圆角 | string \| number |  true |
| safeAreaInsetBottom | 是否适配底部安全区 | boolean | - |

<!--props end-->

## Calendar Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| confirm | (value: CalendarValue)  |
| select | (value: Date)  |
| update:show | (value: PopupProps['show'])  |
| open | ()  |
| opened | ()  |
| close | ()  |
| closed | ()  |
| clickOverlay | ()  |

<!--event end-->

## Calendar Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-calendar-color | var(--pa-color-primary) |

<!--cssVar end-->

