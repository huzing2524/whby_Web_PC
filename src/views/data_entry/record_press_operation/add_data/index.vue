<!-- 压机操作记录=>添加数据 -->
<template lang="pug">
  .page
    BreadCrumb(:breadcrumbList="breadcrumbList" class="breadcrumb")
    .main
      .table_item_date
        p 详细日期
        el-date-picker(v-model="todayDate" @change="selectTime" value-format="yyyy-MM-dd" :clearable="false" type="date" format="yyyy年MM月dd日" class="data-picker")
      .divider_line
      .table_item_chooice
        .checkbox
          span 班次
          el-checkbox-group(v-model="schedule" class="check-box" :max=1)
            el-checkbox(v-for="item in scheduleList" :key="item.name"  :label="item.name" class="item-box")
      .divider_line
      .table_item_chooice
        .checkbox
          span 上班时间
          el-checkbox-group(v-model="work_time" class="check-box" :max=1)
            el-checkbox(label="早" class="item-box")
            el-checkbox(label="中" class="item-box")
            el-checkbox(label="晚" class="item-box")
      .divider_line
      .table_item
        .content
          .tip 操作人
          input(placeholder="填写操作人"
            v-model="intent.operator")
        .divider_line
      .table_item
        .content
          .tip 审核人
          input(placeholder="填写审核人"
            v-model="intent.reviewer")
        .divider_line
      el-table(
        :data="intent.data"
        class="table-modify"
        :header-cell-style="headerStyle1"
        :cell-style="cellStyle1"
        :span-method="arraySpanMethod")
        el-table-column(prop="time" label="时间" width="149px")
          template(slot-scope="scope")
            input(v-show="scope.$index!=intent.data.length-1"  placeholder="请填写时间" class="table_input_time" v-model="scope.row.time")
            el-button(v-show="scope.$index==intent.data.length-1" @click="addRow()" class="btn_add") 添加一行
        el-table-column(prop="content" label="内容" flex="1")
          template(slot-scope="scope")
            input(v-show="scope.$index!=intent.data.length-1" placeholder="请填写内容" class="table_input_content" v-model="scope.row.content")
        el-table-column(prop="fixed" label="操作" width="149px")
          template(slot-scope="scope")
            el-button(v-show="scope.$index!=intent.data.length-1" @click="clickDelete(scope.$index, scope.row)" class="delete") 删除
    .operator
      el-button(@click="clickCancel" type="primary" class="bottom-button_cancel") 取消
      el-button(@click="clickSave" type="primary" class="bottom-button_save") 保存
</template>

<script>
  import BreadCrumb from '_components/breadcrumb'
  import Global from '_api/global_variable'
  import {PressOperation} from '_api/entry_data'
  import { CloneDeep } from '_common/util'

  export default {
    components :{
      BreadCrumb,
    },
    data() {
      return {
        todayDate: "",// 必须是这种格式控件才能初始化
        schedule:[],
        currentScheduleId: "",
        scheduleList:[],
        work_time:['早'],
        isShowUpload: false,
        breadcrumbList: [
          {
            path: '/data_entry/record_press_operation',
            name: '压机操作记录',
          },
          {
            path: '/data_entry/record_press_operation/add_data',
            name: this.queryType() === 'add' ? '添加数据' : '修改数据',
          }
        ],
        intent:{
          uuid: "",
          date: "",
          schedule: "",// 班次 A
          working_time: "早",//早: 0, 中: 1, 晚: 2 ,建议后台统一
          operator: "",
          reviewer: "",
          data: [
            {
              time: "",
              content: "",
              fixed: ""
            },
          ],
        },
        focusStyle:{
          backgroundColor:'#1E9AFF'
        },
      }
    },
    computed: {

    },
    mounted() {
      this.title = this.queryType() === 'add' ? '添加数据' : '修改数据'
      this.initData()
    },
    methods: {
      headerStyle1() {
        return 'background-color:#303142;color:#fff;border: 1px solid #454A5A;text-align:center'
      },
      cellStyle1() {
        return "color:#fff;background-color:#303142;border: 1px solid #454A5A;text-align:center"
      },
      queryType() {
        return (null === this.$route.query.type) ? '' : this.$route.query.type
      },
      // 将多列合并为一行
      arraySpanMethod({ rowIndex, columnIndex }) {
        if(null !=this.intent.data && this.intent.data.length > 0) {
          if(rowIndex==(this.intent.data.length - 1)&&columnIndex==0) {
            return [1,3]
          }
        }
      },
      // 把上一页传过来的数据拿到
      initData() {
        // 获取上一个页面缓存的班次数据
        this.scheduleList = Global.getScheduleArray()
        if(this.queryType() === 'modify') {
          // 获取上一个页面缓存的某一行的编辑数据
          this.intent = Global.getPressRunBean();
          // 加上‘fixed’字段
          this.handleData()
          // 看那边后台和传过来什么格式 必须是2019-6-29/2019-06-29这种格式。
          this.todayDate = this.intent.date
          // 设置那边传过来的班次名字
          this.schedule.push(this.intent.schedule)
          console.log("this.intent.schedule="+this.intent.schedule)
          // this.work_time.push(this.intent.working_time)
          switch (this.intent.working_time) {
            case '早':
            case '0':
              this.work_time =  ['早']
              break;
            case '中':
            case '1':
              this.work_time =  ['中']
              break;
            case '晚':
            case '2':
              this.work_time =  ['晚']
              break;
          }
          // 'fixed'字段是为了画表用的，上传数据的时候要删除这个数据。
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
        // console.log(this.schedule[0])
        if(null != this.scheduleList && this.scheduleList.length !== 0) {
          this.scheduleList.forEach(item => {
            if(item.name === this.schedule[0]) {
              // console.log(item.uuid)
              this.currentScheduleId  = item.uuid
            }
          })
        } else {
          this.currentScheduleId = ''
        }
      },
      addRow() {
        let bean = {
          time: "",
          content: "",
          fixed: ""
        }
        if(this.intent.data === null) {
          this.isInit = false
          this.intent.data = [
            bean
          ]
        } else {
          // this.intent.data.splice(this.intent.data.length-1,0,bean)
          this.intent.data.push(bean)
        }
      },
      clickDelete(index, ) {
        // 删除这个元素
        this.intent.data.splice(index,1)
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
        if(this.intent.data.length ===  0) {
          alert("请添加数据和内容")
          return false
        } else {
          return true
        }
      },
      // 添加一条数据到服务器
      addData() {
        this.intent.date = this.todayDate
        this.intent.schedule = this.currentScheduleId
        this.intent.working_time = this.work_time[0]
        let body = this.deleteLastBean()
        // 参数会不会是{body}   ???
        PressOperation('post', body).then(res => {
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
        this.intent.date = this.todayDate
        this.intent.schedule = this.currentScheduleId
        this.intent.working_time = this.work_time[0]
        let body = this.deleteLastBean()
        PressOperation('put', body).then(res => {
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
      },
      /**
       * @param isDelete  先在最后增加一个空内容的对象，再循环对象数组，给每个对象加上'fixed'字段，，
        */
      handleData() {
        // 这里故意加多一个空对象到最后，上传到服务器前要删除,这个空对象是展示一个“添加一行”按钮的。
        this.addRow()
        for(let i = 0;i < this.intent.data.length; i++) {
          this.intent.data[i].fixed = '修改'
        }
      },
      /**
       *  删除最后一个对象，并且把剩下的对象的fixed字段删除
        */
      deleteLastBean() {
        // let body = {...this.intent}
        let body = CloneDeep(this.intent)
        // 删除数组内最后一个空内容的对象。
        body.data.splice(body.data.length-1,1)
        for(let i = 0;i < body.data.length; i++) {
           delete body.data[i].fixed
        }
        return body
      },
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
    .main
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
        margin-bottom 20px
        p
          fsc(16px,#FFFFFF);
          titleTipStyle();
        .data-picker
          width 170px
          background rgba(48,49,66,1)
          color rgba(48,49,66,1)
      .divider_line
        lineStyle()
      .table_item_chooice
        display flex
        flex-direction column
        margin-top 20px
        margin-bottom 20px
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
      .table-modify
        margin-top 40px
        .delete
          color #F7517F
          background-color #ffffff00
          border-color #ffffff00
      .table_input_time
        width 100px
        background-color #303142
        color #fff
        text-align center
      .table_input_content
        width 800px
        background-color #303142
        color #fff
        text-align center
      .btn_add
        color #1E9AFF
        text-align center
        background-color #ffffff00
        border-color #ffffff00
        width 100px
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
