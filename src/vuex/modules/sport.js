import api from '../../fetch/api'
import * as types from '../types'

const state = {
    sportsList: [],
    searchKey: {
        page: 0,
        limit: 20
    },
    scroll: true
}

const actions = {
    /**
     * 获取约跑步列表
     */
    getSportsList({ commit }) {
        if(state.scroll) {
            commit(types.GET_SPORTS_PAGE_NUM)
            commit(types.COM_LOADING_STATUS, true),
            commit(types.GET_SPORTS_SCORLL_STATUS, false)
            api.SportsList()
                .then(res => {
                    console.log(res)
                    commit(types.COM_LOADING_STATUS, false),
                    commit(types.GET_SPORTS_SCORLL_STATUS, true)
                    commit(types.GET_SPORTS_LIST, res)
                })
        }
    }
}

const getters = {
    sportsList: state => state.sportsList
}

const mutations = {
    [types.GET_SPORTS_LIST](state, res) {
        if(state.searchKey.page <= 1) {
            state.sportsList = res.data
        } else {
            state.sportsList = state.sportsList.concat(res.data)
        }
    },
    [types.GET_SPORTS_SEARCH_KEY](state, params) {
        state.searchKey = params
    },
    [types.GET_SPORTS_PAGE_NUM](state) {
        state.searchKey['page'] += 1
    },
    [types.GET_SPORTS_SCORLL_STATUS](state, status) {
        state.scroll = status
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}