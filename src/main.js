/*
 * 入口文件
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'
// import store from './models'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from './libs/axios';

Vue.use(ElementUI);
// 全局函数及变量
import Global from './libs/Global';
Vue.use(Global);

Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
