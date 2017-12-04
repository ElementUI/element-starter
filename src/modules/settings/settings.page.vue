<template>
  <div class="builds-module-root">
    <ba-header activeModule="settings"></ba-header>
    <h3 class="u-text--center">Settings</h3>

    <div class="settings__search u-ml4">
      <div class="u-text--small">Search for...</div>
      <el-input type="text" v-model="searchFilter"></el-input>
    </div>

    <div v-for="section in sections" class="setting-section u-ml4">

      <h4 class="setting-section__title">{{section.name}}</h4>
      <div v-for="setting in section.settings" v-if="passSearchFilter(setting)" class="setting-section__settings single-setting u-mb4 u-ml4">
        <ba-single-setting :setting="setting"></ba-single-setting>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import BaSingleSetting from '@/modules/settings/single-setting.component'

export default {
  components: {BaSingleSetting},
  methods: {
    ...mapActions('settings', ['load']),
    passSearchFilter(setting) {
      let fullSlug = setting.section.slug + '.' + setting.slug
      if (fullSlug.indexOf(this.searchFilter) >= 0) {
        return true
      }

      if (setting.name.indexOf(this.searchFilter) >= 0) {
        return true
      }

      return false
    },
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
    return {
      searchFilter: ''
    }
  },
}
</script>
<style scoped >
  /* Hide section title if no search filter pass for section */
  .setting-section__title:last-child {
    display: none;
  }
</style>