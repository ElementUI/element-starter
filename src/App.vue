<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
    <el-switch v-model="value1" on-text="" off-text="">
    </el-switch>
    <el-switch v-model="value2" on-color="#13ce66" off-color="#ff4949">
    </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Use Vue 2.0 Today!',
      value1: true,
      value2: true
    }
  },

  methods: {
    startHacking() {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
