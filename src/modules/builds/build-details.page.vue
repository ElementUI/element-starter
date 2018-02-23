<template>
  <div class="build-details">
    <ba-header activeModule="builds"></ba-header>
    <div v-loading="loading" class="build-details__root ">
      <div class="u-pt4"></div>
      <div class="u-pt4"></div>
      <h2 class="u-text--center">Build {{ humanBuildId }} Details</h2>
      <android-version-list class="u-text--center u-mb2" ref="androidVersionListElement"></android-version-list>
      <div class="controls-container u-text--center">
        <el-button  icon="el-icon-refresh" @click="invalidateBuildStatus()">Invalidate Status</el-button>
      </div>
      <div class="u-text--center u-mt3">
          <ba-status-label v-loading="loadingStatus" element-loading-background="rgba(0, 0, 0, 0.1)"  v-if="build" :build="build"></ba-status-label>
      </div>


      <div v-if="loading">Loading...</div>
      <div v-if="!loading && build && build.status=='SUCCEEDED'">
        <div class="apk-download u-text--center u-mt4">
          <a :href="ApkLink">Download Android APK</a>
        </div>
        <div class="google-play-promote u-text--center u-mt4">

          <el-button v-loading="waitingAndroidPromoteCompleted" @click="dialogVisible = true" type="success" :disabled="waitingAndroidPromoteCompleted" element-loading-background="rgba(0, 0, 0, 0.1)">
            <icon name="android"></icon>
            <span class="u-ml1">{{promoteAndroidButtonCaption}}</span>
          </el-button>

          <el-button v-loading="waitingPromoteCompleted" @click="dialogAppleVisible = true" type="success" :disabled="waitingPromoteCompleted" element-loading-background="rgba(0, 0, 0, 0.1)">
            <icon name="apple"></icon>
            <span class="u-ml1">{{promoteAppleButtonCaption}}</span>
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
                </el-form>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="dialogAppleVisible = false">Cancel</el-button>
                     <el-button type="primary"  @click="promoteAppleBuild()">Confirm</el-button>
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
                     <el-form-item v-if="form.selectedTrack=='production'" class="u-mt5" >
                        <div class="u-text--light">Please confirm your action bellow:</div>
                        <el-checkbox v-model="form.reallySure" auto-complete="off">Yes, I know what I'm doing.</el-checkbox>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="dialogVisible = false">Cancel</el-button>
                     <el-button type="primary" @click="promoteBuild()" :disabled="form.selectedTrack=='production' && !form.reallySure">Confirm</el-button>
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

          <ba-build-preview ref="buildPreviewElement" :url="buildPreviewLink">
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
import AndroidVersionList from './android-version.component'

let promoteAppleBuildBaseCaption = 'Send to Apple for Approval'

let promoteAndroidBuildBaseCaption = 'Send to Google'

export default {
  components: {
    ElTag,
    'ba-build-preview': BuildPreview,
    'android-version-list': AndroidVersionList
  },
  data () {
    let buildId = this.$route.params.buildId
    let availableDistributionTracks = ['beta', 'production']
    return {
      initBuildPreviewLink: null,
      previousApplePromoteStatus: null,
      loading: true,
      loadingStatus: false,
      waitingPromoteCompleted: false,
      waitingAndroidPromoteCompleted: false,
      promoteAppleButtonCaption: promoteAppleBuildBaseCaption,
      promoteAndroidButtonCaption: promoteAndroidBuildBaseCaption,
      buildId,
      dialogVisible: false,
      dialogAppleVisible: false,
      showBuildTechnicalDetails: false,
      availableDistributionTracks,
      build: {},
      form: {
        selectedTrack: 'beta',
      },
      loadBuildTimerRef: null,
      loadApplePromoteTimerRef: null
    }
  },
  computed: {
    buildPreviewLink () {
      return this.build.aws_build_preview
    },
    ApkLink () {
      return this.build.android_release_apk
    },
    humanBuildId () {
      return this.build ? this.build.version + '.' + this.build.build_number : 'UNDEFINED'
    }
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
          this.waitingPromoteCompleted = true
          this.loadApplePromoteDetails()
        })
    },
    promoteBuild () {
      this.$notify({
        title: 'Uploading to Play Market...',
        message: 'Promotion to Google Play started...',
      })
      this.dialogVisible = false
      this.waitingAndroidPromoteCompleted = true
      this.promoteAndroidButtonCaption = promoteAndroidBuildBaseCaption + ' : QUEUED ' + this.form.selectedTrack
      axios.post(config.builds_details + this.buildId + '/' + 'promote', { play_market_track: this.form.selectedTrack })
        .then(() => {
          this.promoteAndroidButtonCaption = promoteAndroidBuildBaseCaption + ' : SUCCESS ' + this.form.selectedTrack
          this.waitingAndroidPromoteCompleted = false
          this.$refs.androidVersionListElement.loadAndroidPromotesState() // trigger version refresh
          this.$notify({
            title: 'Success',
            message: 'Google Play Version Successfully Updated...',
            type: 'success'
          })
        }).catch(
        (error) => {
          this.promoteAndroidButtonCaption = promoteAndroidBuildBaseCaption + ' : FAILURE ' + this.form.selectedTrack
          this.waitingAndroidPromoteCompleted = false
          let message = error.response.data && error.response.data.failure_message
            ? error.response.data.failure_message : 'Google Play Version Update failed...'
          let title = error.response.data && error.response.data.failure
            ? 'Failure: ' + error.response.data.failure : 'FAILURE'
          this.$notify({
            title: title,
            message: message,
            type: 'error',
            duration: 0
          })
        }
      )
    },
    invalidateBuildStatus () {
      this.$refs.buildPreviewElement.invalidateIframe()
      this.loading = true
      axios.patch(config.builds_details + this.buildId + '/')
        .then(response => {
          this.loading = false
          this.build = response.data
        })
    },
    loadApplePromoteDetails () {
      axios.get(config.builds_details + this.buildId + '/' + 'promote_apple', { track: this.form.selectedTrack })
        .then((result) => {
          let data = result.data
          if (!data.success) {
            this.$notify({
              title: data.status,
              message: 'Apple Store promoting finished with internal error...',
              type: 'error',
              duration: 0
            })
            console.log('issue during loadApplePromoteDetails', result)
            return
          }
          data = data.data
          if (!data.length) {
            console.log('no promote tasks in db')
            return
          }

          data = data[0]
          if (['LOCKED', 'QUEUED'].indexOf(data.status) !== -1) {
            this.previousApplePromoteStatus = data.status
            this.waitingPromoteCompleted = true
            this.loadApplePromoteTimerRef = setTimeout(this.loadApplePromoteDetails, 15000)
          } else {
            this.waitingPromoteCompleted = false
            if (this.previousApplePromoteStatus !== null) {
              this.$notify({
                title: data.status,
                message: 'Apple Store promoting finished...',
                type: data.status === 'SUCCESS' ? 'success' : 'error',
                duration: data.status === 'SUCCESS' ? 3000 : 0
              })
            }
          }
          this.promoteAppleButtonCaption = promoteAppleBuildBaseCaption + ' : ' + data.status
        })
    },
    loadBuild () {
      if (this.build.status && ['queued', 'IN_PROGRESS'].indexOf(this.build.status) === -1) {
        this.loading = false
        return
      }
      if (!this.loading) {
        this.loadingStatus = true
      }
      axios.get(config.builds_details + this.buildId + '/')
        .then(response => {
          if (!this.loading) {
            this.loadingStatus = false
          }
          this.loading = false
          this.build = response.data
          if (['queued', 'IN_PROGRESS'].indexOf(this.build.status) !== -1) {
            this.loadingStatus = true
            this.initBuildStatus = this.build.status
            this.loadBuildTimerRef = setTimeout(this.loadBuild, 15000)
          } else {
            this.loadingStatus = false
            if (this.build.android_promotion_tracks !== null) {
              this.promoteAndroidButtonCaption = promoteAndroidBuildBaseCaption + ' : SUCCESS ' +
                this.build.android_promotion_tracks
            }
            if (this.initBuildStatus !== null) {
              this.$refs.buildPreviewElement.invalidateIframe()
            }
          }
        })
    },
  },
  beforeMount () {
    this.loading = true
    this.initBuildStatus = null
    this.loadBuild()
    this.loadApplePromoteDetails()
  },
  beforeDestroy () {
    clearTimeout(this.loadBuildTimerRef)
    clearTimeout(this.loadApplePromoteTimerRef)
  }
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
