/*
 * @Description: 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [

  {
    path: '/',
    name: 'main',
    component: () => import('../views/GoodsList.vue')
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('../views/GoodsList.vue')
  },
  {
    path: '/goods/detail',
    name: 'goodsdetail',
    component: () => import('../views/GoodsDetail.vue')
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
  }
]
export default new Router({routes})