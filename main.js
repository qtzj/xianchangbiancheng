import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import axios from "axios"
import './assets/css/global.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://106.14.209.11:11451'
// axios.defaults.baseURL = 'http://106.14.209.11:8888'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  if(config.status === 401 || config.data.status === 401){
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    // 拿不到vue实例，只能用原生方法
    location.href='/';
    // location.reload()

    // router.go(0)
    // Vue.prototype.$router.go(0) 
    alert('登录失效或权限不足，请重新登录')
  }
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

