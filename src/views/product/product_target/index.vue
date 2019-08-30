<template lang="pug">
  .product_target.w1200.mgauto
    breadcrumb(:breadcrumbList="breadcrumbList")
    .btn_box
      .block(v-if="!isModify")
        el-button(type="primary" @click="$router.push('/product/product_list')") 设置内容
        el-button(type="primary" @click="modifyBtn") 修改表内容
        //- el-button(type="primary" @click="clickExport") 导出Excel
      .block(v-else)
        el-button(type="primary" @click="cancelBtn") 取消
        el-button(type="primary" @click="toModify") 保存
    .content
      .table_box
        el-table(
          :data="productList"
          border
          style="width: 100%"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle"
        )
          el-table-column(
            prop="name"
            width="120"
            label="2019"
            align="center"
          )
            template(slot-scope="scope")
              p {{scope.row.idx}}
          el-table-column(
            prop="name"
            width="120"
            label="内容"
            align="center"
          )
            template(slot-scope="scope")
              p {{scope.row.name}}
      .table_box.right
        el-table(
          :data="productTargetList"
          border
          style="width: 100%"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle"
        )
          el-table-column(
            prop="name"
            label="上月实际值"
            width="180"
            align="center"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[0]" placeholder="填写内容")
              p(v-else) {{scope.row[0] || '0'}}
          el-table-column(
            prop="name"
            label="本月目标值"
            width="180"
            align="center"
            height="50px"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[1]" placeholder="填写内容")
              p(v-else) {{scope.row[1]}}
          el-table-column(
            prop="name"
            label="本月实际值"
            width="180"
            align="center"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[2]" placeholder="填写内容")
              p(v-else) {{scope.row[2]}}
          el-table-column(
            prop="name"
            label="目标差异值"
            width="180"
            align="center"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[3]" placeholder="填写内容")
              p(v-else) {{scope.row[3]}}
          el-table-column(
            prop="name"
            label="环比"
            width="180"
            align="center"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[4]" placeholder="填写内容")
              p(v-else) {{scope.row[4]}}
          el-table-column(
            prop="name"
            label="同比"
            width="180"
            align="center"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[5]" placeholder="填写内容")
              p(v-else) {{scope.row[5]}}
          el-table-column(
            prop="name"
            label="说明"
            width="180"
            align="center"
          )
            template(slot-scope="scope")
              input(v-if="isModify" v-model="scope.row[6]" placeholder="填写内容")
              p(v-else) {{scope.row[6] || ''}}

</template>

<script>
  import breadcrumb from '_components/breadcrumb'
  import { ProductTarget, ProductTargetType } from '_api/product'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
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
        ],
        isModify: false,
        productList: [],
        productTargetList: [],
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
          this.getProductTarget()
        })
      },
      getProductTarget() {
        ProductTarget().then((res) => {
          this.productTargetList = res.data.data
          if (this.productTargetList.length < this.productList.length) {
            let len = this.productList.length - this.productTargetList.length
            for (let i = 0; i < len; i++) {
              this.productTargetList.push(['0', '', '', '', '', ''])
            }
          }
          // this.productList.map((item, idx) => {
          //   console.log(item)

          //   this.productTargetList.map((items, idxs) => {
          //     item.push(items)
          //   })
          // })
        })
      },
      modifyBtn() {
        this.isModify = true
      },
      clickExport() {
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array',
        })
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: 'application/octet-stream' }),
            `产品入库质量等级统计${this.year}年${this.currentMonth + 1}月.xlsx`,
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      cancelBtn() {
        if (!this.isModify) {
          return
        }
        this.isModify = false
        this.getProductTargetType()
      },
      toModify() {
        ProductTarget(
          {
            month: '201906',
            data: this.productTargetList,
          },
          'post',
        ).then((res) => {
          if (res.data.res === 0) {
            this.$message.success('保存成功')
            this.isModify = false
          }
        })
      },
    },
  }
</script>

<style lang="stylus">
  .product_target
    .btn_box
      display flex
      justify-content flex-end

    .content
      padding 25px 20px 25px 20px
      margin-top 40px
      // overflow-x scroll
      border-radius 8px
      bg #303142
      display flex

      .table_box.right
        overflow scroll

      input, p
        fsc 16px #FFF
        bg #303142
        text-align center
        wh 100% 100%
</style>