import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import tmt from './module/tmt'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, tmt
  }
})
