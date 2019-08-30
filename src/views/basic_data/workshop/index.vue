<template lang="pug">
  .workshop.w1200.mgauto
    breadcrumb(:breadcrumbList="breadcrumbList")
    .btn_box
      el-button(type="primary" @click="toAdd") 添加车间
    .content
      .title.item
        p 编码
        p 车间名称
        p 操作
      .item(v-for="(item, idx) in workshopList")
        p {{item.id}}
        p {{item.name}}
        .item_btn_box
          p(@click="btnClick(item, 1)") 修改
          p(@click="btnClick(item, 2)") 删除
    el-dialog(:title="`${isModify?'修改':'添加'}车间`" width="30%" :visible.sync="isShowDialog")
      el-form
        el-form-item(label="车间名称" :label-width="formLabelWidth")
          el-input(v-model="name" autocomplete="off" placeholder="填写车间名称")
        el-form-item(label="编码" :label-width="formLabelWidth")
          el-input(v-model="id" autocomplete="off" placeholder="填写编码")
      .dialog-footer(slot="footer")
        el-button(@click="isShowDialog = false") 取 消
        el-button(type="primary" @click="subClick") 确 定
</template>

<script>
  import breadcrumb from '_components/breadcrumb'
  import { WorkshopMain } from '_api/basic_data'
  export default {
    components: {
      breadcrumb,
    },
    data() {
      return {
        breadcrumbList: [
          {
            name: '车间',
          },
        ],
        workshopList: [],
        name: '',
        id: '',
        uuid: '',
        isShowDialog: false,
        formLabelWidth: '80px',
        isModify: false,
      }
    },
    mounted() {
      this.getWorkshopMain()
    },
    methods: {
      getWorkshopMain() {
        WorkshopMain().then((res) => {
          this.workshopList = res.data
        })
      },
      btnClick(item, idx) {
        if (idx === 1) {
          this.name = item.name
          this.id = item.id
          this.uuid = item.uuid
          this.isModify = true
          this.isShowDialog = true
        } else {
          this.$confirm('确认删除？')
            .then(() => {
              WorkshopMain(
                {
                  uuid: item.uuid,
                },
                'delete',
              ).then((res) => {
                if (res.data.res === 0) {
                  this.$message.success('删除成功')
                  this.getWorkshopMain()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            })
            .catch(() => {})
        }
      },
      toAdd() {
        this.name = ''
        this.id = ''
        this.isShowDialog = true
        this.isModify = false
      },
      subClick() {
        let type = this.isModify ? 'put' : 'post'
        if (!this.id) {
          this.$message.error('请输入正确的id')
          return
        }
        if (!this.name) {
          this.$message.error('请输入正确的name')
          return
        }
        WorkshopMain(
          {
            uuid: this.uuid || '',
            id: this.id,
            name: this.name,
          },
          type,
        ).then((res) => {
          this.isShowDialog = false
          if (res.data.res === 0) {
            this.$message.success(`${this.isModify ? '修改' : '添加'}成功`)
            this.getWorkshopMain()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .workshop
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
        justify-content space-around
        align-items center

        >p
          flex 1
          fct()

        .item_btn_box
          flex 1
          fct()

          p
            margin 0 7px

            &:nth-of-type(1)
              color #1E9AFF

            &:nth-of-type(2)
              color #F7517F
</style>