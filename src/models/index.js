/*
 * @Description: Vuex入口
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from './sub_models/user'
import shoppingCart from './sub_models/shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingCart
  }
})
