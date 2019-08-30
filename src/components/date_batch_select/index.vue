<template lang="pug">
  .dbs-header-content
    el-row(class="dbs-table-row")
      span(class="dbs-row-title") {{batchTitle}}
      el-button(v-for="item,index in batchList" :key="index" :style="index==currentBatchInndex?{backgroundColor:'#1E9AFF'}:{}" @click="onClick(0,index)" type="primary" plain class="dbs-main-button") {{item}}
    .dbs-row-content
      el-row(class="dbs-table-row")
        el-date-picker(v-model="yearDate" :clearable="false" placeholder="选择年份" type="year" class="dbs-data-picker")
      el-row(class="dbs-table-row")
        el-button(v-for="item,index in monthList" :key="item" :style="index==monthIndex?{backgroundColor:'#1E9AFF'}:{}" @click="onClick(1,index)" type="primary" plain class="dbs-main-button") {{`${index+1}月`}}
</template>

<script>
export default {
  // props:['batchList', 'batchTitle', 'year', 'month', 'batchIndex'],
  props: {
    batchList: {
      default(){
        return ['A班', 'B班', 'C班']
      }
    },
    batchTitle: {
      default: '班次'
    },
    batchIndex:{
      default: 0
    },
    month: {
      default: 0,
    }
  },
  data() {
    const date = new Date()
    const month = date.getMonth()+1
    const monthList = new Array(month)
    date.setFullYear(this.year||date.getFullYear())
    return {
      monthIndex: this.month-1,
      yearDate: date,
      currentBatchInndex: this.batchIndex,
      monthList
    }
  },
  watch: {
    yearDate(value) {
      const date = new Date()
      if(date.getFullYear() > value.getFullYear()) {
        this.monthList = new Array(12)
      } else {
        const date = new Date()
        const month = date.getMonth()+1
        this.monthList = new Array(month)
      }
    }
  },
  methods: {
    onClick(type, index) {
      // type 0:班次 1:月份
      if(type == 0) {
        this.currentBatchInndex = index
      } else {
        this.monthIndex = index
      }
      this.$emit('onClick',{batchIndex:this.currentBatchInndex,year: this.yearDate.getFullYear(), month:this.monthIndex+1})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dbs-header-content
    padding 0px 20px 20px 20px
    margin-top 20px
    border-radius 8px
    background-color #303142
    .dbs-main-button
      // width 68px
      background-color #ffffff00
      color #fff
      border-color #1E9AFF
      margin-right 20px
      font-size 16px
      margin-top 20px
    .dbs-row-title
      color #fff
      margin-right 110px
      font-size 16px
    .dbs-row-content
      display flex
      flex-direction row
      .dbs-table-row
        // margin-top 20px
        // flex-wrap nowrap
        // width 1400px
    .dbs-data-picker
      width 120px
      min-width 120px
      margin-right 20px
      margin-top 20px
</style>


