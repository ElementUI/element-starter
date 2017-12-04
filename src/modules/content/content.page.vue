<template>
  <div class="content-module">
    <ba-header activeModule="content"></ba-header>
    <div class="content-module__main u-ml4" v-loading="loading">

      <h3 class="u-text--center">Content</h3>
      <div class="u-mb2">Select language:</div>
      <el-select class="u-ml2" v-model="selectedLanguage" placeholder="Select language">
        <el-option
            v-for="language in languages"
            :value="language"
            :key="language">
        </el-option>
      </el-select>

      <div class="content__search u-mt4 u-mr4">
        <div class="u-text--small">Search for...</div>
        <el-input type="text" class="u-ml2" v-model="searchFilter"></el-input>
      </div>

      <div class="section" v-for="section in sections">
        <h4 class="section__title">{{ section.name }}</h4>
        <div v-for="content in section.contents" v-if="passSearchFilter(content)" class="section__single-content">
          <ba-single-content :content="content"></ba-single-content>
          <!--{{ content.id }}-->
        </div>
      </div>

    </div> <!-- Content module end -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import BaSingleContent from '@/modules/content/single-content.component'

export default {
  components: {BaSingleContent},
  data () {
    console.log('this.all', this.all)
    this.load()
    return {
      searchFilter: '',
      selectedLanguage: null,
    }
  },
  methods: {
    ...mapActions('content', ['load']),
    passSearchFilter (content) {
      let fullSlug = content.section.slug + '.' + content.slug
      if (fullSlug.indexOf(this.searchFilter) >= 0) {
        return true
      }

      if (content.default.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0) {
        return true
      }
    },
  },
  computed: {
    ...mapState('content', ['all']),

    loading () {
      return this.all === undefined || this.all === null
    },
    sections () {
      let arr = []
      if (this.all === null) {
        return arr
      }
      let sections = this.all[this.selectedLanguage]
      for (let section in sections) {
        arr.push(
          {
            name: section,
            contents: sections[section],
          })
      }

      return arr
    },
    languages () {
      let arr = []
      for (let key in this.all) {
        arr.push(key)
      }
      arr.sort()
      if (this.selectedLanguage === null && arr.length > 0) {
        this.selectedLanguage = arr[0]
      }
      return arr
    },
  },
}
</script>
<style>
  /* Hide title if no search filter pass for section */
  .section__title:last-child {
    display: none;
  }
</style>