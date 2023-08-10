/*
 * @Description: Vuex入口
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state:{
    socket: null
  },
  getters: {
    getSocket(state){
      return state.socket
    }
  },
  mutations: {
    setSocket(state,socket) {
      state.socket = socket;
    },
  },
})
