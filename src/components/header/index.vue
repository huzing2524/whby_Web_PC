<template lang="pug">
  .header
    .content.w1200.mgauto
      .title 万华板业生产数据管理系统
      .phone {{localStorage.getItem('Phone') || ''}}
      .sign_out(@click="signOut") {{localStorage.getItem('Phone')?'退出':'登录'}}
</template>

<script>
  export default {
    data() {
      return {
        localStorage: window.localStorage,
      }
    },
    methods: {
      signOut() {
        if (!localStorage.getItem('Phone')) {
          this.$router.replace(`/login_signup?isLogin=1`)
          return
        }
        this.$confirm('确认退出？')
          .then(() => {
            localStorage.clear()
            this.$router.replace(`/login_signup?isLogin=1`)
          })
          .catch(() => {})
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .header
    height 80px
    min-width 1200px
    bg #1C1E24
    border-bottom 1px solid #394F65

    .content
      display flex
      align-items center
      height 100%

      .title
        flex 1
        fsc 26px #FFF

      .phone
        fsc 16px #FFF
        margin 0 10px

      .sign_out
        fsc 16px #1E9AFF
</style>