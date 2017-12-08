<template>
    <el-form-item :label="content.slug">
      <el-input type="textarea" v-bind:value="contentValue" @change="saveModifiedContent" @blur="saveModifiedContent"></el-input>

      <div v-if="contentValue != content.default">
        {{content.default}}
      </div>
    </el-form-item>
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
