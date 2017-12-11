<template>
  <div class="build-details">
    <ba-header activeModule="builds"></ba-header>
    <div v-loading="loading" class="build-details__root ">
      <h2 class="u-text--center">Build Details</h2>
      <div class="controls-container u-text--center">
        <el-button  icon="el-icon-refresh" @click="invalidateBuildStatus()">Invalidate Status</el-button>
      </div>
      <div class="u-text--center u-mt3"><ba-status-label v-if="build" :build="build"></ba-status-label></div>


      <div v-if="loading">Loading...</div>
      <div v-if="!loading && build">
        <div class="u-text--right">
          <el-checkbox  v-model="showBuildTechnicalDetails">Show Build Technical Details</el-checkbox>
        </div>
        <el-collapse-transition>
          <div v-show="showBuildTechnicalDetails">

            <pre class="build__pre u-px4">
            <div>Build status : {{build.status}}</div>
            <div>aws_build_id : {{build.aws_build_id}}</div>
            <div>internal_id : {{build.internal_id}}</div>
            <div>queued_at: {{build.queued_at | moment('YYYY-MM-DD HH:mm')}}</div>
            <div>queued_at (UTC): {{build.queued_at}} (UTC)</div>
            <div>commit_id: {{build.commit_id ? build.commit_id : '[master]'}}</div>
            </pre>
          </div>

        </el-collapse-transition>

      </div>
      <div class="row" v-if="!loading && build">
        <div class="col-12">
        </div>
        <div class="col-12">
          <h3 class="u-text--center u-mt4">Build Preview</h3>

          <ba-build-preview :url="buildPreviewLink">
          </ba-build-preview>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

import config from '@/config'

import BuildPreview from './build-preview.component.vue'
import ElTag from 'element-ui/packages/tag/src/tag'

export default {
  components: {
    ElTag,
    'ba-build-preview': BuildPreview,
  },
  data () {
    let buildId = this.$route.params.buildId
    return {
      loading: true,
      buildId,
      showBuildTechnicalDetails: false,
      build: {},
    }
  },
  computed: {
    buildPreviewLink () {
      return this.build.aws_artifact_path + '/dist/index.html'
    },
  },
  methods: {
    invalidateBuildStatus () {
      this.loading = true
      axios.patch(config.builds_details + this.buildId + '/')
        .then(response => {
          this.loading = false
          this.build = response.data
        })
    },
  },
  beforeMount () {
    axios.get(config.builds_details + this.buildId + '/')
      .then(response => {
        this.build = response.data
        this.loading = false
      })
    //  this.loading
  },
}
</script>
<style scoped>
  .build-details__root {
    /*max-width: 100%;*/
    /* todo */
    /*overflow: hidden;*/
    /*padding: 1em;*/
  }

  .build__pre {
    background-color: #eeeeee;

  }

</style>
