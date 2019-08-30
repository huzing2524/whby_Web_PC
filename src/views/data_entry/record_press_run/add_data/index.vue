<!-- 压机运行记录=>添加数据 -->
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
          .tip 规格
          input(placeholder="填写规格"
            v-model="intent.specifications")
        .divider_line
      .table_item
        .content
          .tip 停机次数 (次)
          input(placeholder="填写停机次数"
            v-model="intent.shutdown_count")
        .divider_line
      .table_item
        .content
          .tip 停机时间 (min)
          input(placeholder="填写停机时间"
            v-model="intent.shutdown_time")
        .divider_line
      .table_item
        .content
          .tip_area 产量
          textarea(placeholder="填写产量" v-model="outputArrayString")
        .divider_line
      .table_item
        .content
          .tip_area 废品 (m³)
          textarea(placeholder="填写废品"
            v-model="scrapArrayString")
        .divider_line
      .table_item
        .content
          .tip 规格备注
          input(placeholder="填写规格备注"
            v-model="intent.remark")
        .divider_line
      .table_item
        .content
          .tip 审核人
          input(placeholder="填写审核人"
            v-model="intent.approver")
        .divider_line
    .operator
      el-button(@click="clickCancel" type="primary" class="bottom-button_cancel") 取消
      el-button(@click="clickSave" type="primary" class="bottom-button_save") 保存
</template>

<script>
  import BreadCrumb from '_components/breadcrumb'
  import Global from '_api/global_variable'
  import {PressRecordsRun} from "_api/entry_data";


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
        outputArrayString: "",
        scrapArrayString: "",
        isShowUpload: false,
        breadcrumbList: [
          {
            path: '/data_entry/material_consumption_table',
            name: '压机运行记录',
          },
          {
            path: '/data_entry/material_consumption_table/add_data',
            name: this.queryType() === 'add' ? '添加数据' : '修改数据',
          }
        ],

        intent:{
          uuid:"",
          date: "",
          schedule: [],
          work_time: [],
          specifications:"",
          shutdown_count:0,
          shutdown_time:0,
          output:[],// 产量
          scrap:[],// 废品
          remark:"",
          approver:"",
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
          console.log("传过来的时间："+this.todayDate)
          // 设置那边传过来的班次名字
          this.schedule.push(this.intent.schedule)
          switch (this.intent.work_time) {
            case '早':
              this.work_time =  ['早']
              break;
            case '中':
              this.work_time =  ['中']
              break;
            case '晚':
              this.work_time =  ['晚']
              break;
          }
          // 将数组转成一个的字符串，中间用'\n'分割
          this.outputArrayString = this.getArrayString(this.intent.output)
          this.scrapArrayString = this.getArrayString(this.intent.scrap)
        } else {
          // 设置今天的日期
          this.todayDate = this.getTodayTime();
          if(null != this.scheduleList && this.scheduleList.length != 0) {
            this.schedule.push(this.scheduleList[0].name)
          }
        }
      },
      // 把整型数组变成一个String，用换行分割。
      getArrayString(array) {
        if(array === undefined || array.length === 0)
          return "";
        let arrayString = "";
        for(let num of array) {
          arrayString += num;
          arrayString+="\n";
        }
        return arrayString
      },
      // 把String切割成n个整形
      getOutputArrayInt(string, isInt) {
        console.log("string="+string)
        let array = []
        if (string !== '') {
          array = string.split('\n')
          // 如果切割字符串后发现最后一个字符串是''，则删除。
          if(array[array.length-1] === "") {
            array.length = array.length - 1
          }
          console.log("array="+array)
          if (null != array && array.length != 0) {
            for (let i = 0; i < array.length; i++) {
              if(isInt) {
                // 去除空格并且转成整数
                let num = parseFloat(array[i].trim());
                if(!isNaN(num)) {
                  array[i] = num;
                }
              }else {
                // 只去掉空格
                array[i].trim();
              }
            }
          }
        }
        return array
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
          if (this.queryType() === 'add') {
            this.addData();
          } else if (this.queryType() === 'modify') {
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
        if(this.outputArrayString === '') {
          alert("产量不能为空")
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
        body.work_time = this.work_time[0]
        body.specifications = this.intent.specifications
        body.shutdown_count = this.intent.shutdown_count
        body.shutdown_time = this.intent.shutdown_time
        body.output = this.getOutputArrayInt(this.outputArrayString,true)
        body.scrap = this.getOutputArrayInt(this.scrapArrayString,false)
        body.remark = this.intent.remark
        body.approver = this.intent.approver

        console.log(body)
        // 参数会不会是{body}   ???
        PressRecordsRun('post', body).then(res => {
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
        this.intent.work_time = this.work_time[0]
        this.intent.shutdown_count = parseInt(this.intent.shutdown_count)
        this.intent.shutdown_time = parseInt(this.intent.shutdown_time)
        this.intent.output = this.getOutputArrayInt(this.outputArrayString,true)
        this.intent.scrap = this.getOutputArrayInt(this.scrapArrayString,false)
        delete this.intent.fixed
        let uuid = this.intent.uuid
        delete this.intent.uuid
        let body = {
          uuid : uuid,
          update  : {...this.intent}
        }
        PressRecordsRun('put', body).then(res => {
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
      showObjectLog(mBean) {
        console.log("--------------打印对象----------------")
        if(null != mBean) {
          for(var key in mBean) {
            console.log(key + "=" + mBean[key])
          }
        } else {
          console.log("对象为空。。。。。。。。。。。。。。")
        }
        console.log("--------------打印结束----------------")
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
            fsc(16px,#FFFFFF);
            width 120px
            align-items right
            margin-right 40px
            margin-top 20px
          .tip_area
            padding-top 20px
            fsc(16px,#FFFFFF);
            width 120px
            margin-right 40px
          input
            padding-top 20px
            padding-bottom 20px
            fsc(16px, #5C6466);
            bg(#303142);
          textarea
            padding-top 20px
            fsc(16px, #5C6466);
            bg(#303142);
            border none
            white-space pre-line
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









