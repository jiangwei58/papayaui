# pa-form 表单模式

## 目标

以 `pa-form` 为核心统一表单数据建模、字段校验和提交流程。

## 推荐做法

```vue
<template>
  <pa-form ref="formRef" :form="formData" :rules="rules" class="common-form">
    <pa-cell-group inset>
      <pa-form-item prop="taskName" label="任务名称" required>
        <pa-input v-model="formData.taskName" placeholder="请输入任务名称" />
      </pa-form-item>

      <pa-form-item prop="taskEndDate" label="结束日期" required>
        <pa-field v-model="formData.taskEndDate" placeholder="请选择日期" only-input />
      </pa-form-item>
    </pa-cell-group>

    <pa-button block type="primary" class="mt-24" @click="onSubmit">提交</pa-button>
  </pa-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance, FormRules } from "papayaui";

interface FormData {
  taskName: string;
  taskEndDate: string;
}

const formRef = ref<FormInstance>();
const formData = ref<FormData>({
  taskName: "",
  taskEndDate: "",
});

const rules: FormRules<FormData> = {
  taskName: [{ required: true, message: "请输入任务名称" }],
  taskEndDate: [{ required: true, message: "请选择结束日期" }],
};

const onSubmit = () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (!isValid) return;
    saveTask(formData.value);
  });
};
</script>
```

## 复杂字段与动态字段

对象路径和数组路径要与 `prop` 完全对齐。

```ts
const rules: FormRules<FormData & { "object.text": string; "list.0.name": string }> = {
  "object.text": [{ required: true }],
  "list.0.name": [{ required: true, message: "第一项名称必填" }],
};
```

动态列表建议：

- 渲染时用 `:prop="`list.${index}.name`"`。
- 删除/新增行后，以当前 index 重新计算路径。

## 校验策略

1. `validate()`：用于提交前全量校验。
2. `validateField(prop)`：用于交互时即时反馈。
3. 自定义 `validator`：用于依赖其他字段的条件校验。

条件校验示例：

```ts
const rules: FormRules<any> = {
  entityList: {
    validator: (_rule, value) => {
      if (!formData.value.taskOrgType) return false;
      return formData.value.taskOrgType === "ALL" ? true : value.length > 0;
    },
    message: "请选择执行机构",
  },
};
```

## 表单拆分建议

大表单按业务域拆成多个 FormItem 子组件，由子组件变更事件触发目标字段 `validateField`。

## 常见误区与修正

1. 误区：`prop` 与 `rules` key 不一致。
   修正：两者路径字符串保持完全一致。
2. 误区：跳过前端校验直接调用接口。
   修正：提交前强制执行 `validate`。
3. 误区：每次输入都跑全量 `validate`。
   修正：输入过程用 `validateField`，提交时再跑全量。
4. 误区：动态列表仍使用静态规则路径。
   修正：使用 `list.${index}.field` 动态路径。

## 快速检查清单

- 声明 `FormInstance` 与 `FormRules` 类型。
- `prop` 路径与数据结构、规则结构一致。
- 提交流程被 `validate` 结果保护。
- 动态/条件字段使用显式校验策略。
