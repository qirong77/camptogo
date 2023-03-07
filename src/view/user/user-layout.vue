<template>
  <div class="user-layout">
    <el-container>
      <el-header style="height: 60px">
        <img
          style="cursor: pointer"
          @click="router.push('/')"
          class="logo"
          src="../../assets/camptogoLogo.png" />
        <camp-nav :nav-options="navOptions" style="margin-left: 600px" />
        <!-- <div class="user">
          <span>用户名</span>
        </div> -->
      </el-header>
      <el-container>
        <el-aside :width="sideWidth + 'px'">
          <slot name="side"> </slot>
        </el-aside>
        <el-main>
          <div style="padding-bottom: 100px">
            <slot name="main"></slot>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CampNav from '../../component/camp-nav.vue'
defineProps({
  sideWidth: {
    default: 200
  }
})
const router = useRouter()
const navOptions = [
  {
    label: '工作台',
    navTo: '/workbench/basicInfo'
  },
  // {
  //   label: "资管系统",
  //   navTo: "/workbench/basicInfo",
  // },
  {
    label: '规则协议',
    navTo: '/rule'
  }
  // {
  //   navTo: "/workbench/basicInfo",
  //   label: "公告通知",
  // },
]
</script>

<style lang="scss">
.user-layout {
  width: 100vw;
  height: 100vh;
  .el-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    box-shadow: -1px 4px 6px 0px rgb(0 0 0 / 8%);
    .logo {
      width: 180px;
      height: 30px;
    }
  }
  .el-main {
    background-color: #f5f5f5;
    padding: 0;
    height: calc(100vh - 60px);
    overflow: scroll;
  }
  .el-container {
    max-height:  calc(100vh - 60px);
  }
  .el-aside {
    position: relative;
    box-shadow: 4px 3px 9px 0px rgb(0 0 0 / 4%);
  }
}
</style>
