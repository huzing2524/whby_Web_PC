<template lang="pug">
  .board
    .bar_item
      .title A班产量
      BarChart(
      :chartData="outputItem"
      :fontSize="24"
      barWidth="48"
      width="100%"
      height="100%"
      :show="true")
</template>

<script>
  import TableChart from '_components/chart/tableChart/'
  import CircleChart from '_components/chart/circleChart/'
  import BarChart from '_components/chart/barChart/'
  import LineChart from '_components/chart/lineChart/'
  import PieChart from '_components/chart/pieChart/'
  export default {
    data() {
      return {
        outputItem: {
          date: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
          data: [597,370,1479,3020,2702,2585,3321,2584,1485,1579,5475,4541,4547,7851,3652,5201,4145,4785,3254,5474]
        },
      }
    },
    components: {
      TableChart,
      CircleChart,
      BarChart,
      LineChart,
      PieChart,
    },
  }
</script>

<style scoped lang="stylus">
  .board
    width 100%
    height 100%
    display flex
    flex-direction row
    flex-wrap wrap
    .table_item
      width 25%
      //height 33.33%
      display flex
      flex-direction column
      .title
        display flex
        justify-content center
        align-items center
        text-align center
        margin 0 auto
        font-size 16px
        margin-bottom 22px
        color #fff
      .tips
        display flex
        font-size 14px
        color #16CEB9
        margin-bottom 20px
        text-align center
      .content
        width 100%
        height 100%
        display flex
        flex-direction column
        .item
          display flex
          flex-direction row
          font-size 12px
          padding 10px
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
    .circle_item
      display flex
      flex-direction column
      width 25%
      //height 33.33%
      text-align center
      color #fff
      position relative
      .title
        font-size 20px
      .total
        display flex
        justify-content center
        align-items center
        wh 100px 80px
        background #3E485A
        color #fff
        font-size 16px
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
    .bar_item
      width 100%
      display flex
      flex-direction column
      align-items center
      .title
        color #fff
    .line_item
      width 25%
      //height 33.33%
      display flex
      flex-direction column
      align-items center
      .title
        color #fff
    .pie_item
      width 25%
      //height 33.33%
      display flex
</style>
