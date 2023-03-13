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
import UserLayout from "../user-layout.vue";
import CampNav from "../../../component/camp-nav.vue";
const navs = [
  {
    label: "基础信息",
    navTo: "/workbench/basicInfo",
  },
  {
    label: "主理人设置",
    navTo: "/workbench/manager-setting",
  },
  {
    label: "商品发布",
    navTo: "/workbench/productLunch",
  },
  {
    label: "商品管理",
    navTo: "/workbench/product-manage",
  },
  {
    label: "审核进度",
    navTo: "/workbench/progress",
  },
  // {
  //   label: "使用反馈",
  //   navTo: "/workbench/feedback",
  // },
  {
    label: "订单管理",
    navTo: "/workbench/manager-ordering",
  },
];
</script>

<style lang="scss"></style>
