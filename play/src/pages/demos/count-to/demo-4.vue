<template>
  <pa-count-to
    ref="countToRef"
    :start-num="0"
    :end-num="9999"
    :formatter="formatter"
    custom-class="text-60 text-black"
    @click="countToRef?.restart()"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CountToInstance } from 'papayaui'

const countToRef = ref<CountToInstance>()

const formatter = (num: number) => {
  return num.toString().replace(/\d+/, (s) => {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  })
}
</script>
