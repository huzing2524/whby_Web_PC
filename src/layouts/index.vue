<template lang="pug">
  .layouts_container.full_box
    Header
    .main.fbox
      router-view
</template>

<script>
  import Header from '_components/header'
  export default {
    components: {
      Header
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="stylus" scoped>
</style>
