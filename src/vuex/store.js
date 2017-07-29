import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import sport from './modules/sport'
import travel from './modules/travel'
import detail from './modules/detail'
import com from './modules/com'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        sport,
        travel,
        detail,
        com
    }
})