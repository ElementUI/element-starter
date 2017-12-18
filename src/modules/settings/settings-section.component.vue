<template>
  <div class="el-card setting-section u-mt4 u-pb0">

    <a class="u-section-anchor" :id="section.name"></a>
    <h4 class="c-heading--lg u-mb3 section">
      <icon class="u-mr2 u-text--light section__icon" :name="'link'"></icon>
      <div class="section__name"> {{ section.name }}</div>
      <div class="section__toggle">
        <el-button @click="toggle()" :icon="toggleStateIcon"></el-button>
      </div>

    </h4>
    <div v-for="setting in section.settings" v-if="isCollapsed" class="setting-section__settings single-setting u-mb4">
      <ba-single-setting :setting="setting"></ba-single-setting>
    </div>

  </div>
</template>

<script>
import BaSingleSetting from '@/modules/settings/single-setting.component.vue'

export default {
  components: {
    BaSingleSetting
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
  name: 'ba-settings-section',
}
</script>

<style scoped>

</style>