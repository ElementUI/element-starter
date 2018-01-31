<template>
  <div class="appearance">
    <ba-header activeModule="Appearance"></ba-header>
    <div class="appearance__content">
      <h2 class="c-heading__page">Appereance Customization</h2>
      <div class="u-text--sub">To see changes to icons\logos you will need to rebuild application</div>
      <div class="images-grid">
        <div class="single-image" v-for="image in images">
          <h2 class="c-heading__sub">{{image.slug | capitalize}}</h2>
          <div>
            {{image.description}}
          </div>
          <div class="u-text--sm u-pt2">
            {{image.sub}}
          </div>
          <div class="u-text--center">
            <input type="file" :ref="'upload-image__' + image.slug" hidden @change="selectedFileDidChange($event, image)"/>
            <el-button class="u-m4" @click="uploadNewImage(image)">Upload new image</el-button>
          </div>
          <div class="u-text--center" v-loading="image.isLoading">
            <ba-company-image v-if="!image.isLoading" :slug="image.slug"></ba-company-image>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import BaCompanyImage from '@/modules/appearance/company-image.component'
import ElButton from 'element-ui/packages/button/src/button'
import axios from 'axios'
import config from '@/config'

export default {
  components: {
    ElButton,
    BaCompanyImage,
  },
  name: 'ba-appearance',
  data () {
    return {
      images: [
        {
          slug: 'logo',
          description: 'Logo will appear on the launch screen and in the header of mobile application',
          sub: 'Try to use wide rectangular image, (i.e. 190x76)',
          isLoading: false
        },
        {
          slug: 'icon',
          description: 'Icon will be shown on iPhone or Android home screen',
          sub: 'High resolution square image is the best, (resolution exact 1024x1024px, non-transparent)',
          isLoading: false
        },
        {
          slug: 'claims_placeholder',
          description: 'Icon on the top of on File Claim page',
          sub: 'preferred: 1000x300; png',
          isLoading: false
        },
        {
          slug: 'splash_screen',
          description: 'Splash screen for iOS application, shows when application is starting',
          sub: 'preferred: 2208x2208; png',
          isLoading: false
        },
      ],
    }
  },
  methods: {
    selectedFileDidChange (e, image) {
      console.log(e, 'e')
      if (!e.target.files) {
        return
      }

      if (e.target.files.length <= 0) {
        return
      }

      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onloadend = () => {
        let uploaded = {
          image: reader.result,
          mimeType: file.type,
          fileName: file.name,
        }
        image.isLoading = true
        axios.post(config.url + '/image/' + image.slug + '/', {...uploaded})
          .then(() => {
            this.$notify({
              title: 'Success',
              message: `Image ${image.slug} updated...`,
              type: 'success'
            })
            image.isLoading = false
          })
          .catch(() => {
            image.isLoading = false
          })
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    uploadNewImage (image) {
      let $refs = this.$refs
      let $ref = $refs['upload-image__' + image.slug]
      let first = $ref[0]
      first.click()
    },
  },
}
</script>

<style scoped>
  .appearance__content {
    padding-top: 3em;
  }

  .images-grid {
    padding: 3em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3em 10em;
  }

  .single-image {
    padding: 1em;
    background-color: #fff;
    box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 1000px) {
    .images-grid {
      grid-template-columns: 1fr;
    }
  }
</style>