import axios from 'axios'
import { Loading, Message } from 'element-ui'

const baseURL = 'http://127.0.0.1:3007'
const https = axios.create({
  baseURL,
  timeout: 5000
})

//http 拦截器
var loadinginstace

https.interceptors.request.use(
  (config) => {
    if (config.url.substring(0, 5) === '/news' || config.url.substring(0, 5) === '/recr') {
      return config
    }
    const token = sessionStorage.getItem('Ticket')
    if (token) {
      config.headers.Authorization = token
    }
    // element ui Loading方法
    loadinginstace = Loading.service({
      fullscreen: true
    })
    return config
  },
  (error) => {
    loadinginstace.close()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
  }
)

// http响应拦截器
https.interceptors.response.use(
  (response) => {
    // 响应成功关闭loading
    loadinginstace.close()
    return response.data
  },
  (error) => {
    loadinginstace.close()

    return Promise.reject(error)
  }
)

export default https
