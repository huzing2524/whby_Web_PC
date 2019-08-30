<template lang="pug">
  el-row(class="table-row")
    el-date-picker(v-model="mCurrentYear" :clearable="false" placeholder="选择年份" type="year" class="data-picker" @change="selectYear()" value-format="yyyy")
    el-button(v-for="item,index in dataList" :key="item" :style="index==mCurrentMonth?{backgroundColor:'#1E9AFF'}:{}" @click="selectMonth(index)" type="primary" plain class="main-button") {{`${item}月`}}
</template>

<script>
  export default {
    props: {
      dataList: {
        type: Array,
        required: true,
        default() {
          return [1,2,3,4,5,6,7,8,9,10,11,12]
        },
      },
      currentYear: {
        required: false,
        default() {
          return new Date().getFullYear()
        },
      },
      currentMonth: {
        required: false,
        default() {
          return new Date().getMonth()
        }
      },
    },
    data() {
      return{
        // 因为父组件传递进来的属性不支持进行双向绑定，所以要多创建一个属性副本mCurrentMonth，mCurrentYear来进行操作。
        mCurrentMonth: this.currentMonth,
        mCurrentYear: this.currentYear,
      }
    },
    watch: { // https://www.cnblogs.com/cpqwebfe/p/7727715.html
      /**
       * 为了支持双向绑定，在组件外（父组件）修改了组件的props，会同步到组件内对应的props上，但是不会同步到你刚刚在data对象
       * 中创建的那个副本mCurrentMonth上，所以需要再创建一个针对props属性mCurrentMonth的watch（监听），
       * 当props修改后对应data中的副本mCurrentMonth也要同步数据。
        */
      currentMonth(newValue) {
        this.mCurrentMonth = newValue
      }
    },
    methods: {
      selectMonth(index) {
        this.mCurrentMonth = index
        this.$emit('onItemClick',this.mCurrentMonth)
      },
      // 年份选择器回调监听，已经有this.year双向绑定了，所以返回值不需要也没写
      selectYear() {
        this.$emit('onYearChooice', this.mCurrentYear)
      },
    },

  }
</script>

<style lang="stylus" scoped>
  .table-row
    display flex
    flex-direction row
    .data-picker
      width 120px
      margin-right 20px
      height 38px
    .main-button
      width auto
      background-color #ffffff00
      color #fff
      border-color #1E9AFF
      margin-right 20px
      margin-bottom 10px
      font-size 16px
</style>
