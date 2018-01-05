<template>
  <editor lang="html" :theme="'clouds'" :content="content"></editor>
</template>

<script>
/*
  This is wrapper on top of vue2-ace,
  because it has some messed up data flow pattern,
  for example injecting 'change' hook into parent model, without exposing any meaningful event as a component
*/
import editor from 'vue2-ace'

import 'brace/mode/html'
import 'brace/theme/clouds'

export default {
  name: 'ba-ace-editor',
  components: {
    editor,
  },
  props: [
    'content',
    'metadata',
  ],

  data: function () {
    return {}
  },
  methods: {
    onUpdate (newValue) {
      this.$emit('contentWillChange', {})

      let event = {
        // updatedText: editor.getValue(),
        metadata: this.metadata,
      }
      this.$emit('contentDidChange', event)
    },
  },
  mounted: function () {
    this.$on('editor-update', this.onUpdate)
  },
}
</script>

<style scoped>

</style>