import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag:false,
    userName:''
  },
  getters: {
  },
  mutations: {
    isLogin(state){
      state.flag = true
      state.userName = sessionStorage.getItem('userName')
    },
    noLogin(state){
      state.userName = ''
      state.flag = false
    }
  },
  actions: {
  },
  modules: {
  }
})
