import {getApp} from '../main'
let initSpinnerState = false
export { initSpinnerState }

export function HideSpinner (vueInstance) {
  SetSpinnerState(false, vueInstance)
}

export function ShowSpinner (vueInstance) {
  SetSpinnerState(true, vueInstance)
}

export function SetSpinnerState (show, vueInstance) {
  if (vueInstance) {
    _setSpinnerState(show, vueInstance)  // nice way to do
  } else { // ok we can play dirty then
    try {
      _setSpinnerState(show, getApp())
    } catch (err) {
      console.log('cannot enable via vm, using init value instead')
      initSpinnerState = show
    }
  }
  function _setSpinnerState (newValue, vueInstance) {
    vueInstance.$root.$children[0].$data.show_loading = newValue
  }
}
