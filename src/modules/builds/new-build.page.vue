<template>
  <div class="new-build__root">
    <ba-header activeModule="builds"></ba-header>

    <h4>Run new build</h4>
    <div class="row u-m4">
      <el-checkbox v-model="useCustomCommitId" class="u-mb4">Use custom commitId</el-checkbox>
      <div v-if="useCustomCommitId" class="col-12 col-sm-6">
        <el-input placeholder="Commit hash in GIT" v-model="commitId"></el-input>
      </div>
      <div class="col-12 col-sm-6 u-mt4">
        <el-button v-if="!loading" @click="queueBuild()" class="build-button">Build Application</el-button>
        <el-button v-if="loading" :disabled="true" class="build-button--disabled">Please wait...</el-button>
      </div>
    </div>



  </div>
</template>

<script>
import axios from 'axios'
import BaHeader from '@/components/header.component'
import config from '@/config'
import ElCheckbox from 'element-ui/packages/checkbox/src/checkbox'

export default {
  components: {
    ElCheckbox,
    BaHeader},
  name: 'ba-new-build',
  data () {
    return {
      loading: false,
      commitId: '',
      useCustomCommitId: false,
    }
  },
  methods: {
    queueBuild () {
      this.loading = true

      let commitId = this.useCustomCommitId ? this.commitId : ''
      axios.post(config.build_mobile_app, {commit_id: commitId})
        .then(response => {
          this.$notify({
            title: 'Success',
            message: 'Build has been queued...',
            type: 'success'
          })
          this.$router.back()
        })
        .catch(response => {
          this.$notify.error({
            title: 'Error',
            message: 'Failed to queue build at this time',
          })
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>

</style>