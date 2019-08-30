<!--压机操作记录-->
<template lang="pug">
  .page
    BreadCrumb(:breadcrumbList="breadcrumbList" class="breadcrumb")
    .input-content
      el-button(@click="clickAdd" type="primary" class="header-button") 添加数据
    .header-content
      el-row(class="table-row")
        span(class="row-title") 班次
        el-button(v-for="item,index in scheduleList" class="row-button" :key="index" :style="index==currentShift?{backgroundColor:'#1E9AFF'}:{}" @click="clickShift(index)" type="primary" plain class="main-button") {{item.name}}
      MonthSelect(:dataList="months" @onItemClick="onMonthChooice" @onYearChooice="onYearChooice" :currentYear="year" :currentMonth="currentMonth")
    .table-list(v-for="(bean,index) in beanList")
      .table-title
        .table-title-tip
          .table-tip-item
            span 日期：
            span {{bean.date}}
          .table-tip-item
            span 班次：
            span {{bean.schedule}}
          .table-tip-item
            span 上班时间：
            span {{bean.working_time}}
          .table-tip-item
            span 记录员：
            span {{bean.operator}}
          .table-tip-item
            span 审核人：
            span {{bean.reviewer}}
        .table-title-operator
          ExportButton(class="header-button" :fileIds="[getTableId(index)]" :fileNames="['压机操作记录'+(index+1)]")
          el-button(@click="modifyTableRow(bean)" type="primary" class="operation-button") 修改
      .table-content
        el-table(:data="bean.data" :id="getTableId(index)" class="table" :header-cell-style="headerCellStyle" table-border-color="yellow" :cell-style="cellStyle")
          el-table-column(prop="time" label="时间" width="149px")
          el-table-column(prop="content" label="内容" flex="1")
    .table_null(v-if="beanList === null || beanList.length === 0")
      span 暂无数据
</template>

<script>
  import BreadCrumb from '_components/breadcrumb'
  import Global from '_api/global_variable'
  import { ScheduleMain } from '_api/basic_data'
  import {PressOperation} from '_api/entry_data'
  import ExportButton from '_components/export_button'
  import MonthSelect from '_components/date_select'

  export default {
    components :{
      BreadCrumb,
      ExportButton,
      MonthSelect
    },
    data() {
      return {
        isShowUpload: false,
        breadcrumbList: [
          {
            path: '/data_entry/record_press_operation',
            name: '压机操作记录',
          },
        ],
        year: '2019',
        // 今天的日期对象，在initLocalData初始化
        todayDate: '2019-07-11',
        // 班次相关
        currentShift:0,//班次 012=abc
        currentScheduleId:'',// 当前选中的班次id,第一次进来设置为scheduleList的第1个数据的uuid，这个操作在getScheduleMain()中执行
        scheduleList:[],// 后台返回的班次数据
        // 月份相关
        months:[],
        currentMonth: 7,  // 月份
        // 后台返回的表格数据demo
        beanList:[
          {
            "date": "2019-06-24",
            "schedule": "A班",
            "working_time": "早",//早: 0, 中: 1, 晚: 2 ,建议后台统一
            "operator": "刘平",
            "reviewer": "文平",
            "data": [
              {
                "time": "8:00",
                "content": "接班继续生产"
              },
              {
                "time": "9:00",
                "content": "接班继续生产185板"
              },
              {
                "time": "9:59",
                "content": "nose open （装铺） 停机清吹铺装 ---- 生产"
              }
             ]
          },
          {
            "date": "2019-06-24",
            "schedule": "A班",
            "working_time": "早",//早: 0, 中: 1, 晚: 2 ,建议后台统一
            "operator": "刘平",
            "reviewer": "文平",
            "data": [
              {
                "time": "8:00",
                "content": "接班继续生产"
              },
              {
                "time": "9:00",
                "content": "接班继续生产185板"
              },
              {
                "time": "9:59",
                "content": "nose open （装铺） 停机清吹铺装 ---- 生产"
              }
            ]
          }
        ],
        focusStyle:{
          backgroundColor:'#1E9AFF'
        }
      }
    },
    created() {
      // html渲染前
      this.initLocalData()
    },
    mounted() {
      this.getScheduleMain()
      // this.initData();
    },
    computed: {

    },
    methods: {
      // 设置头部标题单元格的样式
      headerCellStyle() {
        return 'background-color:#303142;color:#fff;border: 1px solid #454A5A;text-align:center'
      },
      // 设置单元格的样式
      cellStyle() {
        return "color:#fff;background-color:#303142;border: 1px solid #454A5A;text-align:center"
      },
      // 更改班次，index+1是真正的月份
      clickShift(index) {
        this.currentShift = index
        // 更新班次ID
        this.resetScheduleId()
        this.initData()
      },
      // 根据班次名字获取班次id
      resetScheduleId() {
        if(null != this.scheduleList && this.scheduleList.length !== 0) {
          this.currentScheduleId = this.scheduleList[this.currentShift].uuid
        } else {
          this.currentScheduleId = ''
        }
      },
      // 年份选择器回调监听
      onYearChooice(year) {
        this.year = year
        this.initMonthData()
        this.initData();
      },
      // 月份选择器回调监听
      onMonthChooice(index) {
        this.currentMonth = index
        this.initData()
      },
      getTableId(index) {
        return "press_operation_table_" + index
      },
      // 跳转增加数据界面
      clickAdd() {
        Global.clearPressRunBean()
        Global.setScheduleArray(this.scheduleList)
        this.$router.push(`/data_entry/record_press_operation/add_data?type=add`)
      },
      // 跳转修改某一行数据
      modifyTableRow(bean) {
        Global.setPressRunBean(bean)
        Global.setScheduleArray(this.scheduleList)
        this.$router.push(`/data_entry/record_press_operation/add_data?type=modify`)
      },
      clickEmport(bean) {
        console.log(bean)
        this.isShowUpload = true
      },
      cancelHandle() {
        this.isShowUpload = false
      },
      confirmHandle() {

      },
      // 初始化本地数据
      initLocalData() {
        this.todayDate = new Date()
        // 设置默认年份
        this.year = this.todayDate.getFullYear().toString()
        // 设置默认月份
        this.currentMonth = this.todayDate.getMonth()
        this.initMonthData()
      },
      // 根据现在的年份和月份初始化月份数据
      initMonthData() {
        if(this.todayDate.getFullYear() == this.year) {
            // 要重置月份选择器的月份数组
            this.months.length = 0
            // 算法核心：假设今天是2019-07-10，那初始化的时候月份是[1，2...7]，用户切到2018年，月份会改成[1,2,...12],并且选了8月;最后用户再切回到2019年，要把之前选择的8月份改成当前的月份7月，生成的月份数组也要恢复。
            // 如果之前选中的月份大于今天日期中的月份，则把选中的月份重置为日期中的月份
            if(this.todayDate.getMonth() < this.currentMonth) {
              this.currentMonth = this.todayDate.getMonth()
            }
          // 这里的currentMonth比真正的月份小1的，因为Date().getFullYear()就小了1，而且months[]的索引也是小1的。
          // 如果是年份是今天日期中的年份，生成的月份数组都是[1，...今天日期中的月份]
          for (let i = 0; i <= this.todayDate.getMonth(); i++) {
            this.months.push(i+1)
          }
        } else {
          this.months = [1,2,3,4,5,6,7,8,9,10,11,12]
        }
      },
      // 获取班次的基础数据，成功后再调用获取表格的所有数据
      getScheduleMain() {
        ScheduleMain().then((res) => {
          if(Array.isArray(res.data) && res.data.length > 0) {
            this.scheduleList = res.data.reverse()
            this.resetScheduleId()
            this.initData();
          }
        }).catch(() => {
          this.initData();
        })
      },
      // 获取表格数据
      initData() {
        let body = new Object()
        let month = this.currentMonth + 1
        body.date = this.year + "-" + ((month < 10) ? ("0" + month) : month)
        body.schedule = this.currentScheduleId
        console.log(body)
        PressOperation('get',body).then(res => {
          if(res.status == 200) {
            this.beanList = res.data
          } else{
            console.log(res)
            this.tableData = []
          }
        }).catch((e)=>{
          console.log(e)
        })
      },


    }
  }
</script>

<style lang="stylus" scoped>
  row()
    display flex
    flex-direction row

  .page
    padding 20px 20px 62px 20px
    background #1C1E24
    .breadcrumb
      margin-left 116px
    .input-content
      height 34px
      display flex
      flex-direction row-reverse
      margin-right 116px
      .header-button
        width 108px
        height 34px
        background-color #1E9AFF
        color #fff
        margin-left 20px
    .header-content
      margin 20px 116px 10px
      padding 25px 20px 25px 20px
      border-radius 8px
      background-color #303142
      .main-button
        width auto
        background-color #ffffff00
        color #fff
        border-color #1E9AFF
        margin-right 20px
        margin-bottom 10px
        font-size 16px
      .row-title
        color #fff
        margin-right 110px
        font-size 16px
      .table-row
        margin-top 20px
        .row-button
          width auto
          margin-right 20px
    .table-list
      overflow-y scroll
      margin-left 116px
      margin-right 116px
      margin-top 20px
      display flex
      flex-direction column
      background-color #303142
      .table-title
        row()
        margin 20px 20px 0px 20px
        .table-title-tip
          row()
          .table-tip-item
            row()
            margin-right 44px
            span
              fsc(16px, #FFFFFF)
              line-height 20px
              margin-top 14px
        .table-title-operator
          height 34px
          display flex
          flex 1
          flex-direction row-reverse
          .operation-button
            width 108px
            height 34px
            background-color #1E9AFF
            color #fff
            margin-left 20px
      .table-content
        border-radius 8px
        margin 20px 20px 0px 20px
    .table_null
      width 100%
      height 60px
      margin-left 116px
      margin-right 116px
      border-radius 8px
      display: flex;
      justify-content:center;
      bgf()
      align-items center
      text-align center
      vertical-align middle
      align-items:Center;
      span
        color #000000

</style>

<style lang="stylus">
  .el-table--border
    border none
  .el-table--group
    border none
</style>









