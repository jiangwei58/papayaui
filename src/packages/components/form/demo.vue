<template>
  <DocDemoBlock title="基础用法">
    <wei-form ref="formRef" :form="formData" :rules="rules">
      <wei-cell-group inset>
        <wei-form-item prop="name" label="名称" required>
          <input
            v-model="formData.name"
            placeholder="请输入"
            :placeholder-style="`color:var(--${PREFIX}-number-input-placeholder-color)`"
          />
        </wei-form-item>

        <wei-form-item prop="desc" label="描述">
          <!-- 可以使用field组件的输入框模式 -->
          <wei-field v-model="formData.desc" placeholder="请输入" only-input />
        </wei-form-item>
        <wei-form-item
          prop="gender"
          label="性别"
          :value="genderText"
          required
          is-link
          @click="onChangeGenderVisible"
        />
        <wei-form-item prop="age" label="年龄">
          <wei-number-input v-model="formData.age" />
        </wei-form-item>
        <wei-form-item prop="comment" label="评论">
          <wei-field v-model="formData.comment" type="textarea" placeholder="请输入" only-input />
        </wei-form-item>
      </wei-cell-group>

      <wei-button class="block px-32 pt-30" @click="onValidate">提交</wei-button>
    </wei-form>
  </DocDemoBlock>

  <wei-picker-popup v-model="formData.gender" v-model:show="genderVisible" :data="genderOptions" />
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
  age: string
  comment: string
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
  age: '',
  comment: '',
})

const rules: FormRules<FormData> = {
  name: [{ required: true }, { max: 10 }],
  desc: {
    validator: (_rules, value: string) => {
      return value.indexOf('1') === 0
    },
    message: '{{label}}开头必须是"1"',
  },
  gender: { required: true, message: '请选择{{label}}' },
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
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
