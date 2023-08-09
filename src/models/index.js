/*
 * @Description: Vuex入口
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state:{
    socket: null
  },
  modules: {
    user: {},
    shoppingCart: {}
  },
  mutations: {
    setSocket(state,socket) {
      state.socket = socket;
    },
  },
})
