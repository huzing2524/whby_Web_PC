<!-- 砂光锯切表=>添加数据 -->
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
            el-checkbox(label="A班" class="item-box")
            el-checkbox(label="B班" class="item-box")
            el-checkbox(label="C班" class="item-box")
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
          .tip 填写产量
          input(placeholder="填写产量"
            v-model="outputArrayString")
        .divider_line
      .table_item
        .content
          .tip 废品 (m³)
          input(placeholder="填写废品"
            v-model="scrapArrayString")
        .divider_line
      .table_item
        .content
          .tip 填写规格备注
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
  // import {PressRecordsRunAdd} from "_api/entry_data";
  // import {PressRecordsRunModify} from "_api/entry_data";


  export default {
    components :{
      BreadCrumb,
    },
    data() {
      return {
        todayDate: "2019-06-26",// 必须是这种格式控件才能初始化
        schedule:['A班'],
        work_time:['早'],
        outputArrayString: "",
        scrapArrayString: "",
        isShowUpload: false,
        // intent: Global.getPressRunBean(),
        // outputArrayString : this.getArrayString(intent.PressRunBean),
        // scrapArrayString : this.getArrayString(intent.scrap),
        breadcrumbList: [
          {
            path: '/data_entry/record_sanding_cut',
            name: '砂光锯切表',
          },
          {
            path: '/data_entry/record_sanding_cut/add_data',
            name: '添加数据',
          }
        ],
        intent:{
          uuid:"",
          date: "",
          schedule: [],
          work_time: [],
          specifications:"",
          shutdown_count:"",
          shutdown_time:"",
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
        this.intent = Global.getPressRunBean();
        if(this.queryType() === 'modify') {
          // 看那边后台和传过来什么格式 必须是2019-6-29/2019-06-29这种格式。
          this.todayDate = this.intent.date
          switch (this.intent.schedule) {
            case 'A班':
              this.schedule =  ['A班']
              break;
            case 'B班':
              this.schedule =  ['B班']
              break;
            case 'C班':
              this.schedule =  ['C班']
              break;
          }
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
          // 看显示的数究竟是一个字符串分行显示的还是整数数组合起来的
          // this.outputArrayString = this.getArrayString(this.intent.output)
          // this.scrapArrayString = this.getArrayString(this.intent.scrap)
          this.outputArrayString = this.intent.output
          this.scrapArrayString = this.intent.scrap
        } else {// 设置今天的日期
          this.todayDate = this.getTodayTime();
        }
      },
      // 把整型数组变成一个String，用换行分割。
      getArrayString(array) {
        if(array === undefined || array.size() === 0)
          return "";
        let arrayString = "";
        for(let num of array) {
          arrayString += num;
          arrayString+="&#10;";
        }
        return arrayString
      },
      clickCancel() {
        this.$router.go(-1)
      },
      clickSave() {
        if(this.queryType() === 'add') {
          this.addData();
        } else if(this.queryType() === 'modify') {
          this.modifyData();
        }
      },
      // 添加一条数据到服务器
      addData() {
        this.intent.schedule = this.schedule[0]
        this.intent.work_time = this.work_time[0]
        this.intent.date = this.todayDate
        delete this.intent.fixed
        console.log(this.intent)
        /*PressRecordsRunAdd(this.bean).then(res => {
          console.log(res)
          this.tableData = res.data.data
          console.log("res.data="+res.data)
          this.$router.go(-1)
        }).catch((e)=>{
          alert('保存出错')
          console.log(e)
        })*/

        // this.$router.go(-1)
      },
      // 修改数据并保存到服务器
      modifyData() {
        this.intent.schedule = this.schedule[0]
        this.intent.work_time = this.work_time[0]
        this.intent.date = this.todayDate
        delete this.intent.fixed
        let uuid = this.intent.uuid
        delete this.intent.uuid
        let body = new Object()
        body.update = this.intent
        body.uuid = uuid
        console.log("this.bean="+this.intent)
        console.log("body="+body)
        /*PressRecordsRunModify(this.bean).then(res => {
          console.log(res)
          this.tableData = res.data.data
          console.log("res.data="+res.data)
          this.$router.go(-1)
        }).catch((e)=>{
          alert('保存出错')
          console.log(e)
        })*/
        Global.clearPressRunBean()
        // this.$router.go(-1)
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
            width 60px
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









