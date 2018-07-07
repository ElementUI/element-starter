<template>
  <div id="app">
    <el-container>
      <el-aside>
        <sidebar/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>

<script>
import SideBar from './components/SideBar.vue'
export default {
  data() {
    var isLogin = this.$store.state.isLogin
    console.log('isLogin: ' + isLogin)
    return {
      isLogin: isLogin
    }
  },
  components: {
    sidebar: SideBar,
  }
}
</script>
