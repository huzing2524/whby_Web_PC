<template lang="pug">
  .bar_chart.full_box
    ve-histogram(
    :data="chartData"
    width="100%"
    height="100%"
    :extend="extend"
    :legend="legendSettings")
</template>

<script>
  import Bus from '@/bus'
  export default {
    // props: ['barWidth','width','height','show'],
    mounted(){
      Bus.$on('dataA',(data)=>{
        this.fontSize = data.fontSize
        this.width = data.width
        this.height = data.height
        this.barWidth = data.barWidth
        this.xdata = data.data.date
        this.ydata = data.data.data
        this.flag = true
        let dataList = []
        for(let i = 0;i<this.xdata.length;i++){
          let obj = {}
          for(let j = 0;j<this.ydata.length;j++){
            if(i==j){
              obj.name = this.xdata[i]
              obj.value = this.ydata[j]
              dataList.push(obj)
            }
          }
        }
        this.chartData.rows = dataList
      })
      Bus.$on('dataB',(data)=>{
        this.fontSize = data.fontSize
        this.width = data.width
        this.height = data.height
        this.barWidth = data.barWidth
        this.xdata = data.data.date
        this.ydata = data.data.data
        this.flag = true
        let dataList = []
        for(let i = 0;i<this.xdata.length;i++){
          let obj = {}
          for(let j = 0;j<this.ydata.length;j++){
            if(i==j){
              obj.name = this.xdata[i]
              obj.value = this.ydata[j]
              dataList.push(obj)
            }
          }
        }
        this.chartData.rows = dataList
      })
    },
    data () {
      // this.width = '100%'
      // this.height = '100%'
      this.extend = {
        'xAxis.0.axisLabel.fontSize': 24,
        'xAxis.0.axisLabel.color': '#fff',
        'yAxis.0.axisLabel.fontSize': 24,
        'yAxis.0.axisLabel.color': '#fff',
      }
      this.width = this.width
      this.height = this.height
      this.grid = {
        show: false,
        borderColor: '#454A5A',
      }
      this.xAxis = [
        {
          type: 'category',
          // data: ['06.01','06.02','06.03','06.04','06.05','06.06','06.07','06.08','06.09'],
          // data: this.xdata,
          axisLabel: {
            textStyle: {
              // fontSize: 24,
              fontSize: this.fontSize,
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
              // fontSize: 24,
              fontSize: this.fontSize,
              color: '#fff',
            }
          },
        }
      ]
      // this.series = [{
      //   name: '产量',//每组数据的名字，与图例对应
      //   // data: [20, 20, 22, 18, 22, 15 , 18, 17, 25],//数据
      //   data: this.ydata,
      //   type: 'bar',//柱状图
      //   itemStyle: {
      //     normal: {
      //       color: '#16CEB9',//设置柱子颜色
      //       label: {
      //         show: true,//柱子上显示值
      //         position: 'top',//值在柱子上方显示
      //         textStyle: {
      //           // fontSize: 24,
      //           fontSize: this.fontSize,
      //           color: '#fff'//值得颜色
      //         }
      //       }
      //     }
      //   },
      //   barWidth: 48,//设置柱子宽度，单位为px
      //   // barWidth: this.barWidth,//设置柱子宽度，单位为px
      // }]
      this.legendSettings = {
        show: false,
      }
      // this.chartSettings = {
      //   color: '#fff',
      //   yAxisName: ['单位:M3'],
      //   label: {
      //     show: false,
      //   },
      //   itemStyle: {
      //     color : '#fff',//柱条颜色
      //     barBorderRadius: [5, 5, 0, 0],//柱条圆角
      //   },
      // }
      return {
        flag: false,
        width: '',
        height: '',
        barWidth: 0,
        fontSize: 0,
        xdata: [],
        ydata: [],
        chartData: {
          // columns: this.xdata,
          // rows: this.ydata,
          columns: ['name','value'],
          rows: [{
            name: '',
            value: '',
          }]
        },
      }
    },
  }
</script>

<style scoped lang="stylus">
  .pie_chart
    color #fff!important
</style>
