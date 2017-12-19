<template>
  <div class="settings-module-root">
    <ba-header activeModule="Settings"></ba-header>
    <ba-page-with-sidebar :title="'Settings'">
      <template slot="sidebar">
        <div class="sidebar-settings">
          <div class="c-nav__list" v-for="section in filteredSections">
            <a class="c-nav__link" :class="{'c-nav__link--active' : sectionInViewport === section.name }" :href="'#' + section.name">{{section.name}}</a>
          </div>
        </div>

      </template>
      <template slot="main">
        <h3 class="u-pt5 c-heading__page u-pb3">Settings</h3>

        <el-form label-position="left">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="16">
              <el-form-item label="Search">
                <el-input v-model="searchFilter">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  <i slot="suffix" class="el-input__icon el-icon-close u-link" @click="searchFilter = ''"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        {{sectionInViewport}}
        <ba-settings-section
            v-for="section in filteredSections"
            :key="section.name"
            v-if="section.settings.length > 0"
            :section="section"
            :ref="'section__' + section.name"
        ></ba-settings-section>

      </template>
    </ba-page-with-sidebar>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import BaSingleSetting from '@/modules/settings/single-setting.component'
import BaPageWithSidebar from '@/components/page-with-sidebar.component'
import BaSettingsSection from '@/modules/settings/settings-section.component'

export default {
  components: {
    BaSettingsSection,
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
    handleScroll (e) {
      let section = this.nearestSectionPositionToScroll(window.scrollY)
      this.sectionInViewport = section
    },
    nearestSectionPositionToScroll (scrollY) {
      let nearestSection = null
      for (let i in this.filteredSections) {
        let currentName = this.filteredSections[i].name
        let refKey = 'section__' + currentName
        let ref = this.$refs[refKey]
        if (!ref) {
          continue
        }
        if (ref.length <= 0) {
          continue
        }
        let first = ref[0]
        let fixedHeaderAdjust = 100
        let currentOffset = first.$el.offsetTop - fixedHeaderAdjust
        if (nearestSection === null) {
          nearestSection = currentName
        }
        if (currentOffset < scrollY) {
          nearestSection = currentName
        }
        if (currentOffset > scrollY) {
          break
        }
      }
      return nearestSection
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

    filteredSections () {
      let map = new Map()
      let all = this.sections
      all.forEach((section) => {
        let currentSectionName = section.name
        let filteredSettingsInSection = []
        section.settings.forEach((setting) => {
          if (this.passSearchFilter(setting)) {
            filteredSettingsInSection.push(setting)
          }
        })
        map.set(currentSectionName, filteredSettingsInSection)
      })

      let keys = Array.from(map.keys())
      keys.sort()
      let result = []
      console.log(keys)
      keys.forEach((key) => {
        if (this.sectionInViewport === null) {
          this.sectionInViewport = key
        }
        result.push({
          name: key,
          settings: map.get(key)
        })
      })
      return result
    }
  },
  data () {
    this.load()
    return {
      searchFilter: '',
      sectionInViewport: null
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style scoped >

</style>
