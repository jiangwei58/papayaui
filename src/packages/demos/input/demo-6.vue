<template>
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
</template>
