<template>
  <div class="product-card" @click="() => emits('goToDetail')">
    <div class="image">
      <img :src="imageUrl" />
      <el-tag class="price" type="success">${{ getPrice(price) }}</el-tag>
    </div>

    <p class="desc">{{ desc }}</p>
    <div class="small">{{ getTime(startTime) }}-{{ getTime(endTime) }}</div>
    <div class="small">{{ area }}</div>
    <el-tag class="ml-2" type="warning">{{
      showStatusStr(lunchStatus)
    }}</el-tag>
  </div>
</template>

<script setup>
import { showStatusStr } from '../../../../../utils/getStatus'
import { defineEmits } from 'vue'
defineProps({
  imageUrl: {
    default:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  },
  desc: {
    default: '这是一个很长很长很长很长很长很长的商品名称一行最多14个字'
  },
  startTime: {
    default: '2022/3/13-2022/3/30'
  },
  endTime: {
    default: ''
  },
  area: {
    default: '地区'
  },
  status: {
    default: '未上架'
  },
  price: {
    default: 900
  },
  lunchStatus: {
    default: '修改审核中'
  }
})
const getTime = (t = '2023-02-02T00:00:00Z') => t.slice(5, 10).replace('-', '/')
const getPrice = (p = 100) => p / 100
const emits = defineEmits(['goToDetail'])
</script>

<style lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  min-width: 192px;
  margin: 10px;
  border-radius: 6px;
  box-shadow: -1px -2px 5px 5px rgb(0 0 0 / 4%);
  &:hover {
    cursor: pointer;
  }
  .image {
    width: 170px;
    height: 120px;
    position: relative;
    margin-bottom: 6px;
    img {
      border-radius: 6px;
      width: 100%;
      height: 100%;
    }
    .price {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  p {
    width: 170px;
    height: 40px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .small {
    font-size: small;
    color: gray;
    width: 170px;
    margin: 6px 0;
  }
  .ml-2 {
    align-self: end;
  }
}
</style>
