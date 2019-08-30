<template lang="pug">
  .swiper
    <!--swiper(:options="swiperOption")-->
    el-carousel
      <!--swiper-slide-->
        <!--.table_item-->
          <!--.title A班生产日报-->
          <!--.tips 本月计划生产：{{dailyReportA.plan}}m3；本月已完成产量：{{dailyReportA.product}}m3；平均每天需生产：{{dailyReportA.average}}m3-->
          <!--.content-->
            <!--.item-->
              <!--.name-->
              <!--.name 成品产量 (m3)-->
              <!--.name 废品产量 (m3)-->
              <!--.name 创花 (T/m3)-->
              <!--.name MDI (KG/m3)-->
              <!--.name 石蜡 (KG/m3)-->
              <!--.name 增粘剂 (KG/m3)-->
              <!--.name 脱模剂 (KG/m3)-->
            <!--.item(v-for="(item,index) in dailyReportA.data" :key="index")-->
              <!--.items(v-for="(items,indexs) in item" :key="indexs") {{items}}-->
      el-carousel-item
        .bar_item
          .title A班产量
          .barChartA#mountNode
      el-carousel-item
        .bar_item
          .title B班产量
</template>

<script>
  import G2 from '@antv/g2'
  import TableChart from '_components/chart/tableChart/'
  import CircleChart from '_components/chart/circleChart/'
  import BarChart from '_components/chart/barChart/'
  import LineChart from '_components/chart/lineChart/'
  import PieChart from '_components/chart/pieChart/'
  export default {
    name: 'carrousel',
    data() {
      return {
        chart: null,
        barChartAData : [{
          year: '1951 年',
          sales: 38
        }, {
          year: '1952 年',
          sales: 52
        }, {
          year: '1956 年',
          sales: 61
        }, {
          year: '1957 年',
          sales: 145
        }, {
          year: '1958 年',
          sales: 48
        }, {
          year: '1959 年',
          sales: 38
        }, {
          year: '1960 年',
          sales: 38
        }, {
          year: '1962 年',
          sales: 38
        }],
        dailyReportA:{
          plan: '1000',
          product: '1000',
          average: '30',
          data: [
            [
              1,
              597,
              3,
              370,
              14793,
              3020,
              2702,
              2585
            ],
            [
              2,
              610,
              7,
              379,
              15302,
              3117,
              3139,
              2451
            ],
            [
              3,
              512,
              4,
              327,
              13303,
              2692,
              2734,
              2359
            ],
            [
              4,
              512,
              4,
              327,
              13303,
              2692,
              2734,
              2359
            ],
            [
              5,
              512,
              4,
              327,
              13303,
              2692,
              2734,
              2359
            ],
            [
              6,
              512,
              4,
              327,
              13303,
              2692,
              2734,
              2359
            ],
          ]
        },
        outputItem: {
          date: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
          data: [597,370,1479,3020,2702,2585,3321,2584,1485,1579,5475,4541,4547,7851,3652,5201,4145,4785,3254,5474]
        },
        swiperOption: {//swiper3
          autoplay: false,
          loop: true,
          speed: 1000,
        }
      }
    },
    components: {
      TableChart,
      CircleChart,
      BarChart,
      LineChart,
      PieChart,
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData(){
        this.initChart()
      },
      initChart(){
        this.chart = new G2.Chart({
          container: 'mountNode',
          forceFit: true,
          height: window.innerHeight
        })
        this.chart.source(this.barChartAData)
        this.chart.scale('sales', {
          tickInterval: 20
        })
        this.chart.interval().position('year*sales')
        this.chart.render()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .swiper
    width 100%
    height 100%
    background #fff
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
        .barChartA
          width 100%
          height 100%
          display flex
          flex 1
</style>
