/*
 * @Description: Vuex入口
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user: {},
    shoppingCart: {}
  }
})
