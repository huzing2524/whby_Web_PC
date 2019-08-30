<template lang="pug">
  .ts
    .ts_header_row
      .ts_header_row_label
        span(class="ts_header_label") {{`日期：${data.date}`}}
        span(class="ts_header_label") {{`班次：${data.schedule}`}}
        span(class="ts_header_label") {{`上班时间：${data.working_time}`}}
        span(class="ts_header_label") {{`记录员：${data.recorder}`}}
        span(class="ts_header_label") {{`审核元：${data.reviewer}`}}
      .ts_header_row_button
        el-button(@click="changeClick" type="primary" class="ts_header_button") 修改
        ExportButton(class="ts_export_button" :fileIds="tableIds" :fileNames="['砂光','堆砌']")
      
    .ts_content
      .ts_content_table
        el-table(:id="tableIds[0]" 
          style="width:864px;border: 1px solid #454A5A;background-color:#454A5A"
          :data="data.sanding" 
          :header-cell-style="headerStyle" 
          :span-method="arraySpanMethod"
          :border="false"
          :cell-style="cellStyle")
          el-table-column(label="砂光" flex=1)
            el-table-column(label="堆垛号" flex=1 prop="stack_number")
            el-table-column(label="等级" flex=1 prop='class')
            el-table-column(label="规格(mm)" flex=1)
              el-table-column(label="长" flex=1 prop='specification1')
              el-table-column(label="宽" flex=1 prop='specification2')
              el-table-column(label="高" flex=1 prop='specification3')
            el-table-column(label="数量 (张)" flex=1 prop='count')
            el-table-column(label="砂光量(m³)" flex=1 prop='sanding_amount')
      .ts_content_table
        el-table(:id="tableIds[1]" 
          :data="data.sawing" 
          :header-cell-style="headerStyle" 
          style="width:864px;border: 1px solid #454A5A;background-color:#454A5A"
          :span-method="arraySpanMethod"
          :cell-style="cellStyle")
          el-table-column(label="锯切" flex=1)
            el-table-column(label="堆垛号" flex=1 prop='stack_number')
            el-table-column(label="等级" flex=1 prop='class')
            el-table-column(label="规格(mm)" flex=1)
              el-table-column(label="长" flex=1 prop='specification1')
              el-table-column(label="宽" flex=1 prop='specification2')
              el-table-column(label="高" flex=1 prop='specification3')
            el-table-column(label="数量 (张)" flex=1 prop='count')
            el-table-column(label="砂光量(m³)" flex=1 prop='sanding_amount')
      
</template>


<script>
import ExportButton from '_components/export_button'
export default {
  props:['tableIds','data'],
  components: {
    ExportButton
  },
  data() {
    return {
      tableHeaders:['堆垛号','等级','规格(mm)','数量 (张)','砂光量(m³)'],
      // tableData:[{'0':'1',"1":'2','2':'3','3':'4','4':'5','5':'6','6':'7'},
      // {'0':'1',"1":'2','2':'3','3':'4','4':'5','5':'6','6':'7'},
      // {'0':'合计',"1":'-','2':'0'}],
    }
  },
  methods: {
    headerStyle() {
      return 'background-color:#303142;color:#fff;border: 1px solid #454A5A;text-align:center'
    },
    cellStyle() {
      return "color:#fff;background-color:#303142;border: 1px solid #454A5A;text-align:center;height:59px"
    },
    arraySpanMethod({rowIndex, columnIndex }) {
      if(rowIndex==(this.data.length-1)&&columnIndex==0) {
        return [1,5]
      }
    },
    changeClick() {
      this.$emit('changeClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ts
    padding 25px 20px 25px 20px
    margin-top 30px
    border-radius 8px
    background-color #303142 
    text-align center
    &_header_row
      background-color #303142
      display flex
      flex-direction row
      align-items center
      &_label
        display flex
        flex-direction row
        flex 1
      &_buttonn
        display flex
        flex-direction row-reverse
        background-color yellow
    &_content
      margin-top 40px
      display flex
      overflow-x scroll
      flex-direction row
      padding-bottom 25px
      &_table
        width 864px
        margin-right 20px
  .ts_header_label
    font-size 16px
    color #fff
    margin-right 44px
  .ts_export_button
    background-color #ffffff00
    color #1E9AFF
  .ts_header_button
    background-color #ffffff00
    color #1E9AFF
    width 108px
    // height 34px
    
</style>

<style lang="stylus">
  ::-webkit-scrollbar
    width 2px
    height 10px
    display flex
  ::-webkit-scrollbar-thumb 
    background-color #202334
    border-radius 6px
</style>






