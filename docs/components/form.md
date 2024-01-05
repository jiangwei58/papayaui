# Form

<!--codes start-->

## 基础用法

```html [template]

<pa-form ref="formRef" :form="formData" :rules="rules">
  <pa-cell-group inset>
    <pa-form-item prop="name" label="名称" required>
      <pa-field v-model="formData.name" placeholder="请输入" only-input />
    </pa-form-item>

    <pa-form-item prop="desc" label="描述">
      <pa-field v-model="formData.desc" placeholder="请输入" only-input />
    </pa-form-item>
  </pa-cell-group>

  <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
    提交
  </pa-button>
</pa-form>

```
```ts [script]

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from '../..'

interface FormData {
  name: string
  desc: string
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  name: '',
  desc: '',
})

const rules: FormRules<FormData & { 'object.text': string }> = {
  name: [{ required: true }],
  desc: [{ required: true, message: '请输入描述内容' }],
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

```
## 校验规则

```html [template]

<pa-form ref="formRef" :form="formData" :rules="rules">
  <pa-cell-group inset>
    <pa-form-item prop="name" label="名称" required>
      <pa-field v-model="formData.name" placeholder="请输入" only-input />
    </pa-form-item>

    <pa-form-item prop="age" label="年龄" suffix="岁" required>
      <pa-input-number
        v-model.number="formData.age"
        :controls="false"
        plain
        block
        input-align="right"
        style="--pa-input-number-height: 24px"
      />
    </pa-form-item>

    <pa-form-item prop="desc" label="描述">
      <pa-textarea v-model="formData.desc" placeholder="请输入" input-align="right" />
    </pa-form-item>
  </pa-cell-group>

  <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
    提交
  </pa-button>
</pa-form>

```
```ts [script]

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from '../..'

interface FormData {
  name: string
  age?: number
  desc?: string
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  name: '',
})

const rules: FormRules<FormData> = {
  name: [{ required: true }, { min: 2 }, { max: 4 }],
  age: [{ required: true }, { type: 'number', max: 999 }],
  desc: {
    validator: (_rules, value: string) => {
      return value.indexOf('1') === 0
    },
    message: '{{label}}开头必须是"1"',
  },
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

```
## 单个校验触发

```html [template]

<pa-form ref="formRef" :form="formData" :rules="rules">
  <pa-cell-group inset>
    <pa-form-item prop="name" label="名称" required>
      <pa-field v-model="formData.name" placeholder="请输入" only-input @blur="onNameValidate" />
    </pa-form-item>
  </pa-cell-group>

  <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
    提交
  </pa-button>
</pa-form>

```
```ts [script]

/**
 * @description 可以用 validateField 方法来校验单个字段，参数为 prop 值，通常在需要及时反馈校验状态的情况使用
 */
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from '../..'

interface FormData {
  name: string
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  name: '',
})

const rules: FormRules<FormData> = {
  name: [{ required: true }, { min: 2 }, { max: 4 }],
}

const onNameValidate = () => {
  formRef.value?.validateField('name')
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

```
## 复杂类型

```html [template]

<pa-form ref="formRef" :form="formData" :rules="rules">
  <pa-cell-group inset>
    <pa-form-item prop="object.text" label="对象" required>
      <pa-field
        v-model="formData.object.text"
        placeholder="请输入"
        only-input
        @blur="onNameValidate"
      />
    </pa-form-item>

    <pa-form-item prop="array.0" label="数组" required>
      <pa-field
        v-model="formData.array[0]"
        placeholder="请输入"
        only-input
        @blur="onNameValidate"
      />
    </pa-form-item>
  </pa-cell-group>

  <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
    提交
  </pa-button>
</pa-form>

```
```ts [script]

/**
 * @description 可以用 validateField 方法来校验单个字段，参数为 prop 值，通常在需要及时反馈校验状态的情况使用
 */
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from '../..'

interface FormData {
  object: {
    text: string
  }
  array: string[]
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  object: {
    text: '',
  },
  array: [],
})

const rules: FormRules<FormData & { 'object.text': string; 'array.0': string }> = {
  'object.text': [{ required: true }, { max: 5 }],
  'array.0': [{ required: true, message: '数组第一个是必填的' }],
}

const onNameValidate = () => {
  formRef.value?.validateField('name')
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

```
## 动态表单

```html [template]

<pa-form ref="formRef" :form="formData">
  <pa-cell-group inset>
    <pa-form-item
      v-for="(item, index) in formData.list"
      :key="index"
      :prop="`list.${index}.name`"
      :label="`名称${index}`"
      required
      :rules="[{ required: true }]"
    >
      <view class="flex">
        <pa-field v-model="item.name" placeholder="请输入" only-input />
        <pa-button
          type="danger"
          width="100"
          height="50"
          block
          :custom-style="{ padding: 0, marginLeft: '10px' }"
          @click="onDeleteItem(index)"
        >
          删除
        </pa-button>
      </view>
    </pa-form-item>
  </pa-cell-group>

  <view class="grid grid-cols-2 gap-25 mt-30 mx-32">
    <pa-button block @click="onValidate">提交</pa-button>
    <pa-button block type="default" @click="onAddItem">新增</pa-button>
  </view>
</pa-form>

```
```ts [script]

import { ref } from 'vue'
import type { FormInstance } from '../..'

const formRef = ref<FormInstance>()

const formData = ref<{
  list: { name: string }[]
}>({
  list: [{ name: '' }, { name: '' }, { name: '' }],
})

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

const onAddItem = () => {
  formData.value.list.push({ name: '' })
}

const onDeleteItem = (index: number) => {
  formData.value.list.splice(index, 1)
}

```

<!--codes end-->

## Form Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| form | 表单数据 | any |  () => ({}) |
| rules | 校验规则 | FormRules\<any\> |  () => ({}) |

## FormItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| prop | 校验对应的字段名 | string | - |
| label | 标签名 | string | - |
| desc | 描述信息 | string | - |
| rules | 校验规则 | FormRuleItem\|FormRuleItem[] | - |
| suffix | 后缀内容 | string | - |

<!--props end-->

## Form Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| reset | ()  |

## FormItem Event

| 事件名 | 参数 |
| --- | --- |
| click | ()  |

<!--event end-->

## Form Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## FormItem Slot

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

