import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    loading: false,
    showToast: false,
    leftNavStatus: false,
    showSuccess: true,
	showFail: false,
    toastMsg: '操作成功',
    showTimePicker: false,
    alertMsg: '退出登录',
    showAlert: false
}

const actions = {
    setLoadingState({ commit }, status) {
        commit(types.COM_LOADING_STATUS, status)
    },
    setNavState({ commit }, status) {
        commit(types.COM_NAV_STATUS, status)
    },
    showToast({ commit }, status) {
        commit(types.COM_SHOW_TOAST, status)
    },
    showSuccess({ commit }, status) {
        commit(types.COM_SHOW_SUCCESS, status)
    },
    showFail({ commit }, status) {
        commit(types.COM_SHOW_FAIL, status)
    },
    toastMsg({ commit }, str) {
        commit(types.COM_TOAST_MSG, str)
    },
    showAlert({ commit }, status) {
        commit(types.COM_SHOW_ALERT, status)
    },
    alertMsg({ commit }, str) {
        commit(types.COM_ALERT_MSG, str)
    },
    showTimePicker({ commit }, status) {
        commit(types.COM_SHOW_TIME_PICKER, status)
    }

}

const getters = {
    loading: state => state.loading,
    showToast: state => state.showToast,
    showAlert: state => state.showAlert
}


const mutations = {
    [types.COM_LOADING_STATUS](state, status) {
        state.loading = status
    },

    [types.COM_SHOW_TOAST](state, status) {
        state.showToast = status
    },

    [types.COM_SHOW_SUCCESS](state, status) {
        state.showSuccess = status
    },

    [types.COM_SHOW_FAIL](state, status) {
        state.showFail = status
    },

    [types.COM_TOAST_MSG](state, str) {
        state.toastMsg = str
    },

    [types.COM_NAV_STATUS](state, status) {
        state.leftNavStatus = status
    },

    [types.COM_SHOW_TIME_PICKER](state, status) {
        state.showTimePicker = status
    },

    [types.COM_SHOW_ALERT](state, status) {
        state.showAlert = status
    },
    
    [types.COM_ALERT_MSG](state, str) {
        state.alertMsg = str
    },
}


export default {
    state,
    actions,
    getters,
    mutations
}