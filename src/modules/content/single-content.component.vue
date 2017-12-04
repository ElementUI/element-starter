<template>
  <div class="single-content-component u-mb4 u-mr4">
    <div class="content__slug u-mb2 u-text--sm">
      {{content.slug}}
    </div>

    <div class="content__name u-mb2">
      {{content.default}}
    </div>
    <div class="content__edit">
      <el-input v-bind:value="contentValue" @blur="saveModifiedContent"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content'],
  name: 'ba-single-content',
  data () {
    let contentValue = this.content.default
    return {
      contentValue
    }
  },
  methods: {
    saveModifiedContent (e) {
      console.log('newValue', e.target.value)
      // TODO save to db
    }
  }
}
</script>

<style scoped>
  .content__slug {
    background-color: #e4e4e4;
    border-radius: 10px;
    display: inline-block;
    padding: 0.5em;
  }
</style>