<template>
  <div>
    <ba-header activeModule="Templates"></ba-header>

    <ba-page-with-sidebar :title="'Templates'">
      <div slot="sidebar">
        <div class="c-nav__list">
          <div v-for="section in filteredTemplates">
            <a class="c-nav__link" :class="{'c-nav__link--active' : sectionInViewport === section.name }" :href="'#'+ section.name">{{section.name}}</a>
          </div>
        </div>
      </div>
      <div slot="main" :class="{'has-fixed-search': showFixedSearch}" v-loading="loading">

        <h3 class="u-pt5 c-heading__page u-pb3">Templates Customization</h3>

        <div class="search-container-shell">
          <div class="fixed-search" :class="{'fixed-search--visible': showFixedSearch}">
            <div class="fixed-search__content">
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
              <el-row :gutter="50">

                <el-col  :xs="24" :sm="9">
                    <el-checkbox v-model="showOnlyOverridden">
                      Show only customized templates
                    </el-checkbox>
                </el-col>
              </el-row>
            </el-form>
            </div>
          </div>
        </div>

        <ba-single-template v-for="template in filteredTemplates"
                            :template="template"
                            :key="template.id">

        </ba-single-template>


      </div> <!-- Template module end -->
    </ba-page-with-sidebar>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import BaPageWithSidebar from '@/components/page-with-sidebar.component'
import BaSingleTemplate from '@/modules/templates/single-template.component'

export default {
  components: {
    BaSingleTemplate,
    BaPageWithSidebar,
  },
  data () {
    this.load()
    return {
      searchFilter: '',
      selectedLanguage: null,
      showOnlyOverridden: false,
      sectionInViewport: null,
      isScrolled: false
    }
  },
  methods: {
    ...mapActions('templates', ['load']),
    passSearchFilter (template) {
      let searchFilterPass = false
      let overriddenFilterPass = false
      let slug = template.slug
      if (slug.indexOf(this.searchFilter) >= 0 || template.name.toLowerCase().indexOf(this.searchFilter) >= 0) {
        searchFilterPass = true
      }

      if (!searchFilterPass && template.text_content.indexOf(this.searchFilter) >= 0) {
        searchFilterPass = true
      }
      if (!searchFilterPass && template.overridden &&
           template.overridden.text_content.indexOf(this.searchFilter) >= 0) {
        searchFilterPass = true
      }

      if (!this.showOnlyOverridden) {
        overriddenFilterPass = true
      } else {
        if (template.overridden) {
          let textEqual = template.overridden.text_content === template.text_content
          let htmlEqual = template.overridden.html_content === template.html_content
          if (!textEqual || !htmlEqual) {
            overriddenFilterPass = true
          }
        }
      }
      return searchFilterPass && overriddenFilterPass
    },
    handleScroll (e) {
    },
  },
  computed: {
    ...mapState('templates', ['all']),

    loading () {
      return this.all === undefined || this.all === null
    },
    showFixedSearch () {
      return this.isScrolled
    },
    sections () {
      let arr = []
      if (this.all === null) {
        return arr
      }

      let sections = this.all[this.selectedLanguage]
      for (let index in sections) {
        arr.push(sections[index])
      }

      return arr
    },

    filteredTemplates () {
      let all = this.sections
      let result = []
      all.forEach((x) => {
        if (this.passSearchFilter(x)) {
          result.push(x)
        }
      })
      return result
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
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss">
  .search-container-shell {
    height: 110px;
  }

  @media (max-width: 768px) {
    .search-container-shell {
      height: 220px;
    }
  }
</style>
