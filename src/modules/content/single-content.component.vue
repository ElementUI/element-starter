<template>
  <div class="single-content-component u-mb4 u-mr4">
    <div class="content__slug u-mb2 u-text--sm">
      {{content.section.slug}}.{{content.slug}}
    </div>

    <div class="content__name u-mb2 u-text--sm" title="Default value">
      {{content.default}}
    </div>
    <div class="content__edit">
      <el-input v-bind:value="contentValue" @change="saveModifiedContent" @blur="saveModifiedContent"></el-input>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['content'],
  name: 'ba-single-content',
  data () {
    let contentValue = this.content.overridden ? this.content.overridden.value : this.content.default
    return {
      contentValue
    }
  },
  methods: {
    ...mapActions('content', ['saveSingleContent']),
    saveModifiedContent (e) {
      let oldValue = this.contentValue
      let newValue = e.target ? e.target.value : e

      if (oldValue === newValue) {
        return
      }

      let payload = {
        oldValue,
        newValue,
        content: this.content
      }
      this.contentValue = newValue
      this.saveSingleContent(payload)
        .then(repsonse => {
          this.$message({
            message: 'Content saved successfully',
            type: 'success'
          })
        })
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