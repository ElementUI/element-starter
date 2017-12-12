<template>
  <div class="settings-module-root">
    <ba-header activeModule="Settings"></ba-header>
    <ba-page-with-sidebar :title="'Settings'">
      <template slot="sidebar">
        <div class="sidebar-settings" v-for="section in sections" >
          <div class="u-mb2">
            <a :href="'#' + section.name">{{section.name}}</a>
          </div>
        </div>

      </template>
      <template slot="main">
        <h3 class="u-pt4 c-heading__page u-pb3">Settings</h3>

        <el-form label-position="left">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="16">
              <el-form-item label="Search">
                <el-input v-model="searchFilter"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div v-for="section in sections" class="el-card setting-section u-mt4 u-ml4">

          <a class="u-section-anchor" :id="section.name"></a>
          <h4 class="c-heading--lg u-mb3"><icon class="u-mr2" name="link"></icon>{{ section.name }}</h4>

          <div v-for="setting in section.settings" v-if="passSearchFilter(setting)" class="setting-section__settings single-setting u-mb4 u-ml4">
            <ba-single-setting :setting="setting"></ba-single-setting>
          </div>

        </div>
      </template>
    </ba-page-with-sidebar>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import BaSingleSetting from '@/modules/settings/single-setting.component'
import BaPageWithSidebar from '@/components/page-with-sidebar.component'

export default {
  components: {
    BaPageWithSidebar,
    BaSingleSetting},
  methods: {
    ...mapActions('settings', ['load']),
    passSearchFilter (setting) {
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

</style>