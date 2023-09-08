# Calendar

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell
        title="单个日期"
        :value="values[0]?.toString()"
        is-link
        @click="onShow({ type: 'single', current: 0 })"
      />
      <pa-cell
        title="多个日期"
        :value="values[1]?.toString()"
        is-link
        @click="onShow({ type: 'multiple', current: 1 })"
      />
      <pa-cell
        title="日期区间"
        :value="values[2]?.toString()"
        is-link
        @click="onShow({ type: 'range', current: 2 })"
      />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="快捷选择">
    <pa-cell-group inset>
      <pa-cell
        title="单个日期"
        :value="values[3]?.toString()"
        is-link
        @click="onShow({ type: 'single', current: 3, showConfirm: false })"
      />
      <pa-cell
        title="日期区间"
        :value="values[4]?.toString()"
        is-link
        @click="onShow({ type: 'range', current: 4, showConfirm: false })"
      />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="自定义日历">
    <pa-cell-group inset>
      <pa-cell
        title="自定义日期范围"
        :value="values[5]?.toString()"
        is-link
        @click="
          onShow({
            type: 'single',
            current: 5,
            minDate: dayjs().startOf('month').valueOf(),
            maxDate: dayjs().endOf('month').valueOf(),
          })
        "
      />
      <pa-cell
        title="自定义按钮文字"
        :value="values[6]?.toString()"
        is-link
        @click="
          onShow({
            type: 'range',
            current: 6,
            confirmText: '完成',
            confirmDisabledText: '请选择结束时间',
          })
        "
      />
      <pa-cell
        title="自定义日期文案"
        :value="values[7]?.toString()"
        is-link
        @click="
          onShow({
            type: 'single',
            current: 7,
            minDate: dayjs().month(9).startOf('month').valueOf(),
            maxDate: dayjs().month(9).endOf('month').valueOf(),
            formatter: (day) => {
              if (day.date.month() === 9) {
                if (day.date.date() === 1) {
                  day.topInfo = '国庆节'
                } else if (day.date.date() <= 7) {
                  day.topInfo = '休'
                }
              }
              return day
            },
          })
        "
      />
      <pa-cell
        title="日期区间最大范围"
        :value="values[8]?.toString()"
        is-link
        @click="onShow({ type: 'range', current: 8, maxRange: 3 })"
      />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="平铺展示" card>
    <pa-calendar :poppable="false" :default-date="state.defaultDate" />
  </DocDemoBlock>

  <pa-calendar
    v-model:show="visible"
    :type="state.type"
    :default-date="state.defaultDate"
    :min-date="state.minDate"
    :max-date="state.maxDate"
    :formatter="state.formatter"
    :show-confirm="state.showConfirm"
    :confirm-text="state.confirmText"
    :confirm-disabled-text="state.confirmDisabledText"
    :max-range="state.maxRange"
    @confirm="onConfirm"
  />
  <SafeBottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import type { CalendarProps } from './props'

type StateProps = Partial<CalendarProps> & { current?: number }

const visible = ref<boolean>(false)
const state = ref<StateProps>({
  type: 'single',
  defaultDate: Date.now(),
})
const values = ref<Array<string | string[]>>([])

const onShow = (data: StateProps = {}) => {
  state.value = {}
  for (const key in data) {
    state.value[key as keyof CalendarProps] = data[key as keyof CalendarProps] as any
  }
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  values.value[state.value.current ?? 0] = Array.isArray(value)
    ? value.map((item) => dayjs(item).format('YYYY-MM-DD'))
    : dayjs(value).format('YYYY-MM-DD')
}
</script>
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
| select | (value: CalendarValue)  |
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

