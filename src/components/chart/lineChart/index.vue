<template lang="pug">
  .line_chart.full_box
    ve-line(
    :legend="legendSettings"
    :colors="colors"
    :xAxis="xAxis"
    :yAxis ="yAxis"
    :width="width"
    :height="height"
    :grid="grid"
    :series="series")
</template>

<script>
  export default {
    data () {
      this.width = this.width
      this.height = this.height
      this.grid = {
        gridType: 'dashed',
        show: this.show,
        borderColor: '#454A5A',
      }
      this.xAxis = [
        {
          type: 'category',
          // data: ['17/6月','18/6月','19/6月','20/6月','21/6月','22/6月','23/6月','24/6月','25/6月',],
          data: this.chartData.date,
          axisLabel: {
            textStyle: {
              color: '#fff',
            }
          },
        }
      ]
      this.yAxis = [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff',
            }
          },
        }
      ]
      this.colors = ['#16CEB9']
      this.legendSettings = {
        show: false,
      }
      // this.chartSettings = {
      //   axisLine:{
      //     show: true,
      //     lineStyle:{
      //       color:'red'
      //     }
      //   },
      //   yAxisName: ['单位:M3/H'],
      //   label: {
      //     show: false,
      //   },
      //   lineStyle: {
      //     type: 'solid',
      //   },
      // }
      this.series = [{
        name: '产量',//每组数据的名字，与图例对应
        // data: [1500, 3530, 2923, 1723, 3792, 4593 , 2923, 3860, 3500],//数据
        data: this.chartData.data,
        type: 'line',
        itemStyle: {
          normal: {
            label: {
              show: true,//折线上显示值
              position: 'top',//显示位置
              textStyle: {
                fontSize: this.fontSize,
                color: '#fff'//值得颜色
              }
            }
          }
        },
        lineStyle: {
          type: 'solid',
        },
      }]
      return {

      }
    },
    props: ['chartData','fontSize','width','height','show']
  }
</script>

<style scoped lang="stylus">
  .pie_chart
    color #fff
</style>
