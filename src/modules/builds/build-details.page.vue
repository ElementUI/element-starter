<template>
  <div class="build-details">
    <ba-header activeModule="builds"></ba-header>
    <div v-loading="loading" class="build-details__root ">
      <div class="u-pt4"></div>
      <div class="u-pt4"></div>
      <h2 class="u-text--center">Build Details</h2>
      <div class="controls-container u-text--center">
        <el-button  icon="el-icon-refresh" @click="invalidateBuildStatus()">Invalidate Status</el-button>
      </div>
      <div class="u-text--center u-mt3"><ba-status-label v-if="build" :build="build"></ba-status-label></div>


      <div v-if="loading">Loading...</div>
      <div v-if="!loading && build">
        <div class="apk-download u-text--center u-mt4">
          <a :href="ApkLink">Download Android APK</a>
        </div>
        <div class="google-play-promote u-text--center u-mt4">

          <el-button @click="dialogVisible = true" type="success">
            <icon name="android"></icon>
            <span class="u-ml1">Promote Build</span>
          </el-button>

          <el-button @click="dialogAppleVisible = true" type="success">
            <icon name="apple"></icon>
            <span class="u-ml1">Promote Apple Build</span>
          </el-button>

            <el-dialog
                    title="Promote Build To Apple Store"
                    :visible.sync="dialogAppleVisible"
                    width="500px"
                    :before-close="undefined">
                <el-form :model="form">
                    <div class="u-text--center">Version:</div>

                    <el-tag class="u-mb4">
                        <div>

                                                    <b>{{build.version}}.{{build.build_number}}</b>
                        </div>
                    </el-tag>

                    <div class="u-mb2">Distribution Track:</div>
                    <el-form-item >
                        <el-select v-model="form.selectedTrack">

                            <el-option v-for="track in availableDistributionTracks" :key="track" :label="track" :value="track"></el-option>


                        </el-select>
                    </el-form-item>
                    <el-form-item class="u-mt5" >
                        <div class="u-text--light">Please confirm your action bellow:</div>
                        <el-checkbox v-model="form.reallySure" auto-complete="off">Yes, I know what I'm doing.</el-checkbox>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="dialogVisible = false">Cancel</el-button>
                     <el-button type="primary" :disabled="!form.reallySure" @click="promoteAppleBuild()">Confirm</el-button>
                </span>
            </el-dialog>

            <el-dialog
                    title="Promote Build To Google Play Market"
                    :visible.sync="dialogVisible"
                    width="500px"
                    :before-close="undefined">
                <el-form :model="form">
                    <div class="u-text--center">Version:</div>

                    <el-tag class="u-mb4">
                        <div>

                                                    <b>{{build.version}}.{{build.build_number}}</b>
                        </div>
                    </el-tag>

                    <div class="u-mb2">Distribution Track:</div>
                    <el-form-item >
                        <el-select v-model="form.selectedTrack">

                            <el-option v-for="track in availableDistributionTracks" :key="track" :label="track" :value="track"></el-option>


                        </el-select>
                    </el-form-item>
                    <el-form-item class="u-mt5" >
                        <div class="u-text--light">Please confirm your action bellow:</div>
                        <el-checkbox v-model="form.reallySure" auto-complete="off">Yes, I know what I'm doing.</el-checkbox>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="dialogVisible = false">Cancel</el-button>
                     <el-button type="primary" :disabled="!form.reallySure" @click="promoteBuild()">Confirm</el-button>
                </span>
            </el-dialog>

        </div>
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
    let availableDistributionTracks = ['alpha', 'beta', 'production']
    return {
      loading: true,
      buildId,
      dialogVisible: false,
      dialogAppleVisible: false,
      showBuildTechnicalDetails: false,
      availableDistributionTracks,
      build: {},
      form: {
        reallySure: false,
        selectedTrack: 'alpha',

      }
    }
  },
  computed: {
    buildPreviewLink () {
      return this.build.aws_build_preview
    },
    ApkLink () {
      return this.build.android_release_apk
    },
  },
  methods: {
    promoteAppleBuild () {
      this.dialogAppleVisible = false
      axios.post(config.builds_details + this.buildId + '/' + 'promote_apple', { track: this.form.selectedTrack })
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Apple Store promoting queued',
            type: 'success'
          })
        })
    },
    promoteBuild () {
      this.$notify({
        title: 'Uploading to Play Market...',
        message: 'Promotion to Google Play started...',
      })
      this.dialogVisible = false
      axios.post(config.builds_details + this.buildId + '/' + 'promote', { play_market_track: this.form.selectedTrack })
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Google Play Version Successfully Updated...',
            type: 'success'
          })
        })
    },
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
<style>
  .build-details__root  .el-loading-mask{
      z-index: 799;
  }

  .build__pre {
    background-color: #eeeeee;

  }

</style>
