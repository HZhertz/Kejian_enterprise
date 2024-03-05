import axios from 'axios'
import { Loading, Message } from 'element-ui'

const baseURL = 'http://127.0.0.1:3007/'
const https = axios.create({
  baseURL,
  timeout: 5000
})

let loadinginstace

https.interceptors.request.use(
  (config) => {
    if (config.url.startsWith('Admin')) {
      const token = sessionStorage.getItem('Ticket')
      if (token) {
        config.headers.Authorization = token
      }
    }
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

https.interceptors.response.use(
  (response) => {
    loadinginstace.close()
    return response.data
  },
  (error) => {
    loadinginstace.close()
    return Promise.reject(error)
  }
)

export default https
