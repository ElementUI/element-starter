<template>
  <div>
    <router-view></router-view>
    <div id="centered-spinner-container" v-show="show_loading" >
      <p  class="u-text--center" style="line-height: 1.1;">
        <img id="loading-gif" src="./assets/ripple.svg" /><br />
        Loading...
      </p>
    </div>
  </div>

</template>

<script>
import {initSpinnerState} from './utils/spinner'
export default {
  name: 'app',
  data () {
    return {
      show_loading: initSpinnerState
    }
  }
}
</script>

<style>
  #centered-spinner-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 125px;
      height: 125px;
      border: 1px solid;
      border-radius: 10px;
      background-color: rgba(247, 247, 249, 0.83);
  }
  #loading-gif {
    width: 90px;
    margin-top: 6px;
}
</style>
