<template>
  <div class="company-image" v-loading="!downloaded" :class="{'company-image--loaded' : downloaded}">
      <img class="u-img-responsive" v-if="downloaded" :src="downloaded"/>
  </div>

</template>

<script>
import axios from 'axios'
import config from '@/config'
export default {
  props: ['slug'],
  name: 'ba-company-image',
  data () {
    axios.get(config.url + '/image/' + this.slug + '/', { responseType: 'blob' })
      .then((response) => {
        let reader = new window.FileReader()
        reader.readAsDataURL(response.data)
        reader.onload = () => {
          this.downloaded = reader.result
        }
      })
    return {
      downloaded: null
    }
  },
}
</script>

<style scoped>
  .company-image {
    display: inline-block;
  }
</style>