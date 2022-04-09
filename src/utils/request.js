import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误,让当前的执行链跳出成功,直接进入catch
  }
)

export default service
