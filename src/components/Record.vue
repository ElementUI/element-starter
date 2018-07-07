<template>
  <el-table :data="recordList" :default-sort = "{prop: 'name', order: 'descending'}">
    <el-table-column prop="name" label="名称" sortable align="left">
    </el-table-column>
    <el-table-column prop="result" label="结果" align="left">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      var getTestRecordUrl = this.backendUrl + '/api/test_record'
      var recordList = []
      this.$http.get(getTestRecordUrl).then(Response => {
        this.recordList = Response.data.data
      }, err => {
        console.log(err)
      })
      return {
        recordList: recordList
      }
    }
  }
</script>