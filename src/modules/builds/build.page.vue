<template>
  <div class="builds-module-root">
    <ba-header activeModule="builds"></ba-header>
    <h1>Builds</h1>
    <ba-build-list></ba-build-list>
  </div>
</template>

<script>
import BaBuildList from '@/modules/builds/builds.component'

export default {
  components: {'ba-build-list': BaBuildList},
  data () {
    return {}
  },

}
</script>
<style scoped lang="scss">
</style>