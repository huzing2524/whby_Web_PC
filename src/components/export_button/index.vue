<template lang="pug">
  el-button(@click="clickExport" type="primary" class="eb-header-button") {{buttonTitle}}
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  props:{
    buttonTitle:{
      default: '导出Excel'
    },
    fileNames: {
      default() {
        return []
      }
    },
    fileIds: {
      default() {
        return []
      }
    }
  },
  methods: {
    clickExport() {
      for(let index = 0; index < this.fileIds.length; index ++) {
        console.log("this.fileIds[0]="+this.fileIds[0])
        var wb = XLSX.utils.table_to_book(document.querySelector(`#${this.fileIds[index]}`))
        console.log("wb=" + wb)
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        console.log("wbout=" + wbout[0])
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${this.fileNames[index]}.xlsx`)
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      }
    }
  },

}
</script>

<style lang="stylus" scoped>
  .eb-header-button
    width 108px
    // height 34px
    background-color #1E9AFF
    color #fff
    margin-left 20px


</style>


