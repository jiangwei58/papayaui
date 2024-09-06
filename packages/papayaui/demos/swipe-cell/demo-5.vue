<template>
  <pa-swipe-cell>
    <pa-cell title="单元格" value="内容" />
    <template #right>
      <view
        class="flex items-center justify-center"
        style="
          width: 100px;
          height: 100%;
          border-radius: 0 100px 100px 0;
          color: #fff;
          background: linear-gradient(315deg, rgb(73, 143, 242) 0%, rgb(73, 101, 242) 100%);
        "
      >
        自定义内容
      </view>
    </template>
  </pa-swipe-cell>
</template>
