<template>
  <div class="preview" v-loading="loading">
    <img class="preview__iphone-overlay" src="../../assets/iphone.jpg" />
    <iframe class="preview__iframe" :src="url" @load="frameLoaded()" ></iframe>
  </div>
</template>

<script>
export default {
  name: 'ba-build-preview',
  props: ['url'],
  data () {
    return {
      loading: true,
    }
  },
  ready () {

  },
  methods: {
    frameLoaded () {
      this.loading = false
    }
  }
}
</script>
<style scoped>
  .preview * {
    box-sizing: border-box;
  }
  .preview {
    position: relative;

    width: 518px;
    margin-left: auto;
    margin-right: auto;
  }
  .preview__iframe{
    display: block;
    position: absolute;
    top: 125px;
    left: 99px;
    background-color: #e4e4e4;
    width: 320px;
    height: 569px;
    border: 1px solid #eee;
  }
  /* do not need frame on mobile devices */
  @media (max-width: 575px) {
    .preview__iframe{
      /*top:0;*/
      /*left: 0;*/
      margin-left: 1%;
      margin-right: 1%;
      width: 98%;
      position:static;
      margin-bottom: 50px;
    }

    .preview__iphone-overlay {
      display: none;
    }
    .preview {
      width: auto;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
