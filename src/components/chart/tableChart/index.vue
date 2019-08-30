<template lang="pug">
  .table_chart
    el-table(:data="tableData" style="width: 100%;")
      el-table-column(prop="date" label="")
      el-table-column(prop="chengpin" label="成品产量 (m3)")
      el-table-column(prop="feipin" label="废品产量 (m3)")
      el-table-column(prop="chuanghua" label="创花 (T/m3)")
      el-table-column(prop="MDI" label="MDI (KG/m3)")
      el-table-column(prop="shila" label="石蜡 (KG/m3)")
      el-table-column(prop="zhanji" label="增粘剂 (KG/m3)")
      el-table-column(prop="muji" label="脱模剂 (KG/m3)")
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          date: '6月7日',
          chengpin: 201.45,
          feipin: 2.36,
          chuanghua: 0.52,
          MDI: 29.02,
          shila: 1.88,
          zhanji: 52.00,
          muji: 1.02,
        }, {
          date: '6月8日',
          chengpin: 201.45,
          feipin: 2.36,
          chuanghua: 0.52,
          MDI: 29.02,
          shila: 1.88,
          zhanji: 52.00,
          muji: 1.02,
        }, {
          date: '6月9日',
          chengpin: 201.45,
          feipin: 2.36,
          chuanghua: 0.52,
          MDI: 29.02,
          shila: 1.88,
          zhanji: 52.00,
          muji: 1.02,
        }, {
          date: '6月10日',
          chengpin: 201.45,
          feipin: 2.36,
          chuanghua: 0.52,
          MDI: 29.02,
          shila: 1.88,
          zhanji: 52.00,
          muji: 1.03,
        }]
      }
    }
  }
</script>

<style scoped lang="stylus">
  .table_chart
    width 100%
</style>
<style lang="stylus">
  .table_chart
    .el-table
      background #1C1E24
      color #fff
    .el-table thead
      color #fff
      text-align center
    .el-table .el-table__header
      background-color #1C1E24
    .el-table th
      background-color #1C1E24
      text-align center
    .el-table tr
      background-color #1C1E24
      font-size 26px
    .el-table tr td
      padding 40px 0
      text-align center
    .el-table__body tr:hover>td
      background-color initial!important
    .el-table__row td:first-child
      color #2D99FF
</style>
