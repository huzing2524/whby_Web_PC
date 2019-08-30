<template lang="pug">
  .page.w1200.mgauto
    Breadcrumb(:breadcrumbList="breadcrumbList")
    .input-content
      el-button(@click="clickExport" type="primary" class="header-button") 导出Excel
      el-button(@click="clickImport" type="primary" class="header-button") 导入Excel
    .header-content
      el-row(class="table-row")
        span(class="row-title") 班次
        el-button(v-for="item,index in shifts" :key="index" :style="index==currentShift?{backgroundColor:'#1E9AFF'}:{}" @click="clickShift(index)" type="primary" plain class="main-button") {{item}}
        .row-content
          el-row(class="table-row")
            el-date-picker(v-model="year" :clearable="false" placeholder="选择年份" type="year" class="data-picker")
          el-row(class="table-row")
            el-button(v-for="item,index in months" :key="item" :style="index==currentMonth?{backgroundColor:'#1E9AFF'}:{}" @click="clickMonth(index)" type="primary" plain class="main-button") {{`${index+1}月`}}
    .content
      .table-content
        el-table(id="out-table" :data="tableData" :header-cell-style="headerStyle" table-border-color="yellow" :cell-style="cellStyle")
          el-table-column( :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="item,index in tableHeaders" :key="item.id" :prop="index+''" :label="item" flex=1)
    UploadExcel(v-show="isShowUpload" @cancelHandle="cancelHandle" @confirmHandle="confirmHandle")
</template>

<script>
import Breadcrumb from '_components/breadcrumb'
import UploadExcel from '_views/report_import/upload_excel'
import {QualityData, QualityUpload} from '_api/report_import' 
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { ScheduleMain } from '_api/basic_data'
import * as storage from '_common/session_storage'
export default {
  components :{
    UploadExcel,
    Breadcrumb
  },
  data() {
    const date = new Date()
    const month = date.getMonth()+1
    const months = new Array(month)
    return {
      breadcrumbList:[{name:'产品入库质量统计',path:'/report_import/product_instock'}],
      isShowUpload: false,
      year: '2019',
      // currentShift:{0:true,1:true,2:true},//班次 012=abc
      // currentMonth:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false},  // 月份呢
      currentShift: 0,
      currentMonth: months.length-1,
      months:months,
      shifts:[],
      tableHeaders:[],
      tableData:[],
      focusStyle:{
        backgroundColor:'#1E9AFF'
      }
    }
  },
  async mounted() {
    const result = await ScheduleMain()
    const {data, status} = result
    if(status == 200 && data) {
      const array = data || []
      array.reverse()
      array.forEach(element => {
        this.shifts.push(element.name)
      });
      storage.setItem(storage.key.chScheduleList, array)
      this.getData()
    }
  },
  watch: {
    year(value) {
      const date = new Date()
      if(date.getFullYear() > value.getFullYear()) {
        this.months = new Array(12)
      } else {
        const date = new Date()
        const month = date.getMonth()+1
        this.months = new Array(month)
      }
    }
  },
  methods: {
    headerStyle() {
      return 'background-color:#303142;color:#fff;border-bottom: 1px solid #454A5A'
    },
    cellStyle() {
      return "color:#fff;background-color:#303142;border-bottom: 1px solid #454A5A"
    },
    clickShift(index) {
      // this.currentShift[index] = !this.currentShift[index]
      this.currentShift = index
      this.getData()
    },
    clickMonth(index) {
      // this.currentMonth[index] = !this.currentMonth[index]
      this.currentMonth = index
      this.getData()
    },
    clickExport() {
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `产品入库质量等级统计${this.year}年${this.currentMonth+1}月.xlsx`)
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
    },
    clickImport() {
      this.isShowUpload = true
    },
    cancelHandle() {
      this.isShowUpload = false
    },
    async confirmHandle({file, date}) {
      let month = date.getMonth() + 1
      month = month >= 10 ? month : '0'+month
      const data = {
        upfile: file,
        month:`${date.getFullYear()}${month}`,
      }
      const result = await QualityUpload(data)
      if(result.data.res==0) {
        this.isShowUpload = false
        this.$message.success('上传成功')
      }
    },
    async getData() {
      const list = storage.getItem(storage.key.chScheduleList)
      const schedule = list[this.currentShift].uuid
      let month = this.currentMonth + 1
      month = month<10?('0'+month):month
      const body = {month:`${this.year}${month}`,schedule}
      const result = await QualityData(body)
      const {status, data} = result
      if(status == 200) {
        this.tableHeaders = data.data.shift()
        let array = []
        data.data.map((item)=>{
          let dict = {}
          item.map((item,index)=>{
            const key = index+''
            dict[key] = item
          })
          array.push(dict)
        })
        this.tableData = array
      } 
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page
    padding 20px 20px 142px 20px
    .input-content
      // height 34px
      display flex
      flex-direction row-reverse
      .header-button
        width 108px
        // height 34px
        background-color #1E9AFF
        color #fff
        margin-left 20px
    .header-content
      padding 25px 20px 25px 20px
      margin-top 20px
      border-radius 8px
      background-color #303142
      .main-button
        // width 68px
        padding 10px 20px 10px 20px
        background-color #ffffff00
        color #fff
        border-color #1E9AFF
        margin-right 20px
        font-size 16px
        margin-top 20px
      .row-title
        color #fff
        margin-right 110px
        font-size 16px
      .row-content
        display flex
        flex-direction row
        .table-row
          // margin-top 20px
          // width 1400px
      .data-picker
        width 120px
        min-width 120px
        margin-right 20px
        margin-top 20px
  .content
    padding 25px 20px 25px 20px
    display flex
    flex-direction row
    overflow-x scroll
    margin-top 40px
    border-radius 8px
    background-color #303142
    padding-bottom 20px
  .table-content
    border-radius 8px
    background-color #303142
    height 588px
    padding-bottom 20px
  
</style>

<style lang="stylus">
  ::-webkit-scrollbar
    width 10px
    height 10px
    display flex
    background-color #303142
  ::-webkit-scrollbar-thumb 
    background-color #202334
    border-radius 6px
</style>









