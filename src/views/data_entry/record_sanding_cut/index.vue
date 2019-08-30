<!--砂光锯切表-->

<template lang="pug">
  .page.w1200.mgauto
    Breadcrumb(:breadcrumbList="breadcrumbList")
    ReverseButton(:titleArray="['添加数据']" @onClick="reverseButtonOnClick")
    DateBatchSelect(@onClick="dateBatchOnClick" :batchList="scheduleList" :year="year" :month="month" :batchIndex="batchIndex")
    TableShow(v-for="item,index in sandingList" :key="item.id" :data="item" :tableIds="[`table1${index}`,`table2${index}`]" @changeClick="changeClick(index)")
</template>

<script>
import Breadcrumb from '_components/breadcrumb'
import ReverseButton from '_components/reverse_button'
import DateBatchSelect from '_components/date_batch_select'
import TableShow from './table_show'
import { SandingList } from '_api/entry_data'
import { ScheduleMain } from '_api/basic_data'
import * as storage from '_common/session_storage'
export default {
  components: {
    Breadcrumb,
    ReverseButton,
    DateBatchSelect,
    TableShow,
  },
  data() {
    const date = new Date()
    return {
      breadcrumbList: [{name:'砂光锯切表',path:'/data_entry/record_sanding_cut'}],
      sandingList: [],
      scheduleList:[],
      year: date.getFullYear(),
      month: date.getMonth()+1,
      batchIndex: 0,
    }
  },
  async mounted() {
    const result = await ScheduleMain()
    const {data, status} = result
    if(status == 200 && data) {
      const array = data || []
      array.reverse()
      array.forEach(element => {
        this.scheduleList.push(element.name)
      });
      storage.setItem(storage.key.chScheduleList, array)
      this.getData()
    }
  },
  methods:{
    async getData() {
      const list = storage.getItem(storage.key.chScheduleList)
      const schedule = list[this.batchIndex].uuid
      const date = `${this.year}-${this.month>9?this.month:('0'+this.month)}`
      const params = {schedule, date}
      const result = await SandingList(params)
      const {data, status} = result
      if(status == 200) {
        this.sandingList = data
      }
    },
    reverseButtonOnClick() {
      storage.setItem(storage.key.chSandingData, {})
      storage.setItem(storage.key.chEditType, 0)
      this.$router.push('/data_entry/record_sanding_cut/add_data_one')
    },
    dateBatchOnClick({batchIndex, month, year}) {
      this.batchIndex = batchIndex
      this.year = year
      this.month = month
      this.getData()
    },
    changeClick(index) {
      storage.setItem(storage.key.chEditType, 1)
      storage.setItem(storage.key.chSandingData, this.sandingList[index])
      this.$router.push('/data_entry/record_sanding_cut/add_data_one')
    },
  }
}
</script>

<style lang="stylus" scoped>
  .page
    padding 20px
    .header-button
      header-button()

</style>












