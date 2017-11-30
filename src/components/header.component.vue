<template>
  <div class="header">
    <el-row>
      <el-col :offset="20" :span="1">
        <el-button @click="logout()">Logout</el-button>

      </el-col>

    </el-row>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'ba-header',
  data () {
    return {}
  },
  methods: {
    ...mapActions('login', ['logout'])
  }

}
</script>
<style scoped lang="scss">
</style>