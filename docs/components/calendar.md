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
| height | 高度 |  |  '80vh' |

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

