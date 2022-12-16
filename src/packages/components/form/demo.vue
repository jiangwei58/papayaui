<template>
  <DocDemoBlock title="基础用法">
    <pa-form ref="formRef" :form="formData" :rules="rules">
      <pa-cell-group inset>
        <pa-form-item prop="name" label="名称" required>
          <input
            v-model="formData.name"
            placeholder="请输入"
            :placeholder-style="`color:var(--${PREFIX}-number-input-placeholder-color)`"
          />
        </pa-form-item>

        <pa-form-item prop="desc" label="描述">
          <!-- 可以使用field组件的输入框模式 -->
          <pa-field v-model="formData.desc" placeholder="请输入" only-input />
        </pa-form-item>
        <pa-form-item
          prop="gender"
          label="性别"
          :value="genderText"
          required
          is-link
          @click="onChangeGenderVisible"
        />
        <pa-form-item prop="age" label="年龄" required>
          <pa-number-input v-model.number="formData.age" />
        </pa-form-item>
        <pa-form-item prop="comment" label="评论">
          <pa-field v-model="formData.comment" type="textarea" placeholder="请输入" only-input />
        </pa-form-item>
        <pa-form-item prop="object.text" label="对象(如object.text)">
          <pa-field
            v-model="formData.object.text"
            type="textarea"
            placeholder="请输入"
            only-input
          />
        </pa-form-item>
      </pa-cell-group>

      <pa-button class="block px-32 pt-30" block @click="onValidate">提交</pa-button>
    </pa-form>
  </DocDemoBlock>

  <pa-picker-popup
    v-model="formData.gender"
    v-model:show="genderVisible"
    :data="genderOptions"
    @change="onValueChange"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { FormRules } from '../../hooks'
import Form from './form.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { PREFIX } from '../../utils/style'

interface FormData {
  name: string
  desc: string
  gender?: 1 | 0
  age?: number
  comment: string
  object: { text: string }
}

const formRef = ref<InstanceType<typeof Form>>()

const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
]
const genderText = computed(() => {
  const findItem = genderOptions.find((item) => item.value === formData.value.gender)
  return findItem ? findItem.label : ''
})
const genderVisible = ref<boolean>(false)

const formData = ref<FormData>({
  name: '',
  desc: '',
  comment: '',
  object: { text: '' },
})

const rules: FormRules<FormData & { 'object.text': string }> = {
  name: [{ required: true }, { max: 10 }],
  desc: {
    validator: (_rules, value: string) => {
      return value.indexOf('1') === 0
    },
    message: '{{label}}开头必须是"1"',
  },
  gender: { required: true, message: '请选择{{label}}' },
  age: { required: true, type: 'number', max: 99 },
  comment: { max: 10 },
  object: { type: 'array', fields: { text: { required: true } } },
}

const onChangeGenderVisible = () => {
  genderVisible.value = true
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

const onValueChange = () => {
  formRef.value?.validateField('gender')
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
