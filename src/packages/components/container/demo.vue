<template>
  <wei-container>
    <template #header>
      <wei-search @confirm="onSearch" />
    </template>

    <view>
      <view v-for="item in list" :key="item.id" class="px-26">
        <view class="border-bottom" style="line-height: 88rpx">{{ item.label }}</view>
      </view>
      <wei-loadmore :status="loadStatus" />
    </view>

    <template #bottom>
      <view class="px-26 py-12">
        <wei-button type="primary">确定</wei-button>
      </view>
    </template>
  </wei-container>
</template>

<script lang="ts" setup>
import { onReachBottom } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import { useList } from '../../hooks'
import { EventDetail } from '../../types'

interface ListItem {
  id: number
  label: string
}

const { list, pageNumber, pageSize, loadStatus, getListData } = useList<ListItem>({ pageSize: 20 })

const getData = (searchText?: string) => {
  getListData(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: new Array(pageSize.value).fill(0).map<ListItem>((_item, index) => {
            const id = pageNumber.value * pageSize.value + index
            return {
              id,
              label: `${searchText || ''}列表数据${id}`,
            }
          }),
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
