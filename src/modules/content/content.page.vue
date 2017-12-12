<template>
  <div>
    <ba-header activeModule="Content"></ba-header>

    <ba-page-with-sidebar :title="'Content'">
      <div slot="sidebar">
        <div class="section-list" v-for="section in sections">
          <div class="section-list__link-item u-mt2">
            <a  :href="'#'+ section.name">{{section.name}}</a>
          </div>
        </div>
      </div>
      <div slot="main" class="u-pt4" v-loading="loading">

        <h3 class="c-heading__page">Content Customization</h3>

        <el-form label-position="left">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="16">
              <el-form-item label="Search">
                <el-input v-model="searchFilter"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="Language">
                <el-select v-model="selectedLanguage">
                  <el-option
                          v-for="language in languages"
                          :value="language"
                          :key="language">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="el-card u-mt4 u-pb0" v-for="section in sections">

          <a class="u-section-anchor" :id="section.name"></a>
          <h4 class="c-heading--lg u-mb3"><icon class="u-mr2" :name="'link'"></icon>{{ section.name }}</h4>

          <el-form v-for="content in section.contents" :key="content.id" v-if="passSearchFilter(content)" label-position="top">
            <ba-single-content :content="content"></ba-single-content>
          </el-form>
        </div>

      </div> <!-- Content module end -->
    </ba-page-with-sidebar>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import BaSingleContent from '@/modules/content/single-content.component'
import BaPageWithSidebar from '@/components/page-with-sidebar.component'

export default {
  components: {
    BaPageWithSidebar,
    BaSingleContent},
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
      if (content.overridden && content.overridden.value.toLowerCase().indexOf(this.searchFilter.toLowerCase()) >= 0) {
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
