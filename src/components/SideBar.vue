<template>
  <el-col :span="18" id='sideBar'>
    <h2>{{title}}</h2>
    <el-menu :default-active="activeIndex" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="record">记录</el-menu-item>
      <el-menu-item index="about">关于</el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vue x Element'
    }
  },
  computed:{
    activeIndex(){
      return this.$route.path.replace('/','')
    }
  },
}
</script>

<style>
#sideBar {
  height: 100%;
}
</style>

