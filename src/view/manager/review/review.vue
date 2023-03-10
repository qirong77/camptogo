<template>
  <user-layout>
    <template #side>
      <camp-nav style="margin-top: 20px" :column="true" :nav-options="navs" />
    </template>
    <template #main>
      <router-view />
    </template>
  </user-layout>
</template>

<script setup>
import UserLayout from '../user-layout.vue'
import CampNav from '../../../component/camp-nav.vue'
const navs = [
  {
    label: '基本信息审核',
    navTo: '/workbench/basicInfo'
  },
  {
    label: '主理人设置审核',
    navTo: '/workbench/manager-setting'
  },
  {
    label: '保险管理审核',
    navTo: '/workbench/productLunch'
  },
  {
    label: '保险支持',
    navTo: '/workbench/progress'
  },
  {
    label: '订单管理审核',
    navTo: '/workbench/feedback'
  },
  {
    label: '资管系统审核',
    navTo: '/workbench/manager-ordering'
  },
  {
    label: '评价审核',
    navTo: '/workbench/manager-ordering'
  },
  {
    label: '公告私信审核',
    navTo: '/workbench/manager-ordering'
  },
  {
    label: '规则协议审核',
    navTo: '/workbench/manager-ordering'
  }
]
</script>

<style lang="scss"></style>
