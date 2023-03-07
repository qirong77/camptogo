<template>
  <nav
    class="camp-tab"
    :style="{
      flexDirection: column ? 'column' : 'row'
    }">
    <span
      v-for="(nav, index) in navOptions"
      :style="{
        width: column ? '80%' : '90px'
      }"
      :class="{
        'nav-active': activeNav === index
      }"
      @click="() => changeRoute(index, nav.navTo)"
      >{{ nav.label }}</span
    >
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  column: {
    default: false
  },
  navOptions: {
    default: [
      {
        label: '文字',
        navTo: ''
      }
    ]
  }
})
const activeNav = ref(0)
const changeRoute = (index, url) => {
  activeNav.value = index
  router.push({
    path: url
  })
}
</script>

<style lang="scss">
.camp-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
    margin: 5px;
    border-radius: 6px;
    color: var(--el-text-color-primary);
    &:hover {
      background-color: var(--primary-color);
      color: #ffff;
    }
  }
  span.nav-active {
    background-color: var(--primary-color);
    color: #ffff;
  }
}
</style>
