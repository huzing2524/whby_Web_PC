<template lang="pug">
  .circle_chart
    ve-ring(:data="chartData" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings")
    .chart_kind
      span {{parseFloat((data/total)*100).toFixed(2) + '%'}}
      p {{kind}}
</template>

<script>
  // import Bus from '@/bus'
  export default {
    data() {
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
      return {
        value: 0,
        chartData: {
          columns: ['name', 'percent'],
          rows: [
            {'name': '', 'percent': this.data},
            {'name': '', 'percent': (this.total-this.data)},
          ]

        },
      }
    },
    mounted(){

    },
    watch:{
      data(val){
        // console.log(this.data);
        // console.log(this.total);
        this.value = val
      }

    },
    props: ['data','total','kind']
  }
</script>

<style scoped lang="stylus">
  .circle_chart
    width 100%
    height 100%
    position relative
    .chart_kind
      width 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      position absolute
      top 44%
      span
        font-size 16px
        color #fff
        margin-bottom 10px
      p
        font-size 14px
        color #fff
</style>
