<template>
  <div class="build-details__root">
    <h2>Build Details <span>{{$route.params.build_id }}</span></h2>

    <div v-if="loading">Loading...</div>
    <div v-if="!loading">
      <div class="status__desc">
        Build status :  {{build.status}}
      </div>
      <pre class="build__pre">
        <p>Details :</p>
        <div>aws_build_id : {{build.aws_build_id}}</div>
        <div>internal_id : {{build.internal_id}}</div>
        <!--<p>aws_build_id : {{build}}</p>-->
        <div>queued_at: {{build.queued_at}} (UTC)</div>
        <div>commit_id_at: {{build.commit_id}}</div>
      </pre>

    </div>
    <div class="row">
      <div class="col-12">
        <div class="btn btn-primary" @click="invalidateBuildStatus()">Invalidate Status</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ba-build-preview :url="buildPreviewLink">

        </ba-build-preview>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import config from '@/config'

import BuildPreview from '@/modules/builds/build-preview.component.vue'
export default {
  components: {
    'ba-build-preview' : BuildPreview,
  },
  data () {
    let buildId = this.$route.params.build_id
    return {
      loading : true,
      buildId,
      build : {}
    }
  },
  computed: {
    buildPreviewLink() {
      return this.build.aws_artifact_path + '/dist/index.html'
    },
  },
  methods: {
    invalidateBuildStatus() {
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
  }
}
</script>
<style scoped>
 .build-details__root {
   max-width: 100%;
   overflow: hidden;
   padding: 1em;
 }
  .build__pre {
    background-color: darkgray;
  }

</style>
