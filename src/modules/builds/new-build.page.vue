<template>
  <div class="new-build__root">
    <ba-header activeModule="builds"></ba-header>

    <h4>Run new build</h4>
    <div class="row">
      <el-checkbox v-model="useCustomCommitId" class="u-mb4">Use custom commitId</el-checkbox>
      <div v-if="useCustomCommitId" class="col-12 col-sm-6">
        <input type="text" placeholder="Commit Hash... (or master)" v-model="commitId" class="form-input">
      </div>
      <div class="col-12 col-sm-6">
        <el-button v-if="!loading" @click="queueBuild()" class="build-button">Build Application</el-button>
        <el-button v-if="loading" :disabled="true" class="build-button--disabled">Please wait...</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import BaHeader from '@/components/header.component'
import ElCheckbox from 'element-ui/packages/checkbox/src/checkbox'

export default {
  components: {
    ElCheckbox,
    BaHeader},
  name: 'ba-new-build',
  data() {
    return {
      loading: false,
      commitId: '',
      useCustomCommitId: false,
    }
  },
}
</script>

<style scoped>

</style>