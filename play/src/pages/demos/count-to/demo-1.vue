<template>
  <pa-count-to
    ref="countToRef"
    :start-num="0"
    :end-num="999"
    custom-class="text-60 text-black"
    @click="countToRef?.restart()"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()
</script>
