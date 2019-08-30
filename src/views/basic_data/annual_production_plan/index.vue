<template lang="pug">
  .annual_production_plan.w1200.mgauto
    breadcrumb(:breadcrumbList="breadcrumbList")
    .btn_box
      .block(v-if="!isModify")
        el-button(type="primary" @click="modifyBtn") 修改表内容
        el-button(type="primary" @click="clickExport") 导出Excel
      .block(v-else)
        el-button(type="primary" @click="cancelBtn") 取消
        el-button(type="primary" @click="toModify") 保存
    .content
      el-table(id="out-table" :data="tableData" :header-cell-style="headerStyle" table-border-color="yellow" :cell-style="cellStyle")
        el-table-column(align="center" :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="(item,idx) in tableHeaders" :key="idx" :prop="idx+''" flex=1)
          template(slot-scope="scope")
            el-date-picker(
              v-model="year"
              type="year"
              :placeholder="scope.row[idx]"
              @change="changeYear"
              v-if="scope.row[idx] === tableData[0][0]"
            )
            span(v-else-if="idx===0") {{scope.row[idx]}}
            span(v-else-if="!isModify") {{scope.row[idx]}}
            input(v-else v-model="scope.row[idx]")
</template>

<script>
  import { AnnualPlanMain } from '_api/basic_data'
  import breadcrumb from '_components/breadcrumb'
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
            name: '年度生产计划',
          },
        ],
        // annualPlanMainData: [],
        tableData: [],
        tableHeaders: [],
        isModify: false,
        year: new Date(this.year).getFullYear(),
      }
    },
    mounted() {
      this.getAnnualPlanMain()
    },
    methods: {
      headerStyle() {
        return 'background-color:#303142;color:#fff;border-bottom: 1px solid #454A5A'
      },
      cellStyle() {
        return 'color:#fff;background-color:#303142;border-bottom: 1px solid #454A5A'
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
            `${this.year}年度生产计划.xlsx`,
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      getAnnualPlanMain() {
        AnnualPlanMain({ year: this.year }).then((res) => {
          // this.annualPlanMainData = res.data
          // this.tableHeaders = res.data.shift()
          this.tableHeaders = res.data[0]
          let array = []
          res.data.map((item) => {
            // let dict = {}
            // item.map((item, index) => {
            //   const key = index + ''
            //   dict[key] = item
            // })
            // array.push(dict)
            array.push(item)
          })
          this.tableData = array
        })
      },
      toModify() {
        AnnualPlanMain(
          {
            update: this.tableData,
          },
          'put',
        ).then(res => {
            if (res.data.res === 0) {
              this.$message.success('修改成功')
            }
        })
      },
      modifyBtn() {
        this.isModify = true
      },
      cancelBtn() {
        if (!this.isModify) {
          return
        }
        this.isModify = false
        this.getAnnualPlanMain()
      },
      changeYear() {
        this.getAnnualPlanMain()
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .annual_production_plan
    .btn_box
      display flex
      justify-content flex-end

    .content
      padding 25px 20px 25px 20px
      margin-top 40px
      // overflow-x scroll
      border-radius 8px
      bg #303142

      input
        fsc 16px #FFF
        bg #303142
        text-align center
        display block
        wh 100% 100%
</style>