# Checkbox

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-checkbox v-model="checkValue">复选框</pa-checkbox>
    <view class="text-28 text-black-3 mt-30">
      <text>当前选中值</text>
      <text class="ml-10">{{ JSON.stringify(checkValue) }}</text>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="半选状态" card>
    <pa-checkbox v-model="checkValue2" indeterminate>复选框</pa-checkbox>
  </DocDemoBlock>
  <DocDemoBlock title="基础用法group" card>
    <pa-checkbox-group v-model="checkValue3">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <pa-checkbox-group v-model="checkValue3" class="block mt-50">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" label-position="left">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <view class="text-28 text-black-3 mt-30">
      <text>当前选中值</text>
      <text class="ml-10">{{ JSON.stringify(checkValue3) }}</text>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="水平方向" card>
    <pa-checkbox-group v-model="checkValue4" direction="horizontal">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <pa-checkbox-group v-model="checkValue4" direction="horizontal" class="block mt-50">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" label-position="left">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <DocDemoBlock title="形状" card>
    <pa-checkbox-group v-model="checkValue5">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" shape="square">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <DocDemoBlock title="禁用" card>
    <pa-checkbox-group v-model="checkValue6">
      <pa-checkbox
        v-for="item in options"
        :key="item.name"
        :name="item.name"
        :disabled="item.name === 1"
      >
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <pa-checkbox-group v-model="checkValue6" disabled class="block mt-50">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <DocDemoBlock title="限制最大可选数（2个）" card>
    <pa-checkbox-group v-model="checkValue7" :max="2">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const checkValue = ref<boolean>(true)
const checkValue2 = ref<boolean>(false)
const checkValue3 = ref<number[]>([0])
const checkValue4 = ref<number[]>([0])
const checkValue5 = ref<number[]>([0])
const checkValue6 = ref<number[]>([0])
const checkValue7 = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 是否选中 | boolean | - |
| name | 标识符 | CheckboxValue |  '' |
| shape | 形状 | 'square'\|'round' |  'round' |
| disabled | 是否为禁用状态 | boolean | - |
| labelDisabled | 是否禁用文本内容点击 | boolean | - |
| labelPosition | 文本位置 | 'left'\|'right' |  'right' |
| iconSize | 图标大小 | string \| number |  '20px' |
| checkedColor | 选中状态颜色 | CSSProperties['color'] | - |
| indeterminate | 当前是否支持半选状态，一般用在全选操作中 | boolean | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: boolean)  |
| change | (value: boolean, name: CheckboxValue)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| default | - |

<!--slot end-->

