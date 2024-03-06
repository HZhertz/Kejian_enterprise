import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import VueVideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import '@/style/style.css'
import animate from 'animate.css'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  //完全显示的时候加载
  preLoad: 1,
  //失败时显示的图片
  error: require('./assets/img/error.png'),
  //加载时显示的GIF图
  loading: require('./assets/img/loading.gif'),
  //尝试加载几次
  attempt: 1
})
Vue.use(VueVideoPlayer)
Vue.use(animate)

Vue.config.productionTip = false

// // 图片服务器地址
Vue.prototype.imgserver = 'http://127.0.0.1:3007'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
