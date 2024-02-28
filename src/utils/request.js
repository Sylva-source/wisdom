import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 注入token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) return response.data
    const { code, msg, data } = response.data
    if (code) {
      return data
    } else {
      Message({ type: 'error', message: msg })
      return Promise.reject(new Error(msg))
    }
  },
  async(error) => {
    if (error.response.status === 401) {
      Message({ type: 'warning', message: 'token超时了' })
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(error)
    }

    Message({ type: 'error', message: error.message || '请求失败' })
    return Promise.reject(error)
  }
)

export default service
