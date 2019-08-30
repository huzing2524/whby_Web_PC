<template lang="pug">
  .farm_board.w1200.mgauto
    Breadcrumb(:breadcrumbList="breadcrumbList")
    DateBatchSelect(@onClick="dateBatchOnClick" :year="year" :month="month" :batchIndex="batchIndex")
    .chart_content
      .chart_item(@click="toDetail")
        .title {{this.scheduleType}}班生产日报
        .tips 本月计划生产：{{dailyReport.plan}}m3；本月已完成产量：{{dailyReport.product}}m3；平均每天需生产：{{dailyReport.average}}m3
        .content
          .item
            .name
            .name 成品产量 (m3)
            .name 废品产量 (m3)
            .name 创花 (T/m3)
            .name MDI (KG/m3)
            .name 石蜡 (KG/m3)
            .name 增粘剂 (KG/m3)
            .name 脱模剂 (KG/m3)
          .item(v-for="(item,index) in dailyReport.data" :key="index")
            .items(v-for="(items,indexs) in item" :key="indexs") {{items}}
        .chart_name {{this.scheduleType}}班生产日报
      .chart_item(@click="toDetail")
        .title {{this.scheduleType}}班产量
        .content
          ve-histogram(
          :xAxis="xAxis"
          :yAxis="yAxis"
          :grid="grid"
          :series="series"
          :legend="legendSettings")
        .chart_name {{this.scheduleType}}班产量
      .chart_item(@click="toDetail")
        .title {{this.scheduleType}}班入库质量等级统计
        .total
          .number {{incomingQuality.total}}
        .content
          .circle_item
            .circle
              ve-ring(:data="circleDataAY" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQuality.total ? (parseFloat((this.incomingQuality.high/this.incomingQuality.total)*100).toFixed(2) + '%') : '0%'}}
                p 优品率
            .circle
              ve-ring(:data="circleDataAH" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQuality.total ? (parseFloat((this.incomingQuality.qualified/this.incomingQuality.total)*100).toFixed(2) + '%') : '0%'}}
                p 合格率
            .circle
              ve-ring(:data="circleDataAF" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQuality.total ? (parseFloat((this.incomingQuality.waste/this.incomingQuality.total)*100).toFixed(2) + '%') : '0%'}}
                p 废品率
            .circle
              ve-ring(:data="circleDataAZ" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQuality.total ? (parseFloat((this.incomingQuality.make/this.incomingQuality.total)*100).toFixed(2) + '%') : '0%'}}
                p 自制率
        .chart_name {{this.scheduleType}}班入库质量等级统计
      .chart_item(@click="toDetail")
        .title {{this.scheduleType}}班停机时间
        .content
          .pie_item
            ve-ring(
            :data="pieData"
            :legend="PieLegendSettings"
            :settings="PieChartSettings"
            width="100%")
            .chart_kind
              span {{this.totalShutdown}}分钟
              p 总共停机
        .chart_name {{this.scheduleType}}班停机时间
      .chart_item(@click="toDetail")
        .title {{this.scheduleType}}班产能
        .content
          ve-line(
          :legend="lineLegendSettings"
          :colors="colors"
          :xAxis="linexAxis"
          :yAxis ="lineyAxis"
          width="100%"
          :grid="linegrid"
          :series="lineseries")
        .chart_name {{this.scheduleType}}班产能
      .chart_item(@click="toDetail")
        .title {{this.scheduleType}}班物资消耗
        .content
          .item
            .name
            .name 燃料 (T)
            .name 胶水 (T)
            .name 防水剂 (KG)
            .name 电耗 (KWH)
            .name 砂带 (元)
            .name 削片刀片 (元)
          .item(v-for="(item,index) in materialConsumption" :key="index")
            .items {{item.date}}
            .items {{item.fuel}}
            .items {{item.glue}}
            .items {{item.waterproofing_agent}}
            .items {{item.power_consumption}}
            .items {{item.abrasive_belt}}
            .items {{item.shaving_blade}}
        .chart_name {{this.scheduleType}}班物资消耗
</template>

<script>
  import TableChart from '_components/chart/tableChart/'
  import CircleChart from '_components/chart/circleChart/'
  import BarChart from '_components/chart/barChart/'
  import LineChart from '_components/chart/lineChart/'
  import PieChart from '_components/chart/pieChart/'
  import DateBatchSelect from '_components/date_batch_select'
  import { ScheduleMain } from '_api/basic_data'
  import { ProductDailyReport,ProductOutput,ProductIncomingQuality,ShutdownStats,MaterialConsumption } from '_api/board'
  import Breadcrumb from '_components/breadcrumb'
  export default {
    components :{
      Breadcrumb,
      TableChart,
      CircleChart,
      BarChart,
      LineChart,
      PieChart,
      DateBatchSelect,
    },
    data(){
      return {
        scheduleType: 'A',
        schedule: '',
        date: '',
        mydate: '',
        legendSettings: {},
        grid: {},
        xAxis: [],
        series: [],
        yAxis: [],
        dailyReport:{},
        outputItem: {},
        incomingQuality: {},
        chartTooltip: {},
        chartSettings: {},
        circleDataAY: {},
        circleDataAH: {},
        circleDataAF: {},
        circleDataAZ: {},
        pieData:{},
        PieLegendSettings:{},
        PieChartSettings:{},
        shutdownStatus:{},
        totalShutdown: 0,
        materialConsumption: {},
        lineLegendSettings:{},
        colors:[],
        linexAxis:[],
        lineyAxis:[],
        linegrid:{},
        lineseries:[],
        breadcrumbList:[{name:'制板车间看板',path:'/farm_board'}],
        scheduleList:[],
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        batchIndex: 0,
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.getChartData()
      },
      getChartData(schedule,date,mydate){
        // let myDate = new Date()
        // let year = myDate.getFullYear()
        // let month = myDate.getMonth() + 1
        // let day = myDate.getDate()
        // let start = '' + year + '-' + (month >= 10 ? month : '0' + month) + '-' + day
        // let end = '' + year + '-' + (month >= 10 ? month : '0' + month) + '-' + day
        if(!schedule){
          this.schedule = 'A'
        }else {
          this.schedule = schedule
        }
        if(!date){
          // this.date = '' + year + (month >= 10 ? month : '0' + month)
          this.date = '' + this.year + (this.month >= 10 ? this.month : '0' + this.month)
        }else {
          this.date = date
        }
        if(!mydate){
          // this.mydate = '' + year + '-' + (month >= 10 ? month : '0' + month)
          this.mydate = '' + this.year + '-' + (this.month >= 10 ? this.month : '0' + this.month)
        }else {
          this.mydate = mydate
        }
        ScheduleMain().then((res) => {
          this.scheduleList = res.data
          this.scheduleList.forEach((item) => {
            if(item.name === (this.schedule+'班')){
              this.idA = item.uuid
              this.getMaterialConsumption(this.idA,this.mydate)
            }
          })
        }).catch(() => {

        })
        ProductDailyReport({schedule:this.schedule,date:this.date}).then((res) => {
          this.dailyReport = res.data
        }).catch(() => {

        })
        ProductOutput({schedule:this.schedule,date:this.date}).then((res) => {
          this.outputItem = {
            data: res.data.data.splice(10,10),
            date: res.data.date.splice(10,10)
          }
          this.legendSettings = {
            show: false,
          }
          this.grid = {
            show: false,
            borderColor: '#454A5A',
          }
          this.yAxis = [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  // fontSize: this.fontSize,
                  color: '#fff',
                }
              },
            }
          ]
          this.xAxis = [
            {
              type: 'category',
              data: this.outputItem.date,
              // data: this.outputItem.date.length?this.outputItem.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: '#fff',
                }
              },
            }
          ]
          this.series = [{
            name: '产量',//每组数据的名字，与图例对应
            data: this.outputItem.data,
            // data: this.outputItem.data.length?this.outputItem.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            type: 'bar',//柱状图
            itemStyle: {
              normal: {
                color: '#16CEB9',//设置柱子颜色
                label: {
                  show: true,//柱子上显示值
                  position: 'top',//值在柱子上方显示
                  textStyle: {
                    fontSize: 12,
                    color: '#fff'//值得颜色
                  }
                }
              }
            },
            barWidth: 12,//设置柱子宽度，单位为px
          }]
          this.colors = ['#16CEB9']
          this.lineLegendSettings = {
            show: false,
          }
          this.lineyAxis = [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  color: '#fff',
                }
              },
            }
          ]
          this.linegrid = {
            gridType: 'dashed',
            show: true,
            borderColor: '#454A5A',
          }
          this.linexAxis = [
            {
              type: 'category',
              // data: this.outputItem.date.length?this.outputItem.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              data: this.outputItem.date,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                }
              },
            }
          ]
          this.lineseries = [{
            name: '产量',//每组数据的名字，与图例对应
            // data: this.outputItem.data.length?this.outputItem.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            data: this.outputItem.data,
            type: 'line',
            itemStyle: {
              normal: {
                label: {
                  show: true,//折线上显示值
                  position: 'top',//显示位置
                  textStyle: {
                    fontSize: 12,
                    color: '#fff'//值得颜色
                  }
                }
              }
            },
            lineStyle: {
              type: 'solid',
            },
          }]
        }).catch(() => {

        })
        ProductIncomingQuality({schedule:this.schedule,date:this.date}).then((res) => {
          this.incomingQuality = res.data
          this.chartTooltip = {
            show: false,
          }
          this.legendSettings = {
            show: false,
          }
          this.chartSettings = {
            label: {
              show: false,
            },
            data: [
              {
                tooltip: {
                  position: ['50%', '50%']
                }
              }
            ],
            silent: false,
            radius: ['30', '40'],
            hoverAnimation: false,
            stillShowZeroSum: false,
          }
          this.circleDataAY = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQuality.high},
              {'name': '', 'percent': (this.incomingQuality.total-this.incomingQuality.high)},
            ]
          }
          this.circleDataAH = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQuality.qualified},
              {'name': '', 'percent': (this.incomingQuality.total-this.incomingQuality.qualified)},
            ]
          }
          this.circleDataAF = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQuality.waste},
              {'name': '', 'percent': (this.incomingQuality.total-this.incomingQuality.waste)},
            ]
          }
          this.circleDataAZ = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQuality.make},
              {'name': '', 'percent': (this.incomingQuality.total-this.incomingQuality.make)},
            ]
          }
        }).catch(() => {

        })
        ShutdownStats({schedule:this.schedule,start:this.mydate,end:this.mydate}).then((res) => {
          this.shutdownStatus = res.data
          this.totalShutdown = (this.shutdownStatus.product + this.shutdownStatus.elec_device + this.shutdownStatus.plan_check + this.shutdownStatus.mach_device + this.shutdownStatus.metal_alarm + this.shutdownStatus.out_poweroff + this.shutdownStatus.outsourcing + this.shutdownStatus.prevent_fire + this.shutdownStatus.other)
          this.PieLegendSettings = {
            show: false,
            icon: 'roundRect',
            itemWidth: 10,
            itemHeight: 10,
            right: '10%',
            bottom: '30%',
            orient: 'vertical',
            selectedMode: true,
            selected: true,
            textStyle: {
              fontSize: 12,
              color: '#fff',
              padding: [6,10],
            },
          }
          this.PieChartSettings = {
            label: {
              show: true,
            },
            data: [
              {
                tooltip: {
                  position: ['50%', '50%']
                }
              }
            ],
            silent: true,
            radius: ['60', '80'],
            hoverAnimation: true,
            stillShowZeroSum: true,
          }
          this.pieData = {
            columns: ['类型', '停机时间'],
            rows: [
              { '类型': '生产', '停机时间': this.shutdownStatus.product },
              { '类型': '设备(电气)', '停机时间': this.shutdownStatus.elec_device },
              { '类型': '计划维修', '停机时间': this.shutdownStatus.plan_check },
              { '类型': '设备(机械)', '停机时间': this.shutdownStatus.mach_device },
              { '类型': '金属警报', '停机时间': this.shutdownStatus.metal_alarm },
              { '类型': '外部停电', '停机时间': this.shutdownStatus.out_poweroff },
              { '类型': '外包', '停机时间': this.shutdownStatus.outsourcing },
              { '类型': '消防', '停机时间': this.shutdownStatus.prevent_fire },
              { '类型': '其他', '停机时间': this.shutdownStatus.other },
            ]
          }
        }).catch(() => {

        })
      },
      getMaterialConsumption(schedule,date){
        MaterialConsumption({schedule:schedule,date:date}).then((res) => {
          this.materialConsumption = res.data
        }).catch(() => {

        })
      },
      dateBatchOnClick({batchIndex, month, year}) {
        if((''+batchIndex) == '0'){
          this.scheduleType = 'A'
        }else if((''+batchIndex) == '1'){
          this.scheduleType = 'B'
        }else if((''+batchIndex) == '2'){
          this.scheduleType = 'C'
        }else {
          this.scheduleType = ''
        }
        let date = '' + year + (month >= 10 ? month : '0' + month)
        let mydate = '' + year + '-' + (month >= 10 ? month : '0' + month)
        this.year = year
        this.month = month
        this.getChartData(this.scheduleType,date,mydate)
      },
      toDetail(){
        this.$router.push(`/board?year=${this.year}&month=${this.month}`)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .farm_board
    display flex
    flex 1
    flex-direction column
    padding 0 20px
    .header-content
      padding 0 20px 20px
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
        margin-top 20px
        margin-left 0
      .row-title
        color #fff
        margin-right 110px
        font-size 16px
      .row-content
        display flex
        flex-direction row
        .data-picker
          width 120px
          min-width 120px
          margin-right 20px
          margin-top 20px
    .chart_content
      width 100%
      display flex
      flex-wrap wrap
      flex 1
      padding-top 20px
      .chart_item
        width 32.1%
        height 460px
        display flex
        flex-direction column
        border-radius 8px
        padding 8px 8px 0
        margin-bottom 20px
        background #303142
        &:nth-of-type(2)
          margin 0 20px
        &:nth-of-type(5)
          margin 0 20px
        .title
          display flex
          justify-content center
          align-items center
          text-align center
          font-size 14px
          padding 10px 0
          color #fff
          background #1C1E24
        .tips
          display flex
          font-size 12px
          color #16CEB9
          padding-bottom 10px
          text-align center
          background #1C1E24
        .total
          display flex
          text-align center
          background #1C1E24
          .number
            display flex
            justify-content center
            align-items center
            background #3E485A
            color #fff
            font-size 12px
            margin 10px auto
            position relative
            wh 120px 40px
            &:before
              content ''
              wh 0px 0px
              border-left 8px solid transparent
              border-right 8px solid transparent
              border-top 10px solid #3E485A
              position absolute
              bottom -10px
              left 50%
              margin-left -6px
        .content
          display flex
          flex 1
          flex-direction column
          background #1C1E24
          overflow scroll
          padding-bottom 10px
          .circle_item
            display flex
            flex-direction row
            margin-top -120px
            .circle
              flex 1
              justify-content center
              align-items center
              position relative
              .chart_kind
                width 60px
                height 40px
                text-align center
                position absolute
                top 50%
                left 50%
                margin-left -30px
                margin-top -20px
                span
                  fsc 14px #fff
                p
                  fsc 12px #fff
          .pie_item
            margin-top -60px
            position relative
            .chart_kind
              width 60px
              height 40px
              text-align center
              position absolute
              left 50%
              top 50%
              margin-left -30px
              margin-top -20px
              span
                fsc 14px #fff
              p
                fsc 12px #fff
          .item
            display flex
            padding 10px 0
            flex-direction row
            font-size 12px
            border-bottom 1px solid #454A5A
            &:nth-of-type(1)
              padding 0
            .name
              display flex
              flex 1
              color #fff
              justify-content center
              align-items center
            .items
              display flex
              flex 1
              color #fff
              justify-content center
              align-items center
              &:nth-of-type(1)
                color #1E9AFF
        .chart_name
          display flex
          align-items center
          justify-content center
          font-size 16px
          color #fff
          padding 12px 0
</style>
