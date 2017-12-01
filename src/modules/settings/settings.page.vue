<template>
  <div class="builds-module-root">
    <ba-header activeModule="settings"></ba-header>
    <h3 class="u-text--center">Settings</h3>

    <!--{{all}}-->


    <div v-for="section in sections" class="setting-section">

      <h4>{{section.name}}</h4>
      <div v-for="setting in section.settings" class="setting-section__settings single-setting u-mb4">
        <div class="single-setting__slug">
          {{setting.slug}}
        </div>
        <div class="single-setting__value">
          {{setting.default}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  methods: {
    ...mapActions('settings', ['load'])
  },
  computed: {
    ...mapState('settings', ['all']),
    sections () {
      let all = this.all
      let array = []
      for (let sectionName in all) {
        let settingsInSection = all[sectionName]
        array.push({
          name: sectionName,
          settings: settingsInSection,
        })
      }
      return array
    },

  },
  data () {
    this.load()
    return {}
  },
}
</script>
<style scoped lang="scss">
</style>