/*
 * @Description: 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [

  {
    path: '/',
    name: 'main',
    component: () => import('../views/SpuList.vue')
  },
  {
    path: '/goods',
    name: 'goods',
    // component: () => import('../views/GoodsList.vue')
    component: () => import('../views/SpuList.vue')
  },
  {
    path: '/spus',
    name: 'spus',
    component: () => import('../views/SpuList.vue')
  },
  {
    path: '/spus/detail',
    name: 'spusdetail',
    component: () => import('../views/SpuDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersList.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/Chat.vue')
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('../views/AboutUs.vue')
  },
]
export default new Router({routes})