
const Set_SandingData = 'Set_SandingData'
const Edit_Type = 'Edit_Type'
const Schedule_List = 'Schedule_List'
export default {
  namespaced: true,
  state: {
    sandingData:{}, // 要修改或添加的砂光锯切数据
    editType: 0, // 0: 新增 1:修改
    scheduleList: []  // 班次列表
  },
  getters: {
    getSandingData: (state) => {
      const {sandingData} = state
      sandingData.sanding = sandingData.sanding || []
      sandingData.sawing = sandingData.sawing || []
      return sandingData
    },
  },
  mutations: {
    [Set_SandingData](state, payload) {
      state.sandingData = payload
    },
    [Edit_Type](state, payload) {
      state.editType = payload
    },
    [Schedule_List](state, payload) {
      state.scheduleList = payload
    }
  }
}