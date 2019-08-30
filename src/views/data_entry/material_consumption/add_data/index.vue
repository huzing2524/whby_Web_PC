<!-- 物料消耗=>添加数据 -->
<template lang="pug">
  .page
    BreadCrumb(:breadcrumbList="breadcrumbList" class="breadcrumb")
    .table
      .table_item_date
        p 详细日期
        el-date-picker(v-model="todayDate" @change="selectTime" value-format="yyyy-MM-dd"  type="date" format="yyyy年MM月dd日" class="data-picker")
      .table_item_chooice
        .checkbox
          span 班次
          el-checkbox-group(v-model="schedule" class="check-box" :max=1)
            el-checkbox(v-for="item in scheduleList"  :key="item.name"  :label="item.name" class="item-box")
        .deivder_line
      .table_item_chooice
        .checkbox
          span 上班时间
          el-checkbox-group(v-model="work_time" class="check-box" :max=1)
            el-checkbox(label="早" class="item-box")
            el-checkbox(label="中" class="item-box")
            el-checkbox(label="晚" class="item-box")
        .deivder_line
      .table_item
        .content
          .tip 燃料 (T/m³)
          input(placeholder="填写燃料"
            v-model="intent.fuel" type="number")
        .divider_line
      .table_item
        .content
          .tip 胶水 (T/m³)
          input(placeholder="填写胶水"
            v-model="intent.glue" type="number")
        .divider_line
      .table_item
        .content
          .tip 防水剂 (KG/m³)
          input(placeholder="填写防水剂"
            v-model="intent.waterproofing_agent" type="number")
        .divider_line
      .table_item
        .content
          .tip 电耗 (KWH/m³)
          input(placeholder="填写电耗"
            v-model="intent.power_consumption" type="number")
        .divider_line
      .table_item
        .content
          .tip 砂带 (元/m³)
          input(placeholder="填写砂带"
            v-model="intent.abrasive_belt" type="number")
        .divider_line
      .table_item
        .content
          .tip 削片刀片 (元/m³)
          input(placeholder="填写削片刀片"
            v-model="intent.shaving_blade" type="number")
        .divider_line
    .operator
      el-button(@click="clickCancel" type="primary" class="bottom-button_cancel") 取消
      el-button(@click="clickSave" type="primary" class="bottom-button_save") 保存
</template>

<script>
  import BreadCrumb from '_components/breadcrumb'
  import Global from '_api/global_variable'
  import { MaterialCosumption } from '_api/entry_data'

  export default {
    components: {
      BreadCrumb,
    },
    data() {
      return {
        todayDate: '', // 必须是这种格式控件才能初始化
        schedule: [],
        currentScheduleId: '',
        scheduleList: [],
        work_time: ['早'],
        isShowUpload: false,
        breadcrumbList: [
          {
            path: '/data_entry/material_consumption',
            name: '物料消耗',
          },
          {
            path: '/data_entry/material_consumption_table/add_data',
            name: this.queryType() === 'add' ? '添加数据' : '修改数据',
          },
        ],
        intent: {
          uuid: '',
          date: '',
          schedule: [],
          work_time: [],
          working_time: [], // 早: 0, 中: 1, 晚: 2
          fuel: 0,
          glue: 0,
          waterproofing_agent: 0,
          power_consumption: 0,
          abrasive_belt: 0,
          shaving_blade: 0,
          fixed: '修改',
        },
        focusStyle: {
          backgroundColor: '#1E9AFF',
        },
      }
    },
    computed: {},
    mounted() {
      this.initData()
    },
    methods: {
      queryType() {
        return null === this.$route.query.type ? '' : this.$route.query.type
      },
      // 把上一页传过来的数据拿到
      initData() {
        // 获取上一个页面缓存的某一行的编辑数据
        this.intent = Global.getPressRunBean()
        // 获取上一个页面缓存的班次数据
        this.scheduleList = Global.getScheduleArray()
        if (this.queryType() === 'modify') {
          // 看那边后台和传过来什么格式 必须是2019-6-29/2019-06-29这种格式。
          this.todayDate = this.intent.date
          // 设置那边传过来的班次名字
          this.schedule.push(this.intent.schedule)
          switch (this.intent.work_time) {
            case '早':
              this.work_time = ['早']
              break
            case '中':
              this.work_time = ['中']
              break
            case '晚':
              this.work_time = ['晚']
              break
          }
        } else {
          // 设置今天的日期
          this.todayDate = this.getTodayTime()
          if (null != this.scheduleList && this.scheduleList.length != 0) {
            this.schedule.push(this.scheduleList[0].name)
          }
        }
      },
      // 根据班次名字获取班次id
      resetScheduleId() {
        console.log(this.schedule[0])
        if (null != this.scheduleList && this.scheduleList.length !== 0) {
          this.scheduleList.forEach((item) => {
            if (item.name === this.schedule[0]) {
              console.log(item.uuid)
              this.currentScheduleId = item.uuid
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
        if (this.checkState() !== false) {
          this.resetScheduleId()
          if (this.queryType() === 'add') {
            this.addData()
          } else if (this.queryType() === 'modify') {
            this.modifyData()
          }
        }
      },
      // 检查是否有数据没写的
      checkState() {
        if (this.schedule.length === 0) {
          alert('班次不能为空')
          return false
        }
        if (
          isNaN(this.intent.power_consumption) ||
          this.intent.power_consumption === ''
        ) {
          alert('电耗不能为空')
          return false
        } else {
          return true
        }
      },
      // 添加一条数据到服务器
      addData() {
        let body = new Object()

        body.date = this.todayDate
        body.schedule = this.currentScheduleId
        body.working_time = this.work_time[0]
        body.fuel = parseFloat(this.intent.fuel)
        body.glue = parseFloat(this.intent.glue)
        body.waterproofing_agent = parseFloat(this.intent.waterproofing_agent)
        body.power_consumption = parseFloat(this.intent.power_consumption)
        body.abrasive_belt = parseFloat(this.intent.abrasive_belt)
        body.shaving_blade = parseFloat(this.intent.shaving_blade)

        MaterialCosumption('post', body)
          .then((res) => {
            console.log(res)
            if (res.data.res == 0) {
              alert('保存成功')
              this.$router.go(-1)
            } else if (res.data.res == 1) {
              alert(res.data.errmsg)
            }
          })
          .catch((e) => {
            alert('保存出错')
            console.log(e)
          })
      },
      // 修改数据并保存到服务器
      modifyData() {
        let body = { ...this.intent }
        body.date = this.todayDate
        body.schedule = this.currentScheduleId
        body.working_time = this.work_time[0]

        body.fuel = parseFloat(this.intent.fuel)
        body.glue = parseFloat(this.intent.glue)
        body.waterproofing_agent = parseFloat(this.intent.waterproofing_agent)
        body.power_consumption = parseFloat(this.intent.power_consumption)
        body.abrasive_belt = parseFloat(this.intent.abrasive_belt)
        body.shaving_blade = parseFloat(this.intent.shaving_blade)

        MaterialCosumption('put', body)
          .then((res) => {
            console.log(res)
            if (res.data.res == 0) {
              alert('保存成功')
              this.$router.go(-1)
            } else if (res.data.res == 1) {
              alert(res.data.errmsg)
            }
          })
          .catch((e) => {
            console.log(e)
            alert('保存出错')
          })
        Global.clearPressRunBean()
      },
      cancelHandle() {
        this.isShowUpload = false
      },
      confirmHandle() {},
      selectTime() {
        if (this.queryType() === 'modify') {
          this.todayDate = this.intent.date
          alert('日期不能修改')
        }
      },
      getTodayTime() {
        let date = new Date()
        let seperator1 = '-'
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
      },
    },
  }
</script>

<style lang="stylus" scoped>
  lineStyle()
    wh(100%, 2px)
    bg(#454A5A)

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
      background rgba(48, 49, 66, 1)
      border-radius 8px
      margin 20px 116px 20px
      padding 20px
      wh(auto, auto)

      .table_item_date
        display flex
        flex-direction row
        align-items center

        p
          fsc(16px, #FFFFFF)
          titleTipStyle()

        .data-picker
          width 170px
          background rgba(48, 49, 66, 1)
          color rgba(48, 49, 66, 1)

      .table_item_chooice
        display flex
        flex-direction column
        margin-top 20px

        .checkbox
          display flex
          flex-direction row
          align-items center

          span
            fsc(16px, #FFFFFF)
            titleTipStyle()

          .item-box
            width auto
            margin-right 20px

        .divider_line
          lineStyle()

      .table_item
        display flex
        flex-direction column

        .content
          display flex
          flex-direction row
          margin-left 40px

          .tip
            margin-top 20px
            fsc(16px, #FFFFFF)
            width 120px
            align-items right
            margin-right 40px

          input
            padding-top 20px
            padding-bottom 20px
            fsc(16px, #5C6466)
            bg(#303142)

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









