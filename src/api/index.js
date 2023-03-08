import axios from 'axios'
import { ElMessage } from 'element-plus'
export const authHeader = {
  Authorization:
    'Basic TmdpbnhBdXRoVXNlcm5hbWUxNjM4MWVmYTA2OWE5MGNiZGU5OTg1NGM4MTE4MzAzNmE0YmQyZTQ3NzZlYjc3MGZhNjk3NDBmMWM1YzA2YWE0Ok5naW54QXV0aFBhc3N3b3JkZTA1ODhlM2IzYzViMjQwZmUzZjVmYjY1M2QyOTkwZjM0YjUyZWUwYjU5NWFjZjY1NTNhOTI0YjA3MTZjYjM2Ng=='
}
const request = axios.create({
  auth: {
    username:
      'NginxAuthUsername16381efa069a90cbde99854c81183036a4bd2e4776eb770fa69740f1c5c06aa4',
    password:
      'NginxAuthPassworde0588e3b3c5b240fe3f5fb653d2990f34b52ee0b595acf6553a924b0716cb366'
  }
})
// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    if (response.data.Code != '200') {
      ElMessage({
        type: 'error',
        message: response.data.Msg
      })
      console.warn('请求失败：', response.data)
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
export { request }
