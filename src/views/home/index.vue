<template lang="pug">
  .home.w1200.mgauto
    .menu_box
      .title 基础数据
      .menu_list
        router-link.menu_item(to="/basic_data/annual_production_plan")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconnianhua")
          p 年度生产计划
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconchanliao")
          p 产品资料
        router-link.menu_item(to="/basic_data/schedule")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconbanci")
          p 班次
        router-link.menu_item(to="/basic_data/workshop")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconchejian")
          p 车间
        router-link.menu_item(to="/basic_data/section")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#icongongduan")
          p 工段
    .menu_box.mgl30
      .title 报表导入
      .menu_list
        router-link.menu_item(to="/report_import/product_patch")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconshengpi")
          p 生产批次
        router-link.menu_item(to="/report_import/product_instock")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconchanji")
          p 产品入库质量等级统计
    .menu_box
      .title 数据导入
      .menu_list
        router-link.menu_item(to="/data_entry/record_press_run")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconyalu")
          p 压机运行记录
        router-link.menu_item(to="/data_entry/material_consumption_table")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconwubiao")
          p 物料消耗表
        router-link.menu_item(to="/data_entry/record_sanding_cut")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconshabiao")
          p 砂光锯切记录表
        router-link.menu_item(to="/data_entry/record_press_operation")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconyalu1")
          p 压机操作记录
        router-link.menu_item(to="/data_entry/material_consumption")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconyalu")
          p 物资消耗
        router-link.menu_item(to="/data_entry/record_shutdown")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconyalu1")
          p 停机记录
    .menu_box.mgl30
      .title 报表模板
      .menu_list
        router-link.menu_item(to="/product/product_target")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconshengyi")
          p 生产目标差异
    .menu_box
      .title 系统设置
      .menu_list
        router-link.menu_item(to="/rights")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconquanli")
          p 权限管理
    .menu_box.mgl30
      .title 车间看板
      .menu_list
        router-link.menu_item(to="/farm_board")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconzhiban")
          p 制板车间
    .menu_box
      .title 报表查询
      .menu_list
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconshibu")
          p 市场部
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconzibu")
          p 资源部
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconcaibu")
          p 采购部
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconpinbu")
          p 品控部
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconwuxin")
          p 物流中心
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconqihe")
          p 企业经营综合
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconbeijian")
          p 备料车间
    .menu_box
      .menu_list
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconnengjian")
          p 能源车间
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconzhijian")
          p 制版车间
        .menu_item
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconshajian")
          p 砂光车间
</template>

<script>

  export default {
    name: 'home',
    components: {
    },
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .home
    padding 10px 0
    display flex
    flex-wrap wrap
    .menu_box
      display inline-flex
      flex-direction column
      margin-top 30px
      &.mgl30
        margin-left 30px
      .title
        fsc 20px #5C6466
      .menu_list
        display inline-flex
        flex-wrap wrap
        padding 14px 30px 14px 30px
        margin-top 10px
        border-radius 8px
        bg #303142
        .menu_item
          width 150px
          // margin-right 100px
          display flex
          flex-direction column
          align-items center
          .icon
            wh 50px 50px
          p
            fsc 14px #FFF
            margin-top 12px
</style>
