<template>
  <div>
    Android promotions
    <el-tag
      v-loading="loading"
      style="min-width: 100px;"
      class="u-text--center"
      type="success"
      close-transition>PROD: {{prodBuild | capitalize}}</el-tag>
    <el-tag
      v-loading="loading"
      style="min-width: 100px;"
      class="u-text--center"
      type="primary"
      close-transition>BETA: {{betaBuild | capitalize}}</el-tag>
  </div>
</template>


</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'AndroidVersionList',
  data () {
    return {
      loading: true,
      builds: {},
      loadAndroidTimerRef: null
    }
  },
  computed: {
    prodBuild () {
      return this.builds && this.builds.production? this.builds.production: 'None'
    },
    betaBuild () {
      return this.builds && this.builds.beta? this.builds.beta: 'None'
    }
  },
  methods: {
    loadAndroidPromotesState () {
      this.loading = true
      clearTimeout(this.loadAndroidTimerRef)
      axios.get(config.android_promotes)
        .then(response => {
          this.builds = response.data
          this.loading = false
          this.loadAndroidTimerRef = setTimeout(this.loadAndroidPromotesState, 60000)
        })
    },
  },
  beforeMount () {
    this.loadAndroidPromotesState()
  },
  beforeDestroy () {
    clearTimeout(this.loadAndroidTimerRef)
  }
}
</script>

