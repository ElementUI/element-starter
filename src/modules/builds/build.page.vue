<template>
  <div class="builds-module-root">
    <ba-header activeModule="Builds"></ba-header>

    <div class="builds-module__content">

        <h2 class="u-pl4 u-mt2 c-heading__page">Builds</h2>
        <a href="/new-build" @click="$event.preventDefault()">
          <el-button type="success" class="u-ml4" icon="el-icon-plus" @click="goToLink('new-build')">New build</el-button>
        </a>
        <ba-build-list></ba-build-list>
    </div>
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
  .builds-module__content {
    padding-top: 3rem;
  }
</style>