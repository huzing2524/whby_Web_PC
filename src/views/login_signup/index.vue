<template lang="pug">
  .login_signup.full_box
    .content
      .title {{isLogin?'登录':'注册'}}
      .input_box
        el-input(
          placeholder="请输入手机号"
          v-model="phone"
          clearable)
      .input_box
        el-input(
          placeholder="请输入密码"
          v-model="password"
          clearable
          show-password)
      .input_box(v-if="!isLogin")
        el-input(
          placeholder="请输入验证码"
          v-model="code"
          clearable)
          el-button(slot="append" type="primary" @click="toSendSms") 获取验证码
      .input_box
        el-button(type="primary" round width="100%" @click="toOtherBt(1)") {{isLogin?'登录':'注册'}}
      .input_box
        .to_other
          el-link(type="info" @click="toOtherBt(2)") {{isLogin?'注册':'登录'}}
</template>

<script>
  import { Login, SignUp, SendSms } from '_api/login_signup'
  import { Base64 } from 'js-base64'
  import { SetDefaultHeader } from '_common/http'
  export default {
    data() {
      return {
        isLogin: false,
        phone: '',
        password: '',
        code: '',
      }
    },
    mounted() {
      if (parseInt(this.$route.query.isLogin)) {
        this.isLogin = true
      }
    },
    methods: {
      toLogin() {
        if (!this.phone) {
          this.$message.error('请输入手机号')
          return
        }
        if (!this.password) {
          this.$message.error('请输入密码')
          return
        }
        SetDefaultHeader(
          'Authorization',
          Base64.encode(`${this.phone}:${this.password}`),
        )
        Login().then((response) => {
          let res = response.data
          if (res.res === '0') {
            this.$message.success('登录成功')
            let authorization = 'Basic ' + res.jwt
            localStorage.setItem('Authorization', authorization)
            localStorage.setItem('Phone', this.phone)
            localStorage.setItem('UserName', this.phone)
            SetDefaultHeader('Authorization', authorization)
            if (this.$route.query.from) {
              this.$router.replace(this.$route.query.from)
            } else {
              this.$router.replace('/home')
            }
          } else {
            this.$message.error(res.errmsg)
          }
        })
      },
      toSignUp() {
        if (!this.phone) {
          this.$message.error('请输入手机号')
          return
        }
        if (!this.password) {
          this.$message.error('请输入密码')
          return
        }
        if (!this.code) {
          this.$message.error('请输入验证码')
          return
        }
        SignUp(
          {
            phone: this.phone,
            password: this.password,
            code: this.code,
          },
          'post',
        ).then((res) => {
          if (res.data.res === '0') {
            this.$message.success('注册成功')
            this.$router.replace(
              `/login_signup?isLogin=1&from=${
                this.$route.query.from ? this.$route.query.from : '/home'
              }`,
            )
          } else {
            this.$message.error(res.data.errmsg)
          }
        })
      },
      toSendSms() {
        if (!this.phone) {
          this.$message.error('请输入手机号')
          return
        }
        SendSms({
          id: this.phone,
          type: 'signup',
        }).then((res) => {
          if (res.data.res === '0') {
            this.$message.success('发送成功')
          } else {
            this.$message.error(res.data.errmsg)
          }
        })
      },
      toOtherBt(idx) {
        if (idx === 1) {
          if (this.isLogin) {
            this.toLogin()
          } else {
            this.toSignUp()
          }
        } else {
          this.$router.replace(
            `/login_signup?isLogin=${this.isLogin ? '0' : '1'}&from=${
              this.$route.query.from ? this.$route.query.from : '/home'
            }`,
          )
          this.isLogin = !this.isLogin
        }
      },
    },
  }
</script>

<style lang="stylus">
  .login_signup
    bg url('./bg.png') center
    background-size cover
    fct()

    .content
      bgf()
      width 560px
      border-radius 8px
      padding 40px 112px

      .title
        fsc 26px #333333
        text-align center

      .input_box
        margin-top 26px

        .el-button
          width 100%

        .to_other
          fsc 16px #666666
          text-align center
</style>