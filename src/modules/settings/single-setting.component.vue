<template>
  <div class="single-setting">
    <div class="single-setting__name">
      {{setting.name}} <span> ( {{setting.stype}} )</span>
    </div>
    <div class="single-setting__slug u-text--sm">
      {{setting.slug}}
    </div>
    <div class="single-setting__value u-mb4">
      <div class="setting--boolean" v-if="setting.stype === 'BLN'">
        <el-switch :disabled="readonly" v-model="settingValue"></el-switch>
      </div>
      <div class="setting--string" v-if="setting.stype === 'STR' || setting.stype === 'URL'">
        <el-input :disabled="readonly" v-bind:value="settingValueClone" @change="updateTextSetting" @blur="updateTextSetting"></el-input>
      </div>
      <div class="setting--int" v-if="setting.stype === 'INT'">
        <el-input-number :disabled="readonly" v-model="settingValue"></el-input-number>
      </div>
      <div class="setting--decimal" v-if="setting.stype === 'DEC'">
        <el-input :disabled="readonly" v-model="settingValue"></el-input>
      </div>
      <div class="setting--time" v-if="setting.stype === 'TIM'">
        <el-time-select :disabled="readonly" v-model="settingValue"
                        :picker-options="{
                          start: '06:00',
                          step: '00:15',
                          end: '23:30'
                        }"></el-time-select>
      </div>

      <div class="u-mt4">
        <!--{{setting.default}}-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  props: ['setting'],
  name: 'ba-single-setting',
  data() {
    let carrierAccess = this.setting.carrier_access
    return {
      settingValueClone : this.setting.overridden ? this.setting.overridden.value : this.setting.default,
      readonly: carrierAccess === 'R' || carrierAccess === 'N'
    }
  },
  computed: {
    settingValue: {
      get () {
        let val = this.setting.overridden ? this.setting.overridden.value : this.setting.default

        let stype = this.setting.stype
        if (stype === 'BLN') {
          if (val === 'true') {
            return true
          } else {
            return false
          }
        } else if (stype === 'INT') {
          return parseInt(val)
        }
        return this.setting.default
      },
      set (value) {
        let payload = {
          setting: this.setting,
          newValue: value.toString(),
          oldValue: this.settingValue.toString(),
        }
        this.updateSingleSetting(payload)
      },
    },
  },
  methods: {
    ...mapMutations('settings', ['updateSingleSetting']),
    updateTextSetting(e) {
      let value = e.target ? e.target.value : e

      let payload = {
        setting: this.setting,
        newValue: value,
        oldValue: this.settingValueClone,
      }
      this.updateSingleSetting(payload)

      this.settingValueClone = value

    }
  },
}

</script>

<style scoped>

</style>