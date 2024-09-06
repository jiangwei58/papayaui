<template>
  <pa-container>
    <template #header>
      <pa-search @confirm="onSearch" />
    </template>

    <DocDemoBlock title="基础用法"></DocDemoBlock>
    <view v-for="item in list" :key="item.id" class="px-26">
      <view class="border-bottom" style="line-height: 88rpx">{{ item.label }}</view>
    </view>
    <pa-loadmore :status="loadStatus" :config="{ nomore: isEmpty ? '无数据' : '没有更多了' }" />
  </pa-container>
</template>

<script lang="ts" setup>
import { onReachBottom } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import type { EventDetail } from '../..'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { useList } from '../useList'

interface ListItem {
  id: number
  label: string
}

const { list, pageNumber, pageSize, loadStatus, isEmpty, getListData } = useList<ListItem>({
  pageSize: 20,
})

const getData = (searchText?: string) => {
  /**
   * 触发hook提供的加载列表的方法，返回对应数据，返回的list数据会自动触发数据变更
   */
  getListData(() => {
    // 返回对应结构数据即可，异步和同步都可，此demo使用promise模拟加载状态
    return new Promise((resolve) => {
      // 模拟无数据和加载3页后无更多数据情况，正常情况根据实际接口无需此判断
      if (searchText?.startsWith('null') || pageNumber.value > 3) {
        resolve({
          list: [],
        })
        return
      }
      setTimeout(() => {
        // 获取列表数据，此demo使用假数据
        const list = new Array(pageSize.value).fill(0).map<ListItem>((_item, index) => {
          const id = pageNumber.value * pageSize.value + index
          return {
            id,
            label: `${searchText || ''}列表数据${id}`,
          }
        })
        resolve({
          list,
        })
      }, 300)
    })
  })
}

onMounted(() => {
  getData()
})

onReachBottom(() => {
  pageNumber.value += 1
  getData()
})

const onSearch = (event: EventDetail<{ value: string }>) => {
  pageNumber.value = 0
  getData(event.detail.value)
}
</script>

<style lang="scss" scoped></style>
