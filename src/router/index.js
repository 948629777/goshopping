import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login/index.vue'
import register from '../views/Register/index.vue'
import home from '../views/home/Home'
import detail from '../components/Detail'
import search from '../components/search'
import shopCar from '../components/ShopCart'
import add from '../components/addGoods/AddCartSuccess'
import pay from '../components/pay/Pay'
import paysuccess from '../components/pay/PaySuccess'
import center from '../components/pay/Center'
import trade from '../components/pay/Trade'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/shopping' },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/shopping', component: home },
  { path: '/detail/:id', component: detail },
  { path: '/search/:q', component: search },
  { path: '/car', component: shopCar },
  {path:'/addgoods/:id',component:add},
  {path:'/pay',component:pay},
  {path:'/paysuccess',component:paysuccess},
  {path:'/orders/:ordersId',component:center},
  {path:'/trade',component:trade}
]

const router = new VueRouter({
  routes,
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // to要去的页面 from从哪里来 next放行 
  if (to.path === '/car') {
    var tokenStr = sessionStorage.getItem('token')
    if (!tokenStr) {
      Vue.prototype.$message.error('需要先登录认证')
      next('/login')
    }
    else next()
  }else{
    next()
  }
})
export default router
