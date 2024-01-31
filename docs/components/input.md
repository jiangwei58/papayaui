# Input

<!--codes start-->

## 基础用法

```html [template]

<pa-cell title="文本">
  <pa-input placeholder="请输入" />
</pa-cell>
<pa-cell title="数字">
  <pa-input type="number" placeholder="请输入" />
</pa-cell>
<pa-cell title="小数">
  <pa-input type="number" :decimal-length="2" placeholder="请输入" />
</pa-cell>
<pa-cell title="最大最小值">
  <pa-input v-model.number="value" type="number" :min="2" :max="99" placeholder="请输入" />
</pa-cell>

```
```ts [script]

/**
 * @tip 数据值默认都为 string 类型，如需要 number 类型，你可以在 v-model 后添加 .number 修饰符
 */
import { ref } from 'vue'

const value = ref<number>()

```
## 禁用和只读

```html [template]

<pa-cell title="文本">
  <pa-input model-value="输入框只读" placeholder="请输入" readonly />
</pa-cell>
<pa-cell title="文本">
  <pa-input model-value="输入框禁用" placeholder="请输入" disabled />
</pa-cell>

```
## 清除按钮

```html [template]

<pa-cell title="文本">
  <pa-input v-model="value" placeholder="请输入" clearable />
</pa-cell>

```
```ts [script]

import { ref } from 'vue'

const value = ref('')

```
## 配合表单使用

```html [template]

<pa-form>
  <pa-form-item label="文本" prop="text">
    <pa-input v-model="formData.text" placeholder="请输入" />
  </pa-form-item>
</pa-form>

```
```ts [script]

/**
 * @tip 数据值默认都为 string 类型，如需要 number 类型，你可以在 v-model 后添加 .number 修饰符
 */
import { ref } from 'vue'

const formData = ref({
  text: '',
})

```
## 聚焦全选内容

```html [template]

<pa-cell title="文本">
  <pa-input v-model="value" placeholder="请输入" select-all-on-focus />
</pa-cell>

```
```ts [script]

import { ref } from 'vue'

const value = ref('')

```
## 插槽

```html [template]

<pa-cell>
  <pa-input placeholder="前置插槽">
    <template #prefix>
      <pa-icon name="search" />
    </template>
  </pa-input>
</pa-cell>
<pa-cell>
  <pa-input placeholder="后置插槽">
    <template #suffix>
      <pa-button size="mini" block class="ml-16">获取验证码</pa-button>
    </template>
  </pa-input>
</pa-cell>

```

<!--codes end-->

## Input Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 值 | InputValue | - |
| name | 标识符 | string |  '' |
| type | 输入框类型 | InputType |  'text' |
| placeholder | 输入提示 | string |  '' |
| inputAlign | 内容对齐方式 | 'left'\|'center'\|'right' |  'right' |
| disabled | 是否禁用 | boolean | - |
| readonly | 是否只读 | boolean | - |
| clearable | 是否显示清除控件 | boolean | - |
| maxLength | 最大输入长度，设置为 -1 的时候不限制最大长度 | number |  -1 |
| selectAllOnFocus | 聚焦时是否全选内容 | boolean | - |
| formatter | 输入格式化函数 | (value:string,trigger:'input'\|'blur')=\>string | - |
| confirmType | 设置键盘右下角按钮的文字，仅在 type="text" 时生效 | string | - |
| confirmHold | 点击键盘右下角按钮时是否保持键盘不收起 | boolean | - |
| adjustPosition | 键盘弹起时，是否自动上推页面 | boolean |  true |
| alwaysEmbed | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) | boolean | - |
| holdKeyboard | focus时，点击页面的时候不收起键盘 | boolean | - |
| min | 最小值 | number | - |
| max | 最大值 | number | - |
| intLength | 整数位长度 | number | - |
| decimalLength | 小数位长度 | number | - |

<!--props end-->

## Input Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: InputValue)  |
| blur | (event: any)  |
| click | (event: any)  |
| click-input | (event: any)  |
| focus | (event: any)  |
| clear | ()  |

<!--event end-->

## Input Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| prefix | - |
| suffix | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-input-height | 24px |
| --pa-input-font-size | 14px |
| --pa-input-color | var(--pa-color-black) |
| --pa-input-placeholder-color | var(--pa-color-disabled) |
| --pa-input-disabled-color | var(--pa-color-disabled) |

<!--cssVar end-->

