import api from '../../fetch/api'
import * as types from '../types'

const state = {
    travelsList: [],
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
    getTravelsList({ commit }) {
        if(state.scroll) {
            commit(types.GET_TRAVELS_PAGE_NUM)
            commit(types.COM_LOADING_STATUS, true),
            commit(types.GET_TRAVELS_SCORLL_STATUS, false)
            api.TravelsList()
                .then(res => {
                    console.log(res)
                    commit(types.COM_LOADING_STATUS, false),
                    commit(types.GET_TRAVELS_SCORLL_STATUS, true)
                    commit(types.GET_TRAVELS_LIST, res)
                })
        }
    }
}

const getters = {
    travelsList: state => state.travelsList,
    travelListIndex: state => state.travelsList.slice(0,4)
}

const mutations = {
    [types.GET_TRAVELS_LIST](state, res) {
        if(state.searchKey.page <= 1) {
            state.travelsList = res.data
        } else {
            state.travelsList = state.travelsList.concat(res.data)
        }
    },
    [types.GET_TRAVELS_SEARCH_KEY](state, params) {
        state.searchKey = params
    },
    [types.GET_TRAVELS_PAGE_NUM](state) {
        state.searchKey['page'] += 1
    },
    [types.GET_TRAVELS_SCORLL_STATUS](state, status) {
        state.scroll = status
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}