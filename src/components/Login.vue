<template>
  <div class="login-box">
    <el-row>
      <el-col :span="16">
        <el-input id="username" v-model="username" placeholder="请输入帐号">
          <template slot="prepend">帐号</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-button @click="login" id="login" type="primary">登录</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      login: function() {
        this.$store.commit('login')
        this.$router.push('/')
        // this.$message.error('密码错误')
      }
    }
  }
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.login-box {
  margin-top:20%;
  margin-left:25%;
}
#login {
  width:100%
}
</style>

