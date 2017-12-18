<template>
  <div class="el-card u-mt4 u-pb0">
    <a class="u-section-anchor" :id="section.name"></a>
    <h4 class="c-heading--lg u-mb3 section">
      <icon class="u-mr2 u-text--light section__icon" :name="'link'"></icon>
      <div class="section__name"> {{ section.name }}</div>
      <div class="section__toggle">
        <el-button @click="toggle()" :icon="toggleStateIcon"></el-button>
      </div>

    </h4>
    <div v-if="isCollapsed" class="contents-repeater--expanded">
      <el-form v-for="content in section.contents" :key="content.id" label-position="top">
        <ba-single-content :content="content"></ba-single-content>
      </el-form>
    </div>
  </div>
</template>

<script>
import BaSingleContent from '@/modules/content/single-content.component'

export default {
  components: {
    BaSingleContent
  },
  props: ['section'],
  data () {
    return {
      isCollapsed: true,
    }
  },
  methods: {
    toggle () {
      this.isCollapsed = !this.isCollapsed
    },
  },
  computed: {
    toggleStateIcon () {
      return this.isCollapsed ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
    }
  },
  name: 'ba-content-section',
}
</script>

<style scoped>
</style>