import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { nextTick } from 'vue'

const baseURL = 'http://127.0.0.1:3007/'
const https = axios.create({
  baseURL,
  timeout: 5000
})

let loadingInstance

https.interceptors.request.use(
  (config) => {
    if (config.url.startsWith('Admin')) {
      const token = sessionStorage.getItem('Ticket')
      if (token) {
        config.headers.Authorization = token
      }
    }
    loadingInstance = Loading.service({
      fullscreen: true
    })
    return config
  },
  (error) => {
    nextTick(() => {
      loadingInstance.close()
    })
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
  }
)

https.interceptors.response.use(
  (response) => {
    nextTick(() => {
      loadingInstance.close()
    })
    return response.data
  },
  (error) => {
    nextTick(() => {
      loadingInstance.close()
    })
    return Promise.reject(error)
  }
)

export default https
