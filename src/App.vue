<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },
  components: {
    'CNav':require('./module/Nav.vue')
  }
}
</script>

<style lang="sass">
</style>
