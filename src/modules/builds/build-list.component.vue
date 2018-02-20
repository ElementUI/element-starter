<template>
  <div class="builds-list__component">
    <div class="loading" v-if="loading">Loading...</div>
    <android-version-list></android-version-list>
    <h4 v-if="builds && builds.length > 0">Previous builds:</h4>
    <el-table v-loading="loadingTable" v-if="builds && builds.length > 0" :data="builds">
      <el-table-column
          label="Operations"
          width="180">
        <template slot-scope="scope">
          <a :href="'/build-details/' + scope.row.id" @click="$event.preventDefault()">
            <el-button @click="$router.push({ name: 'build-details', params: { buildId: scope.row.id}})">
            Details
            </el-button>
          </a>
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="Status"
          width="180">
        <template slot-scope="scope">
          <ba-status-label :build="scope.row"></ba-status-label>

        </template>
      </el-table-column>
      <el-table-column
              prop="build_number"
              label="#"
              width="180">
        <template slot-scope="scope">
          {{scope.row.version}}.{{scope.row.build_number}}
        </template>
      </el-table-column>
      <el-table-column
          prop="queued_at"
          label="Queued At"
          >
        <template slot-scope="scope">
          <div :title="'Time is local. \n UTC:' + scope.row.queued_at">{{scope.row.queued_at | moment('YYYY-MM-DD HH:mm')}}</div>
        </template>
      </el-table-column>


    </el-table>

    <h3 class="c-heading u-text--center" v-if="builds && builds.length === 0">There are no builds to show...</h3>

  </div>


</template>

<script>
import axios from 'axios'
import config from '@/config'
import router from '@/router'
import ElButton from 'element-ui/packages/button/src/button'
import AndroidVersionList from './android-version.component'
import _ from 'lodash'

export default {
  components: {ElButton, 'android-version-list': AndroidVersionList},
  name: 'baBuildList',
  data () {
    return {
      timerRef: null,
      loading: true,
      loadingTable: false,
      builds: [],
      commitId: null,
    }
  },
  methods: {
    goLink (link) {
      router.push({path: link})
    },
    loadBuilds () {
      this.loadingTable = true
      axios.get(config.list_builds_per_company)
        .then(response => {
          this.loadingTable = false
          this.loading = false
          this.builds = response.data
          let pendingBuildsExist = _.some(
            this.builds, (build) => { return ['queued', 'IN_PROGRESS'].indexOf(build.status) !== -1 }
          )
          if (pendingBuildsExist) {
            this.timerRef = setTimeout(this.loadBuilds, 15000)
          } else {
            this.timerRef = setTimeout(this.loadBuilds, 60000)
          }
        })
    },
  },
  beforeMount () {
    this.loading = true
    this.loadBuilds()
  },
  beforeDestroy () {
    clearTimeout(this.timerRef)
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
