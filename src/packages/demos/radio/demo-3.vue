<template>
  <pa-radio-group v-model="value">
    <pa-radio v-for="item in options" :key="item.name" :name="item.name" shape="square">
      {{ item.label }}
    </pa-radio>
  </pa-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number>(0)

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '单选框' + index,
}))
</script>
