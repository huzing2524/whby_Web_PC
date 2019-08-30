<template lang="pug">
  .hrb-input-content
    el-button(v-for="(item,index) in titleArray" :key="item.id" @click="onClick(index)" type="primary" class="hrb-header-button") {{item}}
</template>

<script>
export default {
  props:['titleArray'],
  methods: {
    onClick(index) {
      this.$emit('onClick',index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .hrb-input-content
    // height 34px
    display flex
    flex-direction row-reverse
    .hrb-header-button
      width 108px
      // height 34px
      background-color #1E9AFF
      color #fff
      margin-left 20px
</style>


