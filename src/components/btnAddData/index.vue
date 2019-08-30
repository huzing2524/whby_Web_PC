<template lang="pug">
  button(@click="onClick") {{buttonName}}
</template>

<script>
  export default {
    props: {
      buttonName: {
        default: '添加数据'
      }
    },
    methods: {
      onClick() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  button
    wh(160px, 48px)
    border 0
    outline none
    border-radius 16px
    border 1px
    background #1B85FC
    fsc 14px #FFFFFF
    padding 6px 19px
</style>
