<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="">
            <div>
              <img style="width:120px;" src="~assets/cnodejs_light.svg" alt="">
            </div>
          </el-menu-item>
          <el-menu-item index="">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </el-menu-item>

          <el-menu-item index="1">
            <router-link :to="{ name: 'index'}">首页 </router-link>
          </el-menu-item>
  
          <el-menu-item index="2">
            <router-link :to="{ name: 'message'}">未读消息</router-link>
          </el-menu-item>
  
          <el-menu-item index="3">
            <router-link :to="{ name: 'tip'}">新手入门</router-link>
          </el-menu-item>
  
          <el-menu-item index="4">
            <router-link :to="{ name: 'api'}">API</router-link>
          </el-menu-item>
  
          <el-menu-item index="5">
            <router-link :to="{ name: 'about'}">关于</router-link>
          </el-menu-item>
  
          <el-menu-item index="6">
            <router-link :to="{ name: 'set'}">设置</router-link>
          </el-menu-item>
  
          <el-menu-item index="7">退出</el-menu-item>
  
          <el-menu-item index="8">
            <router-link :to="{ name: 'login'}">登录</router-link>
          </el-menu-item>
  
          <el-menu-item index="9">
            <router-link :to="{ name: 'register'}">注册</router-link>
          </el-menu-item>
  
        </el-menu>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Use Vue 2.0 Today!',
      activeIndex: '1',
      input2: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleIconClick(ev) {
      window.location.href = "https://www.google.com.hk/search?hl=zh-CN&q=site:cnodejs.org+" + this.input2 + "&cad=h"
    }
  },
  components: {
    'CNav': require('./module/Nav.vue')
  }
}
</script>

<style lang="sass" scoped>
html,body{
  margin:0px;
  padding:0px;
}
</style>
