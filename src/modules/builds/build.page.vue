<template>
  <div class="builds-module-root">
    <ba-header activeModule="builds"></ba-header>
    <h2 class="u-text--center">Builds</h2>
    <a href="/new-build" @click="$event.preventDefault()">
      <el-button type="success" class="u-ml4" icon="el-icon-plus" @click="goToLink('new-build')">New build</el-button>
    </a>
    <ba-build-list></ba-build-list>
  </div>
</template>

<script>
import BaBuildList from '@/modules/builds/build-list.component.vue'

export default {
  components: {'ba-build-list': BaBuildList},
  data () {
    return {}
  },
  methods: {
    goToLink (name) {
      this.$router.push({name: name})
    },
  },
}
</script>
<style scoped lang="scss">
</style>