/*
 * @Description: Vuex入口
 */
import Vue from 'vue'
import Vuex from 'vuex'
import initSocket from '../libs/socket'


Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state:{
    socket: null
  },
  getters: {
    getSocket(state){
      console.log('old socketid::', state.socket.id)
      if(state.socket && state.socket.connected){
        console.log("socket connected ok")
        return state.socket
      } else {
        return null
      }
    }
  },
  mutations: {
    setSocket(state,socket) {
      state.socket = socket;
    },
    getNewSocket(state){
      console.log("socket getNewSocket： ...")
      if(state.socket && state.socket.connected){
        console.log("socket getNewSocket： disconnected and reconnected success ...")
        return state.socket
      } else {
        console.log("socket getNewSocket： disconnected and get a new ...")
        state.socket.close();
        state.socket.destroy();
        let newSocket = initSocket()
        state.socket = newSocket;
        console.log('new socketid::', newSocket.id)
        return newSocket
      }
    }
  },
})
