<template lang="pug">
  .main.w1200
    .content
      span(class="title") 导入数据
      span(class="mini-title") 选择时间
      el-date-picker(v-model="date" :clearable="false" placeholder="选择月份" type="month" class="data-picker")
      span(class="mini-title") 选择班次
      el-checkbox-group(v-model="shiftList" class="check-box")
        el-checkbox(label="A班")
        el-checkbox(label="B班")
        el-checkbox(label="C班")
      .divider
      span(class="mini-title") 选择车间
      el-checkbox-group(v-model="workshopList" class="check-box")
        el-checkbox(label="制板车间")
        el-checkbox(label="砂光车间") 
      .divider
      span(class="mini-title") 上传生产批次表
      el-upload(ref="upload" class="upload-demo" :auto-upload="false" :limit="1" 
      :http-request="uploadExcel"
      action="http://"
      :on-change="handleOnChange")
        el-button(size="small"  type="primary" @click="handleSelect" class="upload-button") 选择文件
        span(v-show="file.length<=0") 未选择任何文件
      .divider
      .button-row
        el-button(@click="cancelHandle" size="large" type="primary" primary style="background-color:#CCCCCC;width:100px;border-color:#cccccc") 取消
        el-button(@click="confirmHandle" size="large" type="primary" style="background-color:#1E9AFF;width:100px") 保存
</template>

<script>
// import {QualityUpload} from '_api/report_import'
export default {
  data() {
    return {
      date:new Date(),
      shiftList:['A班'],
      workshopList:['制板车间'],
      file:'',
    }
  },
  methods: {
    uploadExcel(content) {
      this.$emit('confirmHandle',{file:content.file, date:this.date})
    },
    handleOnChange(file) {
      this.file = file
    },
    handleSelect() {
      this.$refs.upload.clearFiles()
    },
    confirmHandle() {
      this.$refs.upload.submit()
    },
    cancelHandle() {
      this.$emit('cancelHandle')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    z-index 1000
    height 100%
    display flex
    justify-content center
    align-items center
    position fixed
    top 0px
    .content
      border-radius 8px
      background-color #fff
      padding 20px
      width 500px
      display flex
      flex-direction column
      .title
        color #545454
        font-size 18px
        justify-self center
        align-self center
      .mini-title
        color #5C6466
        font-size 14px
        margin-top 20px
      .check-box
        margin-top 10px
      .data-picker
        margin-top 10px
      .divider
        margin-top 20px
        height 1px
        width 100%
        background-color #EEEEEE
      .upload-demo
        margin-top 10px
        display flex
        flex-direction row
        align-items center
      .upload-button
        margin-right 10px
      .button-row
        margin-top 20px
        display flex
        justify-content space-around
        align-items center

</style>


