<template lang="pug">
  .rights.w1200.mgauto
    breadcrumb(:breadcrumbList="breadcrumbList")
    .btn_box
      el-button(type="primary" @click="toAdd") 新增管理员
    .content
      .item(v-for="(item, idx) in rightsList")
        p {{item.phone}} 
          span(v-if="item.name") （{{item.name}}）
        .item_list
          p(v-for="(rights, idxs) in item.rights") {{rights | getRightName}}
        .item_btn_box(v-if="item.rights.indexOf('1')<0")
          p(@click="btnClick(item, 1)") 修改
          p(@click="btnClick(item, 2)") 删除
    el-dialog(:title="`${isModify?'修改':'新增'}管理员`" width="30%" :visible.sync="isShowDialog")
      el-form
        el-form-item(label="手机号")
          el-input(v-model="phone" autocomplete="off" placeholder="填写手机号" :disabled="isModify")
        el-form-item(label="选择权限")
          br
          el-checkbox-group(v-model="rightsItemList" @change="change")
            el-checkbox(label="2") 系统设置
            el-checkbox(label="3") 数据录入
            el-checkbox(label="4") 报表导入
            el-checkbox(label="5") 报表模板
            el-checkbox(label="6") 基础数据
            el-checkbox(label="7") 报表查询
        el-form-item(label="管理员姓名(选填)")
          el-input(v-model="name" autocomplete="off" placeholder="填写管理员姓名(选填)")
      .dialog-footer(slot="footer")
        el-button(@click="isShowDialog = false") 取 消
        el-button(type="primary" @click="subClick") 确 定
</template>

<script>
  import breadcrumb from '_components/breadcrumb'
  import { Rights } from '_api/rights'
  export default {
    components: {
      breadcrumb,
    },
    data() {
      return {
        breadcrumbList: [
          {
            name: '权限管理',
          },
        ],
        rightsList: [],
        isModify: false,
        isShowDialog: false,

        phone: '',
        name: '',
        rightsItemList: [],
      }
    },
    mounted() {
      this.getRights()
    },
    filters: {
      getRightName(val) {
        let rightName = ''
        switch (parseInt(val)) {
          // 权限 1: 超级管理员, 2: 系统设置, 3: 数据录入, 4: 报表导入, 5: 报表模板, 6: 基础数据, 7: 报表查询
          case 1:
            rightName = '超级管理员'
            break
          case 2:
            rightName = '系统设置'
            break
          case 3:
            rightName = '数据录入'
            break
          case 4:
            rightName = '报表导入'
            break
          case 5:
            rightName = '报表模板'
            break
          case 6:
            rightName = '基础数据'
            break
          case 7:
            rightName = '报表查询'
            break
        }
        return rightName
      },
    },
    methods: {
      getRights() {
        Rights().then((res) => {
          this.rightsList = res.data
        })
      },
      toAdd() {
        this.name = ''
        this.phone = ''
        this.rightsItemList = []
        this.isShowDialog = true
        this.isModify = false
      },
      change() {
        console.log(this.rightsItemList)
      },
      btnClick(item, idx) {
        if (idx === 1) {
          this.name = item.name
          this.phone = item.phone
          this.rightsItemList = item.rights
          this.isModify = true
          this.isShowDialog = true
        } else {
          this.$confirm('确认删除？')
            .then(() => {
              Rights(
                {
                  phone: item.phone,
                },
                'delete',
              ).then((res) => {
                if (res.data.res === 0) {
                  this.$message.success('删除成功')
                  this.getRights()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            })
            .catch(() => {})
        }
      },
      subClick() {
        let type = this.isModify ? 'put' : 'post'
        if (!this.phone) {
          this.$message.error('请输入正确的电话号码')
          return
        }
        Rights(
          {
            phone: this.phone,
            name: this.name,
            rights: this.rightsItemList,
          },
          type,
        ).then((res) => {
          if (res.data.res === 0) {
            this.isShowDialog = false
            this.$message.success(`${this.isModify ? '修改' : '新增'}成功`)
            this.getRights()
          } else {
            this.$message.error(res.data.errmsg)
          }
        })
      },
    },
  }
</script>


<style lang="stylus" scoped>
  .rights
    .btn_box
      display flex
      justify-content flex-end

    .content
      bg #303142
      border-radius 8px
      padding 0 20px 22px
      margin-top 20px

      .item
        height 66px
        border-bottom 1px solid #454A5A
        fsc 16px #FFF
        display flex
        justify-content space-between
        align-items center

        .item_list
          flex 1
          display flex
          justify-content flex-end

          p
            margin-left 20px

        .item_btn_box
          fct()
          padding-left 10px

          p
            margin-left 20px

            &:nth-of-type(1)
              color #1E9AFF

            &:nth-of-type(2)
              color #F7517F
</style>