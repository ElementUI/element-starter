<template>
  <div class="builds-list__component">
    <h4>Previous builds:</h4>
    <div class="loading" v-if="loading">Loading...</div>

    <el-table
        :data="builds">
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
          prop="queued_at"
          label="Queued At"
          >
        <template slot-scope="scope">
          <div :title="'Time is local. \n UTC:' + scope.row.queued_at">{{scope.row.queued_at | moment('YYYY-MM-DD HH:mm')}}</div>
        </template>
      </el-table-column>


    </el-table>


    <div class="row builds-list__item build"  v-if="false && !loading" v-for="build in builds">
      <div class="col-12 col-sm-3 build__date">{{build.status}}</div>
      <div class="col-12 col-sm-3 build__status">{{build.queued_at}}</div>
      <div class="col-12 col-sm-3 build__details">
        <a :href="'#/build-details/' + build.id" @click="goLink('build-details/' + build.id)">Details...</a>
      </div>
    </div>

  </div>


</template>

<script>
import axios from 'axios'
import config from '@/config'
import router from '@/router'
import ElButton from 'element-ui/packages/button/src/button'

export default {
  components: {ElButton},
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
