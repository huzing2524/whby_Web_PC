<!-- 停机记录=>添加数据 -->
<template lang="pug">
  .page
    BreadCrumb(:breadcrumbList="breadcrumbList" class="breadcrumb")
    .table
      .table_item_date
        p 详细日期
        el-date-picker(v-model="todayDate" @change="selectTime" value-format="yyyy-MM-dd" :clearable="false" type="date" format="yyyy年MM月dd日" class="data-picker")
      .table_item_chooice
        .checkbox
          span 班次
          el-checkbox-group(v-model="schedule" class="check-box" :max=1)
            el-checkbox(v-for="item in scheduleList" :key="item.name"  :label="item.name" class="item-box")
        .deivder_line
      .table_item
        .content
          .tip 停机总时长 (min)
          input(type="number" placeholder="填写停机总时长"
            v-model="intent.total_time")
        .divider_line
      .table_item
        .content
          .tip 设备 (电气) (min)
          input(type="number" placeholder="填写设备（电气）"
            v-model="intent.elec_device")
        .divider_line
      .table_item
        .content
          .tip 设备 (机械) (min)
          input(type="number" placeholder="填写设备（机械）"
            v-model="intent.mach_device")
        .divider_line
      .table_item
        .content
          .tip 生产 (min)
          input(type="number" placeholder="填写生产"
            v-model="intent.product")
        .divider_line
      .table_item
        .content
          .tip 金属报警 (min)
          input(type="number" placeholder="填写金属报警"
            v-model="intent.metal_alarm")
        .divider_line
      .table_item
        .content
          .tip 计划检修 (min)
          input(type="number" placeholder="填写计划检修"
            v-model="intent.plan_check")
        .divider_line
      .table_item
        .content
          .tip 外部停电 (min)
          input(type="number" placeholder="填写外部停电"
            v-model="intent.out_poweroff")
        .divider_line
      .table_item
        .content
          .tip 外包 (min)
          input(type="number" placeholder="填写外包"
            v-model="intent.outsourcing")
        .divider_line
      .table_item
        .content
          .tip 消防 (min)
          input(type="number" placeholder="填写消防"
            v-model="intent.prevent_fire")
        .divider_line
      .table_item
        .content
          .tip 其他 (min)
          input(type="number" placeholder="填写其他"
            v-model="intent.other")
        .divider_line
    .operator
      el-button(@click="clickCancel" type="primary" class="bottom-button_cancel") 取消
      el-button(@click="clickSave" type="primary" class="bottom-button_save") 保存
</template>

<script>
  import BreadCrumb from '_components/breadcrumb'
  import Global from '_api/global_variable'
  import {ShoutDownRecord} from '_api/entry_data'


  export default {
    components :{
      BreadCrumb,
    },
    data() {
      return {
        // title: '',
        todayDate: "2019-06-26",// 必须是这种格式控件才能初始化
        schedule:[],
        currentScheduleId: "",
        scheduleList:[],
        isShowUpload: false,
        breadcrumbList: [
          {
            path: '/data_entry/record_shutdown',
            name: '停机记录',
          },
          {
            path: '/data_entry/record_shutdown/add_data',
            name: this.queryType() === 'add' ? '添加数据' : '修改数据',
          }
        ],
        intent:{
          uuid: "",
          date: "",
          schedule: [],// 班次 A
          total_time: "",// 停机总时长(number)
          elec_device: "",// 设备电气(number)
          mach_device: "",// 设备机械（number）
          product: "", // 生产(number)
          metal_alarm: "", // 金属报警
          plan_check: "", // 计划检修
          out_poweroff: "", // 外部停电
          outsourcing: "",// 外包
          prevent_fire: "", // 消防
          other: "", // 其他
          fixed: ""
        },
        focusStyle:{
          backgroundColor:'#1E9AFF'
        }
      }
    },
    computed: {

    },
    mounted() {
      this.title = this.queryType() === 'add' ? '添加数据' : '修改数据',
      this.initData()
    },
    methods: {
      queryType() {
        return (null === this.$route.query.type) ? '' : this.$route.query.type
      },
      // 把上一页传过来的数据拿到
      initData() {
        // 获取上一个页面缓存的某一行的编辑数据
        this.intent = Global.getPressRunBean();
        // 获取上一个页面缓存的班次数据
        this.scheduleList = Global.getScheduleArray()
        if(this.queryType() === 'modify') {
          // 看那边后台和传过来什么格式 必须是2019-6-29/2019-06-29这种格式。
          this.todayDate = this.intent.date
          // 设置那边传过来的班次名字
          this.schedule.push(this.intent.schedule)
        } else {
          // 设置今天的日期
          this.todayDate = this.getTodayTime();
          if(null != this.scheduleList && this.scheduleList.length != 0) {
            this.schedule.push(this.scheduleList[0].name)
          }
        }
      },
      // 根据班次名字获取班次id
      resetScheduleId() {
        console.log(this.schedule[0])
        if(null != this.scheduleList && this.scheduleList.length !== 0) {
          this.scheduleList.forEach(item => {
            if(item.name === this.schedule[0]) {
              console.log(item.uuid)
              this.currentScheduleId  = item.uuid
            }
          })
        } else {
          this.currentScheduleId = ''
        }
      },
      clickCancel() {
        this.$router.go(-1)
      },
      clickSave() {
        if(this.checkState() !== false) {
          this.resetScheduleId()
          if(this.queryType() === 'add') {
            this.addData();
          } else if(this.queryType() === 'modify') {
            this.modifyData();
          }
        }
      },
      // 检查是否有数据没写的
      checkState() {
        if(this.schedule.length === 0) {
          alert("班次不能为空")
          return false
        }
        // if(isNaN(this.intent.total_time) || this.intent.total_time === '') {
        //   alert("运行总时长不能为空")
        //   return false
        // } else {
        //   return true
        // }
      },
      // 添加一条数据到服务器
      addData() {
        let body = new Object()
        body.date = this.todayDate
        body.schedule = this.currentScheduleId
        body.total_time = parseFloat(this.intent.total_time)
        body.elec_device = parseFloat(this.intent.elec_device)
        body.mach_device = parseFloat(this.intent.mach_device)
        body.product = parseFloat(this.intent.product)
        body.metal_alarm = parseFloat(this.intent.metal_alarm)
        body.plan_check = parseFloat(this.intent.plan_check)
        body.out_poweroff = parseFloat(this.intent.out_poweroff)
        body.outsourcing = parseFloat(this.intent.outsourcing)
        body.prevent_fire = parseFloat(this.intent.prevent_fire)
        body.other = parseFloat(this.intent.other)
        // 参数会不会是{body}   ???
        ShoutDownRecord('post', body).then(res => {
          console.log(res)
          if(res.data.res == 0) {
            alert("保存成功")
            this.$router.go(-1)
          } else if(res.data.res == 1) {
            alert(res.data.errmsg)
          }
        }).catch((e)=>{
          alert('保存出错')
          console.log(e)
        })
      },
      // 修改数据并保存到服务器
      modifyData() {
        this.intent.schedule = this.currentScheduleId
        this.intent.date = this.todayDate
        this.intent.total_time = parseFloat(this.intent.total_time)
        this.intent.elec_device = parseFloat(this.intent.elec_device)
        this.intent.mach_device = parseFloat(this.intent.mach_device)
        this.intent.product = parseFloat(this.intent.product)
        this.intent.metal_alarm = parseFloat(this.intent.metal_alarm)
        this.intent.plan_check = parseFloat(this.intent.plan_check)
        this.intent.out_poweroff = parseFloat(this.intent.out_poweroff)
        this.intent.outsourcing = parseFloat(this.intent.outsourcing)
        this.intent.prevent_fire = parseFloat(this.intent.prevent_fire)
        this.intent.other = parseFloat(this.intent.other)

        delete this.intent.fixed
        let uuid = this.intent.uuid
        delete this.intent.uuid
        let body = {
          uuid : uuid,
          update  : {...this.intent}
        }
        ShoutDownRecord('put', body).then(res => {
          console.log(res)
          if(res.data.res == 0) {
            alert("保存成功")
            this.$router.go(-1)
          } else if(res.data.res == 1) {
            alert(res.data.errmsg)
          }
        }).catch((e)=>{
          console.log(e)
          alert('保存出错')
        })
        Global.clearPressRunBean()
      },
      cancelHandle() {
        this.isShowUpload = false
      },
      confirmHandle() {

      },
      selectTime(time) {
        console.log(time);
      },
      getTodayTime() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate
      }
    }
  }
</script>

<style lang="stylus" scoped>
  lineStyle()
    wh(100%, 2px);
    bg(#454A5A);

  titleTipStyle()
    width 120px
    margin-left 40px
    margin-right 40px
    align-items right


  .page
    padding 20px 20px 0px 20px
    .breadcrumb
      margin-left 116px
    .table
      display flex
      flex-direction column
      background rgba(48,49,66,1)
      border-radius 8px
      margin 20px 116px 20px
      padding 20px
      wh(auto, auto)
      .table_item_date
        display flex
        flex-direction row
        align-items center
        p
          fsc(16px,#FFFFFF);
          titleTipStyle();
        .data-picker
          width 170px
          background rgba(48,49,66,1)
          color rgba(48,49,66,1)
      .table_item_chooice
        display flex
        flex-direction column
        margin-top 20px
        .checkbox
          display flex
          flex-direction row
          align-items center
          span
            fsc(16px,#FFFFFF);
            titleTipStyle();
          .item-box
            width auto
            margin-right 20px
        .divider_line
          lineStyle();
      .table_item
        display flex
        flex-direction column
        .content
          display flex
          flex-direction row
          margin-left 40px
          .tip
            margin-top 20px
            fsc(16px,#FFFFFF);
            width 120px
            align-items right
            margin-right 40px
          input
            padding-top 20px
            padding-bottom 20px
            fsc(16px, #5C6466);
            bg(#303142);
        .divider_line
          lineStyle()
    .operator
      margin-top 20px
      margin-bottom 20px
      margin-left 116px
      display flex
      flex-direction row
      .bottom-button_cancel
        width 108px
        background-color #CCCCCC
        color #fff
        border-radius 4px
        align-items center
      .bottom-button_save
        width 108px
        background-color #1E9AFF
        color #fff
        margin-left 20px
        border-radius 4px

</style>

<style lang="stylus">
  .el-table--border
    border none
  .el-table--group
    border none
</style>









