# Collapse

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-collapse v-model="collapseValue" @change="onChange" @open="onOpen" @close="onClose">
      <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>

  <DocDemoBlock title="手风琴">
    <pa-collapse accordion @change="onChange" @open="onOpen" @close="onClose">
      <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>

  <DocDemoBlock title="禁用状态">
    <pa-collapse>
      <pa-collapse-item
        v-for="index in 3"
        :key="index"
        :title="`标题${index}`"
        :disabled="index !== 1"
      >
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题内容">
    <pa-collapse>
      <pa-collapse-item>
        <template #title>
          <span class="color-primary">标题1</span>
          <pa-icon name="question-circle" color="var(--pa-color-danger)" />
        </template>
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
      <pa-collapse-item title="标题2" icon="setting" value="内容">
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script setup lang="ts">
import { ref, watch } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { CollapseItemValue } from '../collapse-item/props'

const collapseValue = ref<number[]>([])

watch(collapseValue, (value) => {
  console.log('watch', value)
})

const onChange = (value: CollapseItemValue | CollapseItemValue[]) => {
  console.log('change', value)
}

const onOpen = (value: CollapseItemValue) => {
  console.log('open', value)
}

const onClose = (value: CollapseItemValue) => {
  console.log('close', value)
}
</script>
```

<!--codes end-->

## Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 当前展开面板的 name | CollapseItemValue\|CollapseItemValue[] | - |
| accordion | 是否开启手风琴模式 | boolean | - |
| border | 是否显示外边框 | boolean |  true |

<!--props end-->

## Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: NonNullable\<CollapseProps['modelValue']\>)  |
| change | (value: NonNullable\<CollapseProps['modelValue']\>)  |
| open | (name: CollapseItemValue)  |
| close | (name: CollapseItemValue)  |

<!--event end-->

## Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->
