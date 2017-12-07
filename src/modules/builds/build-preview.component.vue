<template>
  <div class="preview">
    <div  class="visible-xs-up">Build Preview</div>
    <img class="hidden-xs-down" src="../assets/iphone.jpg" />
    <iframe class="preview__iframe" :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: 'ba-build-preview',
  props: ['url'],
  data () {
    return {}
  },
  ready () {

  }
}
</script>
<style scoped>
  .preview * {
    box-sizing: border-box;
  }
  .preview {
    position: relative;
  }
  .preview__iframe{
    display: block;
    position: absolute;
    top: 149px;
    left: 99px;
    background-color: red;
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
  }
</style>
