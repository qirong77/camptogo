import { defineStore } from 'pinia'
export const useStore = defineStore('global', {
  state: () => {
    return {
      // 用户登录后的数据
      userInfo: {},
      // 商品详情数据,
      product: {}
    }
  },
  actions: {
    setUserInfo(userInfo) {
      window.localStorage.setItem('camptogo-user', JSON.stringify(userInfo))
      this.userInfo = userInfo
    },
    setProduct(p) {
      this.product = p
    }
  },
  getters: {
    user() {
      return JSON.parse(window.localStorage.getItem('camptogo-user'))
    },
    providerId() {
      return JSON.parse(window.localStorage.getItem('camptogo-user')).provider
        .id
    }
  }
})
