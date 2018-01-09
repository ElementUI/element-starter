<template>
  <div class="el-card u-mt4 u-pb0">
    <a class="u-section-anchor" :id="template.name"></a>
    <h4 class="c-heading--lg u-mb3 section">
      <icon class="u-mr2 u-text--light section__icon" :name="'link'"></icon>
      <div class="section__name"> {{ template.name }}</div>
    </h4>
    <el-form label-position="top">
      <el-form-item :label="template.slug">

        <el-input type="textarea" v-bind:value="textValue" @change="saveModifiedContent" @blur="saveModifiedContent"></el-input>

        <div v-if="textValue != template.text_content">
          <span class="u-text--light u-text--sm">Default text: <em>{{template.text_content}}</em></span>
        </div>
        <a v-if="!isEditingHtml" @click="beginHtmlEditing">Edit HTML</a>
        <div class="edit-area"  v-if="isEditingHtml">
          <div class="u-mt4"></div>
          <ba-ace-editor lang="html" theme="clouds" :content="htmlValue" @editor-update="editorChange"></ba-ace-editor>
          <div class="u-mt4"></div>
          <el-button @click="stopHtmlEditing">Discard</el-button>
          <el-button @click="saveModifiedHtmlContent" class="u-float-right" >Save</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  props: ['template'],
  name: 'ba-single-template',
  data () {
    let contentValue = this.template.overridden ? this.template.overridden.text_content : this.template.text_content

    let htmlValue = this.getInitialHtmlValue()

    return {
      textValue: contentValue,
      htmlValue,
      isEditingHtml: false,
    }
  },
  methods: {
    ...mapActions('templates', ['saveSingleTemplate']),
    beginHtmlEditing () {
      this.isEditingHtml = true
    },
    getInitialHtmlValue () {
      let htmlValue = this.template.overridden ? this.template.overridden.html_content : this.template.html_content
      return htmlValue
    },
    stopHtmlEditing () {
      this.htmlValue = this.getInitialHtmlValue()
      this.isEditingHtml = false
    },
    editorChange (newHtmlValue) {
      this.htmlValue = newHtmlValue
    },
    saveModifiedContent (e) {
      let oldValue = this.textValue
      let newValue = e.target ? e.target.value : e
      console.log('newValue', newValue)
      if (oldValue === newValue) {
        // console.log(newValue, 'oldValue === newValue')
        return
      }

      let payload = {
        template: this.template,
        text_content: newValue,
        html_content: this.htmlValue,
      }

      this.textValue = newValue
      this.saveSingleTemplate(payload)
        .then(repsonse => {
          this.$message({
            message: 'Template saved successfully',
            type: 'success'
          })
        })
    },
    saveModifiedHtmlContent () {
      let payload = {
        template: this.template,
        text_content: this.textValue,
        html_content: this.htmlValue,
      }
      this.isEditingHtml = false
      this.saveSingleTemplate(payload)
        .then(repsonse => {
          this.$message({
            message: 'Content saved successfully',
            type: 'success'
          })
        })
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }

</style>

<style>
  .ace_content {
    background: #eeeeee !important;
  }
</style>