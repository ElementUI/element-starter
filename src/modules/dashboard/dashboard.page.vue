<template>
  <div class="dashboard-root">
    <ba-header></ba-header>

    <h2 class="u-text--center"> {{user.company.name}}</h2>
    <div class="u-text--sm u-text--center">Welcome {{user.username}}</div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ba-dashboard',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState('login', ['user'])
  },
}
</script>
<style scoped>
</style>