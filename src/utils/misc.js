import router from '@/router'
import _ from 'lodash'

function isCurrentPageVisible (component) {
  let myId = component._uid
  let currentMatchedComponent = router.currentRoute.matched[0].instances.default
  function isChildOf (component) {
    if (component._uid === myId) {
      return true
    }
    return _.some(component.$children, isChildOf)
  }
  return isChildOf(currentMatchedComponent)
}

export {isCurrentPageVisible}
