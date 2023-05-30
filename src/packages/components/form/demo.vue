<template>
  <DocDemoBlock title="基础用法">
    <pa-form ref="formRef" :form="formData" :rules="rules">
      <pa-cell-group inset>
        <pa-form-item prop="name" label="名称" required>
          <input
            v-model="formData.name"
            placeholder="请输入"
            :placeholder-style="`color:var(--${defaultNamespace}-number-input-placeholder-color)`"
          />
        </pa-form-item>

        <pa-form-item prop="desc" label="描述">
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
        <pa-form-item prop="object.text" label="对象值(如obj.text)">
          <pa-field v-model="formData.object.text" placeholder="请输入" only-input />
        </pa-form-item>
        <pa-form-item prop="comment" label="评论">
          <pa-field v-model="formData.comment" type="textarea" placeholder="请输入" only-input />
        </pa-form-item>
      </pa-cell-group>

      <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
        提交
      </pa-button>
    </pa-form>
  </DocDemoBlock>

  <DocDemoBlock title="动态表单">
    <pa-form ref="formRef2" :form="formData2">
      <pa-cell-group inset>
        <pa-form-item
          v-for="(item, index) in formData2.list"
          :key="index"
          :prop="`list.${index}.name`"
          :label="`名称${index}`"
          required
          :rules="[{ required: true }]"
        >
          <view class="flex">
            <input
              v-model="item.name"
              placeholder="请输入"
              :placeholder-style="`color:var(--${defaultNamespace}-number-input-placeholder-color)`"
            />
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
        <pa-button block @click="onValidate2">提交</pa-button>
        <pa-button block type="default" @click="onAddItem">新增</pa-button>
      </view>
    </pa-form>
  </DocDemoBlock>
  <pa-safe-bottom />

  <pa-picker-popup
    v-model="formData.gender"
    v-model:show="genderVisible"
    :data="genderOptions"
    @change="onValueChange"
  />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { FormRules } from '../../core/useForm'
import Form from './form.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { defaultNamespace } from '../../core/useNamespace'

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
  const findItem = genderOptions.find((item) => item.value === formData.gender)
  return findItem ? findItem.label : ''
})
const genderVisible = ref<boolean>(false)

const formData = reactive<FormData>({
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
  'object.text': { required: true }, // object: { type: 'object', fields: { text: { required: true } } },
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

const formRef2 = ref<InstanceType<typeof Form>>()

const formData2 = ref<{
  list: { name: string }[]
}>({
  list: [{ name: '' }, { name: '' }, { name: '' }],
})

const onValidate2 = async () => {
  formRef2.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

const onAddItem = () => {
  formData2.value.list.push({ name: '' })
}

const onDeleteItem = (index: number) => {
  formData2.value.list.splice(index, 1)
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
