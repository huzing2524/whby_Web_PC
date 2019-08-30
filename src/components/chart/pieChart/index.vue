<template lang="pug">
  .pie_chart(:class="size? 'margin': ''")
    ve-ring(:data="chartData" :legend="legendSettings" :settings="chartSettings" :width="width" :height="height")
    .chart_kind(:class="size? 'top': ''")
      span(:class="size? 'bigFontSize': ''") {{data.total_time}}分钟
      p(:class="size? 'smallFontSize': ''") 总共停机
</template>

<script>
  export default {
    data () {
      this.width = this.width
      this.height = this.height
      this.legendSettings = {
        show: this.show,
        icon: 'roundRect',
        itemWidth: 16,
        itemHeight: 16,
        right: '10%',
        bottom: '-10%',
        orient: 'vertical',
        selectedMode: true,
        selected: true,
        textStyle: {
          fontSize: this.fontSize,
          color: '#fff',
          padding: [6,10],
        },
      }
      this.chartSettings = {
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
        // radius: ['130', '180'],
        radius: [this.in, this.out],
        hoverAnimation: true,
        stillShowZeroSum: true,
      }
      return {
        chartData: {
          columns: ['类型', '停机时间'],
          rows: [
            { '类型': '生产', '停机时间': this.data.product },
            { '类型': '设备(电气)', '停机时间': this.data.elec_device },
            { '类型': '计划维修', '停机时间': this.data.plan_check },
            { '类型': '设备(机械)', '停机时间': this.data.mach_device },
            { '类型': '金属警报', '停机时间': this.data.metal_alarm },
            { '类型': '外部停电', '停机时间': this.data.out_poweroff },
            { '类型': '外包', '停机时间': this.data.outsourcing },
            { '类型': '消防', '停机时间': this.data.prevent_fire },
            { '类型': '其他', '停机时间': this.data.other },
          ]
        }
      }
    },
    props: ['data','out','in','fontSize','show','size']
  }
</script>

<style scoped lang="stylus">
  .pie_chart
    width 100%
    height 100%
    color #fff
    position relative
    &.margin
      margin-top -90px
    .chart_kind
      width 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      position absolute
      top 20%
      &.top
        top 90%
      span
        font-size 36px
        color #fff
        margin-bottom 10px
        &.bigFontSize
          font-size 14px
      p
        font-size 24px
        color #fff
        &.smallFontSize
          font-size 12px
</style>
