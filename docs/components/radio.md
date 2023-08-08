# Radio

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-radio-group v-model="value">
      <pa-radio v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
    <pa-radio-group v-model="value" class="block mt-50">
      <pa-radio v-for="item in options" :key="item.name" :name="item.name" label-position="left">
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
  </DocDemoBlock>
  <DocDemoBlock title="水平方向" card>
    <pa-radio-group v-model="value" direction="horizontal">
      <pa-radio v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
    <pa-radio-group v-model="value" direction="horizontal" class="block mt-50">
      <pa-radio v-for="item in options" :key="item.name" :name="item.name" label-position="left">
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
  </DocDemoBlock>
  <DocDemoBlock title="形状" card>
    <pa-radio-group v-model="value">
      <pa-radio v-for="item in options" :key="item.name" :name="item.name" shape="square">
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
  </DocDemoBlock>
  <DocDemoBlock title="禁用" card>
    <pa-radio-group v-model="value">
      <pa-radio
        v-for="item in options"
        :key="item.name"
        :name="item.name"
        :disabled="item.name === 1"
      >
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
    <pa-radio-group v-model="value" disabled class="block mt-50">
      <pa-radio v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-radio>
    </pa-radio-group>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const value = ref<number>(0)

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '单选框' + index,
}))
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识符 | RadioValue |  '' |
| shape | 形状 | 'square'\|'round' |  'round' |
| disabled | 是否为禁用状态 | boolean | - |
| labelDisabled | 是否禁用文本内容点击 | boolean | - |
| labelPosition | 文本位置 | 'left'\|'right' |  'right' |
| iconSize | 图标大小 | string \| number |  '20px' |
| checkedColor | 选中状态颜色 | CSSProperties['color'] | - |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| change | (value: RadioValue)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| default | - |

<!--slot end-->

