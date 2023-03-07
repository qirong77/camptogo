<template>
  <div>
    <el-button @click="()=>router.push('./login')">登录工作台</el-button>
    <el-button>招商平台</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style lang="scss" scoped></style>
