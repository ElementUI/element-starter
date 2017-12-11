<template>
  <el-tag
      style="min-width: 100px;"
      class="u-text--center"
      :type="buildLabelColor(build)"
      close-transition>{{build.status | capitalize}}</el-tag>
</template>

<script>
export default {
  props: ['build'],
  name: 'ba-status-label',
  methods: {
    buildLabelColor (build) {
      if (!build || !build.status) {
        return 'primary'
      }
      let statusNormalized = build.status.toLowerCase()
      if (statusNormalized === 'queued') {
        return 'primary'
      }

      if (statusNormalized === 'success') {
        return 'success'
      }

      if (statusNormalized === 'failed') {
        return 'danger'
      }

      return 'primary'
    },
  },
}
</script>

<style scoped>

</style>