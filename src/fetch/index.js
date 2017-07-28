import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import querystring from 'querystring'
Vue.use(VueAxios, axios)

// axios 配置 axios.defaults.timeout =
// 5000;//指定请求超时之前的毫秒数,如果请求的时间超过'timeout'，请求将被中止。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';

//POST传参序列化
axios
    .interceptors
    .request
    .use((config) => {
        config.data = querystring.stringify(config.data);
        return config;
    }, (error) => {
        _.toast("错误的传参", 'fail');
        return Promise.reject(error);
    });

//返回状态判断
axios
    .interceptors
    .response
    .use((res) => {
        if (!res.data) {
            return Promise.reject(res);
        }
        return res;
    }, (error) => {
        _.toast("网络异常", 'fail');
        return Promise.reject(error);
    });

/**
 * @description 主题首页 接收 get 参数
 * @method fetch
 * @param {obj} params - 请求的参数.
 * @param {Number} page - 页数
 * @param {String} tab - 主题分类,目前有 ask share job good
 * @param {Number} limit - 每一页的主题数量
 * @paramm {String} drender - 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
 */
export function fetch(method, url, params) {
    if (method == 'get') {
        return new Promise((resolve, reject) => {
            axios
                .get(url + '?' + params)
                .then((response) => {
                    resolve(response.data);
                }, (err) => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else if (method == 'post') {
        return new Promise((resolve, reject) => {
            axios
                .post(url, params)
                .then((response) => {
                    resolve(response.data);
                }, (err) => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else {
        console.log('fetch error');
    }
}

export default {
    /**
     * @description 主题首页 接收 get 参数
     * @method topics
     * @param {obj} params - 请求的参数.
        - {Number} page - 页数
        - {String} tab - 主题分类,目前有 ask share job good
        - {Number} limit - 每一页的主题数量
        - {String} drender - 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
     */
    topics(params) {
        return fetch('get', '/topics', params)
    },

    /**
     * @description 主题详情 接收 get 参数
     * @method topics
     * @param {obj} params - 请求的参数.
        - {String} mdrender - 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
        - {String} accesstoken - 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
     */
    topicDetail(params) {
        return new Promise((resolve, reject) => {
            axios
                .get('/topic/' + params.id)
                .then((response) => {
                    resolve(response.data);
                }, (err) => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    /**
     * @description 新建主题 接收 post 参数
     * @method addTopic
     * @param {obj} params - 请求的参数.
        - {String} accesstoken - 用户的 accessToken
        - {String} tab - 开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
        - {Number} title  - 标题
        - {String} content - 主体内容
     */
    addTopic(params) {
        return fetch('post', '/topics', params)
    },

    /**
     * 获取约跑步列表
     */
    SportsList() {
        return fetch('/api/sportList')
    },

    /**
     * 获取约出行列表
     */
    TravelsList() {
        return fetch('/api/travelList')
    },

    /**
     * 获取约跑步详情
     */
    SportsDetail(id) {
        return fetch('/api/sportDetail', {sportId: id})
    },

    /**
     * 获取约出行详情
     */
    TravelsDetail(id) {
        return fetch('/api/travelDetail', {travelId: id})
    },

    /**
     * 获取出行活动点击次数
     */
    travelClicks(id) {
        return fetch('/api/travelClickNum', {travelId: id})
    },

    /**
     * 获取用户信息
     */
    UserInfo(id) {
        return fetch('/users/api/userInfo', {userId: id})
    },

    /**
     * 获取用户发布约行个数
     */
    getPubTotravelNum(id) {
        return fetch('/users/api/getPubTotravelNum', {userId: id})
    },

    /**
      * 获取用户自己发布的约行
      */
    getMyTravel(id) {
        return fetch('/users/api/myTravel', {userId: id})
    },

    /**
     * 发布约行活动
     */
    PostTravel(params) {
        return fetch()
    },

    /**
     * 获取全国JSON数据
     */
    getAddressJson() {
        return fetch('/api/address')
    }
}
