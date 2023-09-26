<template>
  <view :class="ns.b()"></view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'

const ns = useNamespace('safe-bottom')
</script>

<style lang="scss">
@import './safe-bottom.scss';
</style>
