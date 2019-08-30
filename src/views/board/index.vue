<template lang="pug">
  .swiper
    swiper(:options="swiperOption")
      swiper-slide
        .table_item
          .title A班生产日报
          .tips 本月计划生产：{{parseFloat(dailyReportA.plan).toFixed(2)}}m3；本月已完成产量：{{parseFloat(dailyReportA.product).toFixed(2)}}m3；平均每天需生产：{{parseFloat(dailyReportA.average).toFixed(2)}}m3
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
            .item(v-for="(item,index) in dailyReportA.data" :key="index")
              .items(v-for="(items,indexs) in item" :key="indexs") {{items}}

      swiper-slide
        .bar_item
          .title A班产量
          ve-histogram(
          width="100%"
          height="100%"
          :xAxis="xAxisA"
          :yAxis="yAxis"
          :grid="grid"
          :series="seriesA"
          :legend="legendSettings")

      swiper-slide
        .circle_item
          .title A班入库质量等级统计
          .total {{incomingQualityA.total}}
          .content
            .circle
              ve-ring(:data="circleDataAY" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityA.total ? (parseFloat((this.incomingQualityA.high/this.incomingQualityA.total)*100).toFixed(2) + '%') : '0%'}}
                p 优品率
            .circle
              ve-ring(:data="circleDataAH" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityA.total ? (parseFloat((this.incomingQualityA.qualified/this.incomingQualityA.total)*100).toFixed(2) + '%') : '0%'}}
                p 合格率
            .circle
              ve-ring(:data="circleDataAF" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityA.total ? (parseFloat((this.incomingQualityA.waste/this.incomingQualityA.total)*100).toFixed(2) + '%') : '0%'}}
                p 废品率
            .circle
              ve-ring(:data="circleDataAZ" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityA.total ? (parseFloat((this.incomingQualityA.make/this.incomingQualityA.total)*100).toFixed(2) + '%') : '0%'}}
                p 自制率

      swiper-slide
        .pie_item
          .title A班停机时间
          ve-ring(
          :data="pieDataA"
          :legend="PieLegendSettings"
          :settings="PieChartSettings"
          width="100%"
          height="100%")
            .chart_kind(v-if="totalA")
              span {{totalA}}分钟
              p 总共停机

      swiper-slide
        .line_item
          .title A班产能
          ve-line(
          :legend="lineLegendSettings"
          :colors="colors"
          :xAxis="linexAxisA"
          :yAxis ="lineyAxis"
          width="100%"
          height="100%"
          :grid="linegrid"
          :series="lineseriesA")

      swiper-slide
        .table_item
          .title A班物资消耗
          .content
            .item
              .name
              .name 燃料 (T)
              .name 胶水 (T)
              .name 防水剂 (KG)
              .name 电耗 (KWH)
              .name 砂带 (元)
              .name 削片刀片 (元)
            .item(v-for="(item,index) in materialConsumptionA" :key="index")
              .items {{item.date}}
              .items {{item.fuel}}
              .items {{item.glue}}
              .items {{item.waterproofing_agent}}
              .items {{item.power_consumption}}
              .items {{item.abrasive_belt}}
              .items {{item.shaving_blade}}

      swiper-slide
        .table_item
          .title B班生产日报
          .tips 本月计划生产：{{parseFloat(dailyReportB.plan).toFixed(2)}}m3；本月已完成产量：{{parseFloat(dailyReportB.product).toFixed(2)}}m3；平均每天需生产：{{parseFloat(dailyReportB.average).toFixed(2)}}m3
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
            .item(v-for="(item,index) in dailyReportB.data" :key="index")
              .items(v-for="(items,indexs) in item" :key="indexs") {{items}}

      swiper-slide
        .bar_item
          .title B班产量
          ve-histogram(
          width="100%"
          height="100%"
          :xAxis="xAxisB"
          :yAxis="yAxis"
          :grid="grid"
          :series="seriesB"
          :legend="legendSettings")

      swiper-slide
        .circle_item
          .title B班入库质量等级统计
          .total {{incomingQualityB.total}}
          .content
            .circle
              ve-ring(:data="circleDataBY" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityB.total ? (parseFloat((this.incomingQualityB.high/this.incomingQualityB.total)*100).toFixed(2) + '%') : '0%'}}
                p 优品率
            .circle
              ve-ring(:data="circleDataBH" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityB.total ? (parseFloat((this.incomingQualityB.qualified/this.incomingQualityB.total)*100).toFixed(2) + '%') : '0%'}}
                p 合格率
            .circle
              ve-ring(:data="circleDataBF" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityB.total ? (parseFloat((this.incomingQualityB.waste/this.incomingQualityB.total)*100).toFixed(2) + '%') : '0%'}}
                p 废品率
            .circle
              ve-ring(:data="circleDataBZ" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityB.total ? (parseFloat((this.incomingQualityB.make/this.incomingQualityB.total)*100).toFixed(2) + '%') : '0%'}}
                p 自制率

      swiper-slide
        .pie_item
          .title B班停机时间
          ve-ring(
          :data="pieDataB"
          :legend="PieLegendSettings"
          :settings="PieChartSettings"
          width="100%"
          height="100%")
            .chart_kind(v-if="totalB")
              span {{totalB}}分钟
              p 总共停机

      swiper-slide
        .line_item
          .title B班产能
          ve-line(
          :legend="lineLegendSettings"
          :colors="colors"
          :xAxis="linexAxisB"
          :yAxis ="lineyAxis"
          width="100%"
          height="100%"
          :grid="linegrid"
          :series="lineseriesB")

      swiper-slide
        .table_item
          .title B班物资消耗
          .content
            .item
              .name
              .name 燃料 (T)
              .name 胶水 (T)
              .name 防水剂 (KG)
              .name 电耗 (KWH)
              .name 砂带 (元)
              .name 削片刀片 (元)
            .item(v-for="(item,index) in materialConsumptionB" :key="index")
              .items {{item.date}}
              .items {{item.fuel}}
              .items {{item.glue}}
              .items {{item.waterproofing_agent}}
              .items {{item.power_consumption}}
              .items {{item.abrasive_belt}}
              .items {{item.shaving_blade}}

      swiper-slide
        .table_item
          .title C班生产日报
          .tips 本月计划生产：{{parseFloat(dailyReportC.plan).toFixed(2)}}m3；本月已完成产量：{{parseFloat(dailyReportC.product).toFixed(2)}}m3；平均每天需生产：{{parseFloat(dailyReportC.average).toFixed(2)}}m3
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
            .item(v-for="(item,index) in dailyReportC.data" :key="index")
              .items(v-for="(items,indexs) in item" :key="indexs") {{items}}

      swiper-slide
        .bar_item
          .title C班产量
          ve-histogram(
          width="100%"
          height="100%"
          :xAxis="xAxisC"
          :yAxis="yAxis"
          :grid="grid"
          :series="seriesC"
          :legend="legendSettings")

      swiper-slide
        .circle_item
          .title C班入库质量等级统计
          .total {{incomingQualityC.total}}
          .content
            .circle
              ve-ring(:data="circleDataCY" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityC.total ? (parseFloat((this.incomingQualityC.high/this.incomingQualityC.total)*100).toFixed(2) + '%') : '0%'}}
                p 优品率
            .circle
              ve-ring(:data="circleDataCH" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityC.total ? (parseFloat((this.incomingQualityC.qualified/this.incomingQualityC.total)*100).toFixed(2) + '%') : '0%'}}
                p 合格率
            .circle
              ve-ring(:data="circleDataCF" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityC.total ? (parseFloat((this.incomingQualityC.waste/this.incomingQualityC.total)*100).toFixed(2) + '%') : '0%'}}
                p 废品率
            .circle
              ve-ring(:data="circleDataCZ" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
              .chart_kind
                span {{this.incomingQualityC.total ? (parseFloat((this.incomingQualityC.make/this.incomingQualityC.total)*100).toFixed(2) + '%') : '0%'}}
                p 自制率

      swiper-slide
        .pie_item
          .title C班停机时间
          ve-ring(
          :data="pieDataC"
          :legend="PieLegendSettings"
          :settings="PieChartSettings"
          width="100%"
          height="100%")
            .chart_kind(v-if="totalC")
              span {{totalC}}分钟
              p 总共停机

      swiper-slide
        .line_item
          .title C班产能
          ve-line(
          :legend="lineLegendSettings"
          :colors="colors"
          :xAxis="linexAxisC"
          :yAxis ="lineyAxis"
          width="100%"
          height="100%"
          :grid="linegrid"
          :series="lineseriesC")

      swiper-slide
        .table_item
          .title C班物资消耗
          .content
            .item
              .name
              .name 燃料 (T)
              .name 胶水 (T)
              .name 防水剂 (KG)
              .name 电耗 (KWH)
              .name 砂带 (元)
              .name 削片刀片 (元)
            .item(v-for="(item,index) in materialConsumptionC" :key="index")
              .items {{item.date}}
              .items {{item.fuel}}
              .items {{item.glue}}
              .items {{item.waterproofing_agent}}
              .items {{item.power_consumption}}
              .items {{item.abrasive_belt}}
              .items {{item.shaving_blade}}
</template>

<script>
  import TableChart from '_components/chart/tableChart/'
  import CircleChart from '_components/chart/circleChart/'
  import BarChart from '_components/chart/barChart/'
  import LineChart from '_components/chart/lineChart/'
  import PieChart from '_components/chart/pieChart/'
  import { ScheduleMain } from '_api/basic_data'
  import { ProductDailyReport,ProductOutput,ProductIncomingQuality,ShutdownStats,MaterialConsumption } from '_api/board'
  export default {
  data(){
      return {
        xAxisA: [],
        xAxisB: [],
        xAxisC: [],
        yAxis: [],
        grid: [],
        seriesA: [],
        seriesB: [],
        seriesC: [],
        circleDataAY: {},
        circleDataAH: {},
        circleDataAF: {},
        circleDataAZ: {},
        circleDataBY: {},
        circleDataBH: {},
        circleDataBF: {},
        circleDataBZ: {},
        circleDataCY: {},
        circleDataCH: {},
        circleDataCF: {},
        circleDataCZ: {},
        chartTooltip: {},
        chartSettings: {},
        legendSettings: {},
        PieLegendSettings: {},
        PieChartSettings: {},
        pieDataA: {},
        pieDataB: {},
        pieDataC: {},
        lineLegendSettings: {},
        colors: [],
        lineyAxis: [],
        linexAxisA: [],
        linexAxisB: [],
        linexAxisC: [],
        lineseriesA: [],
        lineseriesB: [],
        lineseriesC: [],
        linegrid: {},
        swiperOption: {//swiper3
          autoplay: true,
          loop: true,
          speed: 1000,
        },
        scheduleList:[],
        dailyReportA:{},
        dailyReportB:{},
        dailyReportC:{},
        outputItemA: {},
        outputItemB: {},
        outputItemC: {},
        incomingQualityA: {},
        incomingQualityB: {},
        incomingQualityC: {},
        incomingQuality: {
          total: 1000,
          high: 500,
          qualified: 900,
          waste: 400,
          make: 100,
        },
        shutdownStatusA: {},
        shutdownStatusB: {},
        shutdownStatusC: {},
        materialConsumptionA: {},
        materialConsumptionB: {},
        materialConsumptionC: {},
        idA: '',
        idB: '',
        idC: '',
        totalA: 0,
        totalB: 0,
        totalC: 0,
        year: '',
        month: '',
      }
    },
    components: {
      TableChart,
      CircleChart,
      BarChart,
      LineChart,
      PieChart,
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        let myDate = new Date()
        let year = myDate.getFullYear()
        let month = myDate.getMonth() + 1
        if(this.$route.query.year){
          this.year = this.$route.query.year
        }else {
          this.year = year
        }
        if(this.$route.query.month){
          this.month = this.$route.query.month
        }else {
          this.month = month
        }
        // let day = myDate.getDate()
        let date = '' + this.year + (this.month >= 10 ? this.month : '0' + this.month)
        let mydate = '' + this.year + '-' + (this.month >= 10 ? this.month : '0' + this.month)
        // let start = '' + year + '-' + (month >= 10 ? month : '0' + month) + '-' + day
        // let end = '' + year + '-' + (month >= 10 ? month : '0' + month) + '-' + day
        ScheduleMain().then((res) => {
          this.scheduleList = res.data
          this.scheduleList.forEach((item) => {
            if(item.name === 'A班'){
              this.idA = item.uuid
              this.getMaterialConsumptionA(this.idA,mydate)
            }
            if(item.name === 'B班'){
              this.idB = item.uuid
              this.getMaterialConsumptionB(this.idB,mydate)
            }
            if(item.name === 'C班'){
              this.idC = item.uuid
              this.getMaterialConsumptionC(this.idC,mydate)
            }
          })
        }).catch(() => {

        })
        ProductDailyReport({schedule:'A',date:date}).then((res) => {
          this.dailyReportA = res.data
        }).catch(() => {

        })
        ProductDailyReport({schedule:'B',date:date}).then((res) => {
          this.dailyReportB = res.data
        }).catch(() => {

        })
        ProductDailyReport({schedule:'C',date:date}).then((res) => {
          this.dailyReportC = res.data
        }).catch(() => {

        })
        ProductOutput({schedule:'A',date:date}).then((res) => {
          this.outputItemA = {
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
                  fontSize: 24,
                  color: '#fff',
                }
              },
            }
          ]
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
          this.xAxisA = [
            {
              type: 'category',
              data: this.outputItemA.date,
              // data: this.outputItemA.date.length?this.outputItemA.date:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              axisLabel: {
                textStyle: {
                  fontSize: 24,
                  color: '#fff',
                }
              },
            }
          ]
          this.seriesA = [{
            name: '产量',//每组数据的名字，与图例对应
            data: this.outputItemA.data,
            // data: this.outputItemA.data.length?this.outputItemA.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            type: 'bar',//柱状图
            itemStyle: {
              normal: {
                color: '#16CEB9',//设置柱子颜色
                label: {
                  show: true,//柱子上显示值
                  position: 'top',//值在柱子上方显示
                  textStyle: {
                    fontSize: 24,
                    color: '#fff'//值得颜色
                  }
                }
              }
            },
            barWidth: 48,//设置柱子宽度，单位为px
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
          this.linexAxisA = [
            {
              type: 'category',
              // data: this.outputItemA.date.length?this.outputItemA.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              data: this.outputItemA.date,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                }
              },
            }
          ]
          this.lineseriesA = [{
            name: '产量',//每组数据的名字，与图例对应
            // data: this.outputItemA.data.length?this.outputItemA.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            data: this.outputItemA.data,
            type: 'line',
            itemStyle: {
              normal: {
                label: {
                  show: true,//折线上显示值
                  position: 'top',//显示位置
                  textStyle: {
                    fontSize: 24,
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
        ProductOutput({schedule:'B',date:date}).then((res) => {
          this.outputItemB = {
            data: res.data.data.splice(10,20),
            date: res.data.date.splice(10,20)
          }
          this.xAxisB = [
            {
              type: 'category',
              // data: this.outputItemB.date.length?this.outputItemB.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              data: this.outputItemB.date,
              // data: this.outputItemB.date,
              axisLabel: {
                textStyle: {
                  fontSize: 24,
                  color: '#fff',
                }
              },
            }
          ]
          this.seriesB = [{
            name: '产量',//每组数据的名字，与图例对应
            // data: this.outputItemB.data.length?this.outputItemB.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            data: this.outputItemB.data,
            // data: this.outputItemB.data,
            type: 'bar',//柱状图
            itemStyle: {
              normal: {
                color: '#16CEB9',//设置柱子颜色
                label: {
                  show: true,//柱子上显示值
                  position: 'top',//值在柱子上方显示
                  textStyle: {
                    fontSize: 24,
                    color: '#fff'//值得颜色
                  }
                }
              }
            },
            barWidth: 48,//设置柱子宽度，单位为px
          }]
          this.linexAxisB = [
            {
              type: 'category',
              // data: this.outputItemB.date.length?this.outputItemB.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              data: this.outputItemB.date,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                }
              },
            }
          ]
          this.lineseriesB = [{
            name: '产量',//每组数据的名字，与图例对应
            // data: this.outputItemB.data.length?this.outputItemB.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            data: this.outputItemB.data,
            type: 'line',
            itemStyle: {
              normal: {
                label: {
                  show: true,//折线上显示值
                  position: 'top',//显示位置
                  textStyle: {
                    fontSize: 24,
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
        ProductOutput({schedule:'C',date:date}).then((res) => {
          this.outputItemC = {
            data: res.data.data.splice(10,10),
            date: res.data.date.splice(10,10)
          }
          this.xAxisC = [
            {
              type: 'category',
              // data: this.outputItemC.date.length?this.outputItemC.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              data: this.outputItemC.date,
              axisLabel: {
                textStyle: {
                  fontSize: 24,
                  color: '#fff',
                }
              },
            }
          ]
          this.seriesC = [{
            name: '产量',//每组数据的名字，与图例对应
            // data: this.outputItemC.data.length?this.outputItemC.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            data: this.outputItemC.data,
            type: 'bar',//柱状图
            itemStyle: {
              normal: {
                color: '#16CEB9',//设置柱子颜色
                label: {
                  show: true,//柱子上显示值
                  position: 'top',//值在柱子上方显示
                  textStyle: {
                    fontSize: 24,
                    color: '#fff'//值得颜色
                  }
                }
              }
            },
            barWidth: 48,//设置柱子宽度，单位为px
          }]
          this.linexAxisC = [
            {
              type: 'category',
              // data: this.outputItemC.date.length?this.outputItemC.date.length:['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
              data: this.outputItemC.date,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                }
              },
            }
          ]
          this.lineseriesC = [{
            name: '产量',//每组数据的名字，与图例对应
            // data: this.outputItemC.data.length?this.outputItemC.data:[1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],
            data: this.outputItemC.data,
            type: 'line',
            itemStyle: {
              normal: {
                label: {
                  show: true,//折线上显示值
                  position: 'top',//显示位置
                  textStyle: {
                    fontSize: 24,
                    color: '#fff'//值得颜色
                  }
                }
              }
            },
            lineStyle: {
              type: 'dashed',
            },
          }]
        }).catch(() => {

        })
        ProductIncomingQuality({schedule:'A',date:date}).then((res) => {
          this.incomingQualityA = res.data
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
            radius: ['100', '120'],
            hoverAnimation: false,
            stillShowZeroSum: false,
          }
          this.circleDataAY = {
            columns: ['name', 'percent'],
              rows: [
              {'name': '', 'percent': this.incomingQualityA.high},
              {'name': '', 'percent': (this.incomingQualityA.total-this.incomingQualityA.high)},
            ]
          }
          this.circleDataAH = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityA.qualified},
              {'name': '', 'percent': (this.incomingQualityA.total-this.incomingQualityA.qualified)},
            ]
          }
          this.circleDataAF = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityA.waste},
              {'name': '', 'percent': (this.incomingQualityA.total-this.incomingQualityA.waste)},
            ]
          }
          this.circleDataAZ = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityA.make},
              {'name': '', 'percent': (this.incomingQualityA.total-this.incomingQualityA.make)},
            ]
          }
        }).catch(() => {

        })
        ProductIncomingQuality({schedule:'B',date:date}).then((res) => {
          this.incomingQualityB = res.data
          this.circleDataBY = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityB.high},
              {'name': '', 'percent': (this.incomingQualityB.total-this.incomingQualityB.high)},
            ]
          }
          this.circleDataBH = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityB.qualified},
              {'name': '', 'percent': (this.incomingQualityB.total-this.incomingQualityB.qualified)},
            ]
          }
          this.circleDataBF = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityB.waste},
              {'name': '', 'percent': (this.incomingQualityB.total-this.incomingQualityB.waste)},
            ]
          }
          this.circleDataBZ = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityB.make},
              {'name': '', 'percent': (this.incomingQualityB.total-this.incomingQualityB.make)},
            ]
          }
        }).catch(() => {

        })
        ProductIncomingQuality({schedule:'C',date:date}).then((res) => {
          this.incomingQualityC = res.data
          this.circleDataCY = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityC.high},
              {'name': '', 'percent': (this.incomingQualityC.total-this.incomingQualityC.high)},
            ]
          }
          this.circleDataCH = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityC.qualified},
              {'name': '', 'percent': (this.incomingQualityC.total-this.incomingQualityC.qualified)},
            ]
          }
          this.circleDataCF = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityC.waste},
              {'name': '', 'percent': (this.incomingQualityC.total-this.incomingQualityC.waste)},
            ]
          }
          this.circleDataCZ = {
            columns: ['name', 'percent'],
            rows: [
              {'name': '', 'percent': this.incomingQualityC.make},
              {'name': '', 'percent': (this.incomingQualityC.total-this.incomingQualityC.make)},
            ]
          }
        }).catch(() => {

        })
        ShutdownStats({schedule:'A',start:mydate,end:mydate}).then((res) => {
          this.shutdownStatusA = res.data
          this.PieLegendSettings = {
            show: true,
            icon: 'roundRect',
            itemWidth: 16,
            itemHeight: 16,
            right: '0',
            bottom: '30%',
            orient: 'vertical',
            selectedMode: true,
            selected: true,
            textStyle: {
              fontSize: 24,
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
            radius: ['120', '160'],
            hoverAnimation: true,
            stillShowZeroSum: true,
          }
          let total = (this.shutdownStatusA.product + this.shutdownStatusA.elec_device + this.shutdownStatusA.plan_check + this.shutdownStatusA.mach_device + this.shutdownStatusA.metal_alarm + this.shutdownStatusA.out_poweroff + this.shutdownStatusA.outsourcing + this.shutdownStatusA.prevent_fire + this.shutdownStatusA.other)
          this.totalA = total
          this.pieDataA = {
            columns: ['类型', '停机时间'],
              rows: [
              this.shutdownStatusA.product > 0 ? { '类型': '生产  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.product/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.product } : {},
              this.shutdownStatusA.elec_device > 0 ? { '类型': '设备(电气)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.elec_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.elec_device } : {},
              this.shutdownStatusA.plan_check > 0 ? { '类型': '计划维修  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.plan_check/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.plan_check } : '',
              this.shutdownStatusA.mach_device > 0 ? { '类型': '设备(机械)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.mach_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.mach_device } : {},
              this.shutdownStatusA.metal_alarm > 0 ? { '类型': '金属警报  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.metal_alarm/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.metal_alarm } : {},
              this.shutdownStatusA.out_poweroff > 0 ? { '类型': '外部停电  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.out_poweroff/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.out_poweroff } : {},
              this.shutdownStatusA.outsourcing > 0 ? { '类型': '外包  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.outsourcing/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.outsourcing } : '',
              this.shutdownStatusA.prevent_fire > 0 ? { '类型': '消防  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.prevent_fire/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.prevent_fire } : {},
              this.shutdownStatusA.other > 0 ? { '类型': '其他  ' + (total > 0 ? ((parseFloat(this.shutdownStatusA.other/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusA.other } : {},
            ]
          }
        }).catch(() => {

        })
        ShutdownStats({schedule:'B',start:mydate,end:mydate}).then((res) => {
          this.shutdownStatusB = res.data
          let total = (this.shutdownStatusB.product + this.shutdownStatusB.elec_device + this.shutdownStatusB.plan_check + this.shutdownStatusB.mach_device + this.shutdownStatusB.metal_alarm + this.shutdownStatusB.out_poweroff + this.shutdownStatusB.outsourcing + this.shutdownStatusB.prevent_fire + this.shutdownStatusB.other)
          this.totalB = total
          this.pieDataB = {
            columns: ['类型', '停机时间'],
            rows: [
              this.shutdownStatusB.product > 0 ? { '类型': '生产  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.product/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.product } : {},
              this.shutdownStatusB.elec_device > 0 ? { '类型': '设备(电气)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.elec_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.elec_device } : {},
              this.shutdownStatusB.plan_check > 0 ? { '类型': '计划维修  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.plan_check/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.plan_check } : '',
              this.shutdownStatusB.mach_device > 0 ? { '类型': '设备(机械)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.mach_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.mach_device } : {},
              this.shutdownStatusB.metal_alarm > 0 ? { '类型': '金属警报  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.metal_alarm/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.metal_alarm } : {},
              this.shutdownStatusB.out_poweroff > 0 ? { '类型': '外部停电  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.out_poweroff/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.out_poweroff } : {},
              this.shutdownStatusB.outsourcing > 0 ? { '类型': '外包  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.outsourcing/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.outsourcing } : '',
              this.shutdownStatusB.prevent_fire > 0 ? { '类型': '消防  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.prevent_fire/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.prevent_fire } : {},
              this.shutdownStatusB.other > 0 ? { '类型': '其他  ' + (total > 0 ? ((parseFloat(this.shutdownStatusB.other/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusB.other } : {},
            ]
          }
        }).catch(() => {

        })
        ShutdownStats({schedule:'C',start:mydate,end:mydate}).then((res) => {
          this.shutdownStatusC = res.data
          let total = (this.shutdownStatusC.product + this.shutdownStatusC.elec_device + this.shutdownStatusC.plan_check + this.shutdownStatusC.mach_device + this.shutdownStatusC.metal_alarm + this.shutdownStatusC.out_poweroff + this.shutdownStatusC.outsourcing + this.shutdownStatusC.prevent_fire + this.shutdownStatusC.other)
          this.totalC = total
          this.pieDataC = {
            columns: ['类型', '停机时间'],
            rows: [
              this.shutdownStatusC.product > 0 ? { '类型': '生产  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.product/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.product } : {},
              this.shutdownStatusC.elec_device > 0 ? { '类型': '设备(电气)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.elec_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.elec_device } : {},
              this.shutdownStatusC.plan_check > 0 ? { '类型': '计划维修  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.plan_check/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.plan_check } : '',
              this.shutdownStatusC.mach_device > 0 ? { '类型': '设备(机械)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.mach_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.mach_device } : {},
              this.shutdownStatusC.metal_alarm > 0 ? { '类型': '金属警报  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.metal_alarm/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.metal_alarm } : {},
              this.shutdownStatusC.out_poweroff > 0 ? { '类型': '外部停电  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.out_poweroff/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.out_poweroff } : {},
              this.shutdownStatusC.outsourcing > 0 ? { '类型': '外包  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.outsourcing/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.outsourcing } : '',
              this.shutdownStatusC.prevent_fire > 0 ? { '类型': '消防  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.prevent_fire/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.prevent_fire } : {},
              this.shutdownStatusC.other > 0 ? { '类型': '其他  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.other/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.other } : {},
              // { '类型': '生产  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.product/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.product },
              // { '类型': '设备(电气)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.elec_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.elec_device },
              // { '类型': '计划维修  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.plan_check/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.plan_check },
              // { '类型': '设备(机械)  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.mach_device/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.mach_device },
              // { '类型': '金属警报  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.metal_alarm/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.metal_alarm },
              // { '类型': '外部停电  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.out_poweroff/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.out_poweroff },
              // { '类型': '外包  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.outsourcing/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.outsourcing },
              // { '类型': '消防  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.prevent_fire/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.prevent_fire },
              // { '类型': '其他  ' + (total > 0 ? ((parseFloat(this.shutdownStatusC.other/total)*100).toFixed(2)) + '%' : '0%'), '停机时间': this.shutdownStatusC.other },
            ]
          }
        }).catch(() => {

        })
      },
      getMaterialConsumptionA(schedule,date){
        MaterialConsumption({schedule:schedule,date:date}).then((res) => {
          this.materialConsumptionA = res.data
        }).catch(() => {

        })
      },
      getMaterialConsumptionB(schedule,date){
        MaterialConsumption({schedule:schedule,date:date}).then((res) => {
          this.materialConsumptionB = res.data
        }).catch(() => {

        })
      },
      getMaterialConsumptionC(schedule,date){
        MaterialConsumption({schedule:schedule,date:date}).then((res) => {
          this.materialConsumptionC = res.data
        }).catch(() => {

        })
      },
    },
  }
</script>

<style scoped lang="stylus">
  .swiper
    width 100%
    height 100%
    .swiper-container
      width 100%
      height 100%
      .table_item
        width 100%
        height 100%
        padding 40px 116px
        display flex
        flex-direction column
        align-items center
        .title
          display flex
          justify-content center
          align-items center
          text-align center
          font-size 34px
          margin-bottom 88px
          color #fff
        .tips
          display flex
          font-size 28px
          color #16CEB9
          margin-bottom 80px
          text-align center
        .content
          width 100%
          display flex
          flex 1
          flex-direction column
          overflow scroll
          .item
            display flex
            padding 40px 0
            flex-direction row
            font-size 26px
            border-bottom 2px solid #454A5A
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
      .bar_item
        width 100%
        height 100%
        padding 40px 116px
        display flex
        flex-direction column
        align-items center
        .title
          fsc 34px #fff
      .circle_item
        display flex
        flex-direction column
        width 100%
        height 100%
        padding 40px 116px
        text-align center
        color #fff
        position relative
        .title
          font-size 34px
          margin-bottom 170px
        .total
          display flex
          justify-content center
          align-items center
          wh 280px 110px
          background #3E485A
          color #fff
          font-size 40px
          margin 10px auto
          position relative
          &:before
            content ''
            wh 0px 0px
            border-left 8px solid transparent
            border-right 8px solid transparent
            border-top 10px solid #3E485A
            position absolute
            bottom -10px
            left 50%
            margin-left -4px
        .content
          display flex
          flex-direction row
          .circle
            flex 1
            justify-content center
            align-items center
            position relative
            .chart_kind
              width 120px
              height 60px
              text-align center
              position absolute
              top 50%
              left 50%
              margin-left -60px
              margin-top -30px
              span
                fsc 28px #fff
              p
                fsc 22px #fff
      .pie_item
        width 100%
        height 100%
        padding 40px 116px
        display flex
        flex-direction column
        align-items center
        .title
          fsc 34px #fff
          margin-bottom 140px
        .ve-ring
          position relative
          margin 0 auto
          .chart_kind
            width 400px
            height 100px
            text-align center
            position absolute
            left 50%
            top 0
            margin-top 160px
            margin-left -200px
            span
              fsc 36px #fff
            p
              fsc 24px #fff
      .line_item
        width 100%
        height 100%
        padding 40px 116px
        display flex
        flex-direction column
        align-items center
        .title
          fsc 34px #fff
          margin-bottom 40px
</style>
<style lang="stylus">
  .el-carousel__indicators
    display none!important
</style>
