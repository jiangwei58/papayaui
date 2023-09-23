<template>
  <!-- 图片如果自带留白，可以尺寸设置大一点，然后将和间距调小一点（如下示例），保证核心图标大小为22px左右视觉效果最佳 -->
  <pa-tabbar
    v-model="tabbarActive"
    :fixed="false"
    :safe-area-inset-bottom="false"
    style="--pa-tabbar-item-icon-margin-bottom: 1px"
  >
    <pa-tabbar-item text="首页" info="6">
      <template #icon="{ active }">
        <image v-if="active" src="../../images/menu_active.png" style="width: 25px; height: 25px" />
        <image v-else src="../../images/menu_normal.png" style="width: 25px; height: 25px" />
      </template>
    </pa-tabbar-item>
    <pa-tabbar-item text="订单">
      <template #icon="{ active }">
        <image v-if="active" src="../../images/cart_active.png" style="width: 25px; height: 25px" />
        <image v-else src="../../images/cart_normal.png" style="width: 25px; height: 25px" />
      </template>
    </pa-tabbar-item>
    <pa-tabbar-item text="消息">
      <template #icon="{ active }">
        <image v-if="active" src="../../images/sale_active.png" style="width: 25px; height: 25px" />
        <image v-else src="../../images/sale_normal.png" style="width: 25px; height: 25px" />
      </template>
    </pa-tabbar-item>
    <pa-tabbar-item text="我的">
      <template #icon="{ active }">
        <image v-if="active" src="../../images/user_active.png" style="width: 25px; height: 25px" />
        <image v-else src="../../images/user_normal.png" style="width: 25px; height: 25px" />
      </template>
    </pa-tabbar-item>
  </pa-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabbarActive = ref(0)
</script>
