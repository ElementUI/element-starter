<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
    <el-switch v-model="value1" on-text="" off-text="">
    </el-switch>
    <el-switch v-model="value2" on-color="#13ce66" off-color="#ff4949">
    </el-switch>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkboxGroup2" size="small">
      <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '深圳'" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkboxGroup3" size="large" fill="#324057" text-color="#a4aebd" :min="1" :max="3">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      msg: 'Use Vue 2.0 Today!',
      value1: true,
      value2: true,
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['北京'],
      checkboxGroup3: ['广州'],
      cities: cityOptions
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
