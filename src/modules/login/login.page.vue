<template>

  <div class="login-root">
    <!--<ba-header></ba-header>-->
    <el-row>
      <el-col :xs="{span: 24, offset: 0}" :sm="{span: 8, offset: 8}">
        <img class="u-img-responsive" src="../../assets/briteappslogonotagline.png"/>

      </el-col>
    </el-row>
    <el-row :gutter="20" v-loading="isLoading">
      <el-col v-if="warning" :xs="{span: 24, offset: 0}" :sm="{span: 8, offset: 8}">
        <div class="u-text--danger">{{warning}}</div>
      </el-col>
      <el-col :xs="{span: 24, offset: 0}" :sm="{span: 8, offset: 8}">
        <el-input class="u-mb2" placeholder="Username or e-mail" v-model="form.username"></el-input>
        <el-input class="u-mb4" type="password" placeholder="Password" v-model="form.password"></el-input>
        <el-button @click="willLogin" class="u-mt-4" type="success">Login</el-button>

      </el-col>


    </el-row>

  </div>

</template>

<script>

/* eslint-disable */
import axios from 'axios'

import BaHeader from '@/components/header.component.vue'
import {mapMutations, mapActions} from 'vuex'

export default {
  components: {BaHeader},
  name: 'ba-login-page',
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
      isLoading: false,
      warning: null,
    }
  },
  methods: {
    ...mapActions('login', ['auth']),
    willLogin () {
      this.loading = true
      this.warning = null
      let promise
      this.auth(this.form)
        .then(this.didReceiveLoginResponse.bind(this))
        .catch(this.loginDidFail)
        .then(() => this.loading = false)
    },
    loginDidFail (response) {
      if (response.data.messages && response.data.messages.length > 0) {
        this.warning = response.data.messages[0]
      } else {
        this.warning = "Error while logging in..."
      }

    },

    didReceiveLoginResponse (result) {
      console.log('login', result)
      let response = result.data
      if (!response.success) {
        this.loginErrorClass = 'login__error--will-show'
        let message = ''
        if (response.errors && response.errors.length) {
          message = 'Error: ' + response.errors[0]
        } else {
          message = 'Error: general error occurred'
        }
        this.loginDidFail(message)
        return
      }
      this.$router.push({name: 'dashboard'})
    },

  },
}
</script>
<style scoped lang="scss">
</style>