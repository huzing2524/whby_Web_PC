<template lang="pug">
  .product_list.w1200.mgauto
    breadcrumb(:breadcrumbList="breadcrumbList")
    .content
      el-table(
        :data="productList"
        border
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
      )
        el-table-column(
          prop="name"
          label="内容"
          width="180"
          align="center"
        )
          template(slot-scope="scope")
            input(v-model="scope.row.name" placeholder="填写内容")
        el-table-column(
          prop="unit"
          label="单位"
          width="180"
          align="center"
        )
          template(slot-scope="scope")
            input(v-model="scope.row.unit" placeholder="填写单位")
        el-table-column(
          prop="name"
          label="操作"
          width="180"
          align="center"
        )
          template(slot-scope="scope")
            p.remove_btn(@click="removeBtnClick(scope.row)") 删除
      .add_btn(@click="addBtnClick") 添加一行
    .btn_box
      el-button(type="primary" @click="bottomBtnClick(0)") 取消
      el-button(type="primary" @click="bottomBtnClick(1)") 保存
</template>

<script>
  import breadcrumb from '_components/breadcrumb'
  import { ProductTargetType } from '_api/product'
  export default {
    components: {
      breadcrumb,
    },
    data() {
      return {
        breadcrumbList: [
          {
            name: '生产目标差异',
            path: '/product/product_target',
          },
          {
            name: '设置内容',
          },
        ],
        productList: [],
      }
    },
    mounted() {
      this.getProductTargetType()
    },
    methods: {
      headerStyle() {
        return 'background-color:#303142;color:#fff;border-bottom: 1px solid #454A5A'
      },
      cellStyle() {
        return 'color:#fff;background-color:#303142;border-bottom: 1px solid #454A5A'
      },
      getProductTargetType() {
        ProductTargetType().then((res) => {
          this.productList = res.data.data
          this.productList.forEach((item, idx) => {
            item.idx = idx
          })
        })
      },
      addBtnClick() {
        this.productList.push({
          name: '',
          unit: '',
          index: this.productList.length,
        })
      },
      removeBtnClick(item) {
        this.productList.splice(item.index, 1)
      },
      bottomBtnClick(idx) {
        if (idx === 0) {
          this.getProductTargetType()
          return
        } else {
          ProductTargetType(
            {
              data: this.productList,
            },
            'post',
          ).then((res) => {
            if (res.data.res === 0) {
              this.$message.success('保存成功')
            }
          })
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .product_list
    .content
      bg #303142
      border-radius 8px
      padding 40px 20px
      margin-top 20px

      .remove_btn
        color #F7517F

      .add_btn
        wh 180px * 3 50px
        display flex
        align-items center
        justify-content center
        color #1E9AFF
        border 1px solid #454A5A
        border-top none

      input
        fsc 16px #FFF
        bg #303142
        text-align center
        display block
        wh 100% 100%

    .btn_box
      margin-top 20px
</style>

<style lang="stylus">
  .product_list
    .content
      .el-table, td, tr, th
        bg #303142
        border 1px solid #454A5A

        &::before, &::after
          bg #454A5A
</style>
