<template lang="pug">
    .page.w1200.mgauto
      Breadcrumb(:breadcrumbList="breadcrumbList")
      .content
        el-table(
          :data="tableData" 
          :header-cell-style="headerStyle" 
          style="width:864px;"
          :span-method="arraySpanMethod"
          :cell-style="cellStyle")
          el-table-column(label="锯切" flex=1)
            el-table-column(label="堆垛号" flex=1 prop='stack_number')
              template(slot-scope="scope")
                input(v-show="scope.$index!=tableData.length-1" placeholder="请填写" class="input" v-model="scope.row['stack_number']")
                el-button(v-show="scope.$index==tableData.length-1" @click="clickAdd(scope.$index, scope.row)" class="add") 添加一行
            el-table-column(label="等级" flex=1 prop='class')
              template(slot-scope="scope")
                input(placeholder="请填写" class="input" v-model="scope.row['class']")
            el-table-column(label="规格(mm)" flex=1)
              el-table-column(label="长" flex=1 prop='specification1')
                template(slot-scope="scope")
                  input(placeholder="请填写" class="input" v-model="scope.row['specification1']")
              el-table-column(label="宽" flex=1 prop='specification2')
                template(slot-scope="scope")
                  input(placeholder="请填写" class="input" v-model="scope.row['specification2']")
              el-table-column(label="高" flex=1 prop='specification3')
                template(slot-scope="scope")
                  input(placeholder="请填写" class="input" v-model="scope.row['specification3']")
            el-table-column(label="数量 (张)" flex=1 prop='count')
              template(slot-scope="scope")
                input(placeholder="请填写" class="input" v-model="scope.row['count']")
            el-table-column(label="砂光量(m³)" flex=1 prop='sanding_amount')
              template(slot-scope="scope")
                input(placeholder="请填写" class="input" v-model="scope.row['sanding_amount']")
            el-table-column(label="操作" flex=1 prop='7')
              template(slot-scope="scope")
                el-button(@click="clickDelete(scope.$index, scope.row)" class="delete") 删除
        .content_row
          span(class="label") 合计数量(张)
          input(placeholder="填写数量" v-model="totalCount" class="row_input")
        .content_row
          span(class="label") 合计砂光量(m³)
          input(placeholder="填写砂光量" v-model="sandingCount" class="row_input")
      .bottom_button
        el-button(@click="cancelHandle" size="large" type="primary" primary class="cancel") 上一步
        el-button(@click="confirmHandle" size="large" type="primary" primary class="next") 保存
</template>

<script>
import Breadcrumb from '_components/breadcrumb'
import { AddSanding, ChangeSanding } from '_api/entry_data'
import * as storage from '_common/session_storage'
export default {
  components: {
    Breadcrumb,
  },
  data() {
    const sandingData = storage.getItem(storage.key.chSandingData)
    const sawing = sandingData.sawing || [{}]
    const editType = storage.getItem(storage.key.chEditType)
    return {
      breadcrumbList: [{name:'砂光锯切表',path:'/data_entry/record_sanding_cut'}],
      tableHeaders:['堆垛号','等级','规格(mm)','数量 (张)','砂光量(m³)'],
      isPushed: false,
      sandingCount: '',
      totalCount: '',
      sandingData: sandingData,
      tableData: sawing,
      editType
    }
  },
  methods: {
    headerStyle() {
      return 'background-color:#303142;color:#fff;border-width:1px;border-color:#454A5A;text-align:center'
    },
    cellStyle() {
      return "color:#fff;background-color:#303142;border-width:1px;border-color:#454A5A;text-align:center;height:59px"
    },
    arraySpanMethod({ rowIndex, columnIndex }) {
      if(rowIndex==(this.tableData.length-1)&&columnIndex==0) {
        return [1,8]
      }
    },
    clickDelete(index) {
      this.tableData.splice(index,1)
    },
    clickAdd() {
      this.tableData.splice(this.tableData.length-1,0,{})
    },
    cancelHandle() {
      this.$router.go(-1)
    },
    async confirmHandle() {
      // 保存页面数据
      this.sandingData.sawing = this.tableData
      storage.setItem(storage.key.chSandingData, this.sandingData)
      // 发送请求
      const { date, schedule, working_time, recorder, reviewer, sanding, sawing, uuid } = this.sandingData
      const sche = storage.getScheduleUuid(schedule)
      const sandingArray =  sanding.slice(0,sanding.length-1)
      const sawingArray = sawing.slice(0,sawing.length-1)
      const newDate = new Date(date)
      let month = newDate.getMonth()+1
      const yearMonth = `${newDate.getFullYear()}-${month>9?month:('0'+month)}-${newDate.getDate()}`
      const params = {uuid, date:yearMonth, schedule:sche, working_time, recorder, reviewer, sanding: sandingArray, sawing: sawingArray }
      let result
      if(this.editType == 0) {
        result = await AddSanding(params)
      } else {
        result = await ChangeSanding(params)
      }
      const { data} = result
      if(data.res==0) {
        alert("操作成功")
        storage.clear()
        this.$router.go(-3)
      } else {
        alert("操作失败")
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page
    padding-bottom 340px
    .content
      background-color #303142
      padding 40px 20px 20px 30px
      border-radius 8px
      &_row
        width 1160px
        border-bottom 1px solid #454A5A
        height 68px
        display flex
        flex-direction row
        align-items center
        .label
          color #fff
          text-align right
          width 120px
          font-size 16px
          margin-right 40px
        .input
          background-color #ffffff00
          color #fff
          height 68px
          font-size 16px
    .delete
      color #F7517F
      background-color #ffffff00
      border-color #ffffff00
    .input
      background-color #ffffff00
      text-align center
      color #fff
      height 40px
      width 80px
    .row_input
      background-color #ffffff00
      color #fff
      height 40px
      width 900px
      font-size 16px
    .add
      color #1E9AFF
      text-align center
      background-color #ffffff00
      border-color #ffffff00
      width 800px
    .bottom_button
      margin-top 20px
      display flex
      flex-direction row
      align-items center
      .cancel
        background-color #ffffff
        height 34px
        width 108px
        border-color #ffffff
        margin-right 12px
        color #1E9AFF
      .next
        height 34px
        width 108px
</style>


