<!--停机记录-->
<template lang="pug">
  .page
    BreadCrumb(:breadcrumbList="breadcrumbList" class="breadcrumb")
    .input-content
      el-button(@click="clickAdd" type="primary" class="header-button") 添加数据
      ExportButton(class="header-button" :fileIds="tableIds" :fileNames="['停机记录']")
    .header-content
      el-row(class="table-row")
        span(class="row-title") 班次
        el-button(v-for="item,index in scheduleList"  class="row-button" :key="index" :style="index==currentShift?{backgroundColor:'#1E9AFF'}:{}" @click="clickShift(index)" type="primary" plain class="main-button") {{item.name}}
      MonthSelect(:dataList="months" @onItemClick="onMonthChooice" @onYearChooice="onYearChooice" :currentYear="year" :currentMonth="currentMonth")
    .table-content.el-table--scrollable-y
      el-table(:data="tableData" :id="tableIds[0]"  :header-cell-style="headerCellStyle" table-border-color="yellow" :cell-style="cellStyle" @cell-click="onItemClick" :row-class-name="tableRowClassName")
        el-table-column(prop="date" label="详细日期" flex=1)
        el-table-column(prop="total_time" label="停机总时长" flex=1)
        el-table-column(prop="elec_device" label="设备（电气）" flex=1)
        el-table-column(prop="mach_device" label="设备（机械）" flex=1)
        el-table-column(prop="product" label="生产" flex=1)
        el-table-column(prop="metal_alarm" label="金属报警" flex=1)
        el-table-column(prop="plan_check" label="计划检修" flex=1)
        el-table-column(prop="out_poweroff" label="外部停电" flex=1)
        el-table-column(prop="outsourcing" label="外包" flex=1)
        el-table-column(prop="prevent_fire" label="消防" flex=1)
        el-table-column(prop="other" label="其他" flex=1 )
        el-table-column(prop="fixed" label="修改" flex=1 )

</template>

<script>
  import BreadCrumb from '_components/breadcrumb'
  import Global from '_api/global_variable'
  import { ScheduleMain } from '_api/basic_data'
  import {ShoutDownRecord} from '_api/entry_data'
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
            path: '/data_entry/record_shutdown',
            name: '停机记录',
          },
        ],
        tableIds:['record_shutdown_table'],
        year: '2019',
        // 今天的日期对象，在initLocalData初始化
        todayDate: '2019-07-11',
        currentShift:0,//班次 012=abc
        currentScheduleId:'',// 当前选中的班次id,第一次进来设置为scheduleList的第1个数据的uuid，这个操作在getScheduleMain()中执行
        currentMonth: 7,  // 月份呢
        scheduleList:[],
        months:[],
        tableData:[
          // {
          //   uuid: "0004",
          //   date: "6-09",
          //   schedule: "B班",// 班次 A
          //   total_time: 100,// 停机总时长(number)
          //   elec_device: 12245,// 设备电气(number)
          //   mach_device: 1111,// 设备机械（number）
          //   product:4, // 生产(number)
          //   metal_alarm: 1, // 金属报警
          //   plan_check: 1245, // 计划检修
          //   out_poweroff: 1334, // 外部停电
          //   outsourcing: 1444,// 外包
          //   prevent_fire: 2, // 消防
          //   other: 1, // 其他
          //   fixed: "修改"
          // },
          // {
          //   uuid: "00052",
          //   date: "6-04",
          //   schedule: "B班",// 班次 A
          //   total_time: 101,// 停机总时长(number)
          //   elec_device: 13245,// 设备电气(number)
          //   mach_device: 1331,// 设备机械（number）
          //   product: 2, // 生产(number)
          //   metal_alarm: 0, // 金属报警
          //   plan_check: 15, // 计划检修
          //   out_poweroff: 1, // 外部停电
          //   outsourcing: 2,// 外包
          //   prevent_fire: 2, // 消防
          //   other: 1, // 其他
          //   fixed: "修改"
          // },
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
      headerCellStyle({columnIndex}) {
        if(columnIndex == 11) {
          // 这里显示的是"修改"两个字，效果图上面没有的，设置颜色和底色一样就看不见了。
          return 'background-color:#303142;color:#303142;border-bottom: 1px solid #454A5A'
        } else {
          return 'background-color:#303142;color:#fff;border-bottom: 1px solid #454A5A'
        }
      },
      // 设置单元格的样式
      cellStyle({columnIndex}) {
        if(columnIndex == 11) {
          return "color:#1E9AFF;background-color:#303142;border-bottom: 1px solid #454A5A"
        } else {
          return "color:#fff;background-color:#303142;border-bottom: 1px solid #454A5A"
        }
      },
      // 设置单元格的点击事件
      // onItemClick(row, column, cell, event) {
      onItemClick(row) {// row就是这一行的数据对象。
        row.schedule = this.getScheduleName()
        delete row.index
        Global.setPressRunBean(row)
        Global.setScheduleArray(this.scheduleList)
        this.$router.push(`/data_entry/record_shutdown/add_data?type=modify`)
      },
      // 这个方法会返回rowIndex行号，把行号放到row，最后的目的就是把uuid也存到row这个对象去，点击修改就能拿到了。
      tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
        // 把uuid放到tableData
        row.uuid = this.tableData[rowIndex].uuid
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
      // 根据当前选中的班次index去schhedulelist获取名字
      getScheduleName() {
        if(null != this.scheduleList && this.scheduleList.length !== 0) {
          return this.scheduleList[this.currentShift].name
        } else {
          return ''
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
      // 跳转增加数据界面
      clickAdd() {
        Global.clearPressRunBean();
        Global.setScheduleArray(this.scheduleList)
        this.$router.push(`/data_entry/record_shutdown/add_data?type=add`)
      },
      clickEmport() {
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
        console.log("default month="+this.currentMonth)
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
        console.log("this.year=" + this.year)
        console.log("this.currentMonth=" + this.currentMonth)
        body.date = this.year + "-" + ((month < 10) ? ("0" + month) : month)
        body.schedule = this.currentScheduleId
        console.log(body)
        ShoutDownRecord('get', body).then(res => {
          if(res.status == 200) {
            this.tableData = res.data
            this.handleData()
          } else {
            this.tableData = []
            console.log(res)
          }
        }).catch((e)=>{
          console.log(e)
        })
      },
      // 循环对象数组，每个对象加上一个'fixed'字段，用于画表格。
      handleData() {
        if(null != this.tableData && this.tableData.length !== 0) {
          for(let i = 0;i < this.tableData.length; i++) {
            this.tableData[i].fixed = '修改'
          }
        }
      }


    }
  }
</script>

<style lang="stylus" scoped>
  .page
    padding 20px 20px 0px 20px
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
      margin-left 116px
      margin-right 116px
      padding 25px 20px 25px 20px
      margin-top 20px
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
    .table-content
      margin-left 116px
      margin-right 116px
      margin-bottom 20px
      padding 25px 20px 25px 20px
      margin-top 40px
      overflow-x scroll
      border-radius 8px
      background-color #303142

</style>

<style lang="stylus">
  .el-table--border
    border none
  .el-table--group
    border none
</style>









