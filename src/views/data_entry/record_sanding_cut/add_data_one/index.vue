<template lang="pug">
  .page.w1200.mgauto
    Breadcrumb(:breadcrumbList="breadcrumbList")
    .content
      .content_row
        span(class="label") 详细日期
        el-date-picker(v-model="sandingData.date" :clearable="false" placeholder="选择年份" type="date")
      .content_row
        span(class="label") 班次
        el-radio-group(v-model="sandingData.schedule" )
          el-radio(v-for="item in scheduleList" :key="item.id" :label="item.name" class="radio-label") {{item.name}}
      .content_row
        span(class="label") 上班时间
        el-radio-group(v-model="sandingData.working_time" )
          el-radio(label="早" class="radio-label") 早
          el-radio(label="中" class="radio-label") 中
          el-radio(label="晚" class="radio-label") 晚
      .content_row
        span(class="label") 记录员
        input(placeholder="填写记录人" v-model="sandingData.recorder" class="input")
      .content_row
        span(class="label") 审核人
        input(placeholder="填写审核人" v-model="sandingData.reviewer" class="input")
    .bottom_button
      el-button(@click="cancelHandle" size="large" type="primary" primary class="cancel") 取消
      el-button(@click="nextHandle" size="large" type="primary" primary class="next") 下一步
</template>



<script>
import Breadcrumb from '_components/breadcrumb'
import * as storage from '_common/session_storage'
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbList: [{name:'砂光锯切表',path:'/data_entry/record_sanding_cut'}],
      sandingData: storage.getItem(storage.key.chSandingData),
      scheduleList: storage.getItem(storage.key.chScheduleList)
    }
  },
  methods: {
    cancelHandle() {
      this.$router.go('-1')
    },
    nextHandle() {
      storage.setItem(storage.key.chSandingData, this.sandingData)
      this.$router.push('/data_entry/record_sanding_cut/add_data_two')
    },
  }
} 
</script>

<style lang="stylus" scoped>
  .page 
    .content
      background-color #303142
      padding 0px 20px 20px 20px
      border-radius 8px
      &_row
        width 1160px
        border-bottom 1px solid #454A5A
        height 68px
        display flex
        flex-direction row
        align-items center
        .label
          color #fff
          text-align right
          width 154px
          font-size 16px
          margin-right 40px
        .radio-label
          color #fff
        .input
          background-color #ffffff00
          color #fff
          height 68px
          font-size 16px
    .bottom_button
      margin-top 20px
      display flex
      flex-direction row
      align-items center
      .cancel
        background-color #CCCCCC
        height 34px
        width 108px
        border-color #CCCCCC
        margin-right 12px
      .next
        height 34px
        width 108px
</style>


