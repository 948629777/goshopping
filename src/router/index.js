import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login/index.vue'
import register from '../views/Register/index.vue'
import home from '../views/home/Home'
import detail from '../components/Detail'
import search from '../components/search'
import shopCar from '../components/ShopCart'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/shopping' },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/shopping', component: home },
  { path: '/detail/:id', component: detail },
  { path: '/search/:q', component: search },
  { path: '/car', component: shopCar }
]

const router = new VueRouter({
  routes,
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // to要去的页面 from从哪里来 next放行 
  if (to.path === '/car') {
    var tokenStr = sessionStorage.getItem('token')
    if (!tokenStr) next('/shopping')
    else next()
  }else{
    next()
  }
})
export default router
