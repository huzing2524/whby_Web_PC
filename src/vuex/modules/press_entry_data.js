import * as types from '@/vuex/mutation-types'
const Press_Run_Bean = 'Press_Run_Bean'

export default {
  namespaced: true,
  state: {
    // 压机运行记录数据bean
    PressRunBean: {},

  },
  getters: {
  },
  actions: {
    updatePressRunBean({commit}, payload) {
      commit(Press_Run_Bean, payload)
    },

  },
  mutations: {
    [Press_Run_Bean](state, payload) {
      state.PressRunBean = payload === undefined ? {} : {...state.PressRunBean, ...payload}
    },

  },
}
