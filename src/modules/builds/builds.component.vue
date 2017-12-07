<template>
  <div class="builds-list__component">
    <h2>Builds</h2>

    <div class="loading" v-if="loading">Loading...</div>
      <div class="row builds-list__item build"  v-if="!loading" v-for="build in builds">
        <div class="col-12 col-sm-3 build__date">{{build.status}}</div>
        <div class="col-12 col-sm-3 build__status">{{build.queued_at}}</div>
        <div class="col-12 col-sm-3 build__details">
          <a :href="'#/build-details/' + build.id" @click="goLink('build-details/' + build.id)">Details...</a>
        </div>

      </div>
    <div class="row">
      <div class="col-12 col-sm-6">
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
import axios from 'axios'
import config from '@/config'
import router from '@/router'

export default {
  name: 'baBuildList',
  data () {
    return {
      loading: true,
      builds: [],
      commitId: null,
    }
  },
  methods: {
    goLink (link) {
      router.push({path: link})
    },
    queueBuild () {
      this.loading = true
      axios.post(config.build_mobile_app, {commit_id: this.commitId})
        .then(response => {
          this.loadBuilds()
        })
        .catch(response => {
          this.loading = false
        })
    },
    loadBuilds () {
      this.loading = true
      axios.get(config.list_builds_per_company)
        .then(response => {
          //        debugger
          this.loading = false
          this.builds = response.data
        })
    },
  },
  beforeMount () {
    this.loadBuilds()
  }
}
</script>
<style scoped>
  .builds-list__component {
    padding: 2em;
  }
  .builds-list__item {
    padding: 1em;
  }
  .build__date,
  .build__status,
  .build__details
  {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
