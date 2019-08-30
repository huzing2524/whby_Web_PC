export default {
  // 压机运行记录Bean
  PressRunBean: {},

  scheduleArray: [],

  setPressRunBean(bean) {
    this.PressRunBean = bean;
  },
  clearPressRunBean() {
    if(null != this.PressRunBean) {
      for(let key in this.PressRunBean) {
        delete this.PressRunBean[key]
      }
    }
  },
  getPressRunBean() {
    return this.PressRunBean
  },

  setScheduleArray(bean) {
    this.clearScheduleArray()
    this.scheduleArray = bean;
  },
  clearScheduleArray() {
    if(null != this.scheduleArray) {
      this.scheduleArray.length = 0
    }
  },
  getScheduleArray() {
    return this.scheduleArray
  },

}
