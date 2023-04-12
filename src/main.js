import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import nav from './views/Register/headerNav.vue'
Vue.component('header-nav',nav)
// 导入组件库
import ElementUI from 'element-ui';
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/all.css'
import './assets/css/reset.css'
// 配置  Vue 插件
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
// 配置请求头信息
axios.defaults.headers['token'] = localStorage.getItem('token')

new Vue({
  router,
  store,
  watch: {//监听路由变化
    $route(to, from) {
      if(sessionStorage.getItem('userName')&&!this.$store.state.flag){
        this.$store.commit('isLogin')
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
