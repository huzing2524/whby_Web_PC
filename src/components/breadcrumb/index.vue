<template lang="pug">
  .breadcrumb
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ path: '/' }") 首页
      el-breadcrumb-item.test(
        v-for="(item, idx) in breadcrumbList"
        :to="item.path"
        :key="idx"
        ) {{item.name}}
</template>

<script>
  /** example
      breadcrumbList: [
        {
          path: '/home',
          name: 'Home',
        },
        {
          path: '/about',
          name: 'About',
        },
      ],
     */
  export default {
    props: ['breadcrumbList'],
  }
</script>

<style lang="stylus" scoped></style>

<style lang="stylus">
  .breadcrumb
    padding 40px 0 20px

    span
      font-size 16px
      color #FFF !important
</style>
