import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import querystring from 'querystring'
Vue.use(VueAxios, axios)
// jsdoc fetch -d docs
// axios 配置 axios.defaults.timeout =
// 5000;//指定请求超时之前的毫秒数,如果请求的时间超过'timeout'，请求将被中止。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';

//POST传参序列化
axios
    .interceptors
    .request
    .use((config) => {
        console.log(config)
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
    if (method === 'get') {
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
    } else if (method === 'post') {
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
    } else if (method === ':id') {
        return new Promise((resolve, reject) => {
            axios
                .get(url + '/' + params.id)
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
    // 主题
    /**
     * @description 主题首页 接收 get 参数
     * @method topics
     * @param {obj} params - 请求的参数.
     * @param {Number} page - 页数
     * @param {String} tab - 主题分类,目前有 ask share job good
     * @param {Number} limit - 每一页的主题数量
     * @param {String} drender - 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
     */
    topics(params) {
        return fetch('get', '/topics', params)
    },

    /**
     * @description 主题详情 接收 get 参数
     * @method topics
     * @param {obj} params - 请求的参数.
     * @p* @param {String} mdrender - 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
     * @p* @param {String} accesstoken - 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
     */
    topicDetail(params) {
        return fetch(':id','/topic', params)
    },

    /**
     * @description 新建主题 接收 post 参数
     * @method addTopic
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @param {String} tab - 开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
     * @param {Number} title  - 标题
     * @param {String} content - 主体内容
     * @example
        return {success: true, topic_id: '5433d5e4e737cbe96dcef312'}
     */
    addTopic(params) {
        return fetch('post', '/topics', params)
    },

    /**
     * @description 编辑主题 接收 post 参数
     * @method updateTopic
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @param {String} topic_id - 主题id
     * @param {String} tab - 开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
     * @param {String} title  - 标题
     * @param {String} content - 主体内容
     * @example /api/v1/topic/5433d5e4e737cbe96dcef312
     */
    updateTopic(params) {
        return fetch('post', '/topics/update', params)
    },

    // 主题收藏
    /**
     * @description 收藏主题 接收 post 参数
     * @method collectTopic
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @param {String} topic_id - 主题id
     * @example
        return {"success": true}
     */
    collectTopic(params) {
        return fetch('post', '/topic_collect/collect', params)
    },

    /**
     * @description 取消主题 接收 post 参数
     * @method deCollectTopic
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @param {String} topic_id - 主题id
     * @example
        return {"success": true}
     */
    deCollectTopic(params) {
        return fetch('post', '/topic_collect/de_collect', params)
    },

    /**
     * @description 用户所收藏的主题 接收 post 参数
     * @method gtAllCollectTopic
     * @example /api/v1/topic_collect/alsotang
     */
    gtAllCollectTopic(params) {
        return fetch('get', '/topic_collect/', params)
    },

    // 评论
    /**
     * @description 新建评论 接收 post 参数
     * @method addReplie
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @param {String} content  - 评论的主体
     * @param {String} reply_id  - 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
     * @example
        return {success: true, reply_id: '5433d5e4e737cbe96dcef312'}
     */
    addReplie(params) {
        return fetch('get', '/topic/:topic_id/replies', params)
    },

    /**
     * @description 为评论点赞 接收 post 参数
     * @method upsReplie
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @example
        接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
        return {"success": true, "action": "down"}
     */
    upsReplie(params) {
        return fetch('post', '/topic/:topic_id/replies', params)
    },

    //用户
    /**
     * @description 用户详情 接收 get 参数
     * @method userInfo
     * @example /api/v1/user/alsotang
     */
    userInfo(params) {
        return fetch('get', '/user/:loginname', params)
    },

    /**
     * @description 为评论点赞 接收 post 参数
     * @method checkToken
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @example
        return {success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}
     */
    checkToken(params) {
        return fetch('post', '/topic/:topic_id/replies', params)
    },

    //消息通知
    /**
     * @description 获取未读消息数 接收 get 参数
     * @method messageCount
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @example /api/v1/user/alsotang
     */
    messageCount(params) {
        return fetch('get', '/user/:loginname', params)
    },

    /**
     * @description 获取未读消息数 接收 get 参数
     * @method messageCount
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @param {String} mdrender - String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
     * @example
     * return {
            data: {
                has_read_messages: [],
                hasnot_read_messages: [
                {
                    id: "543fb7abae523bbc80412b26",
                    type: "at",
                    has_read: false,
                    author: {
                    loginname: "alsotang",
                    avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
                    },
                    topic: {
                    id: "542d6ecb9ecb3db94b2b3d0f",
                    title: "adfadfadfasdf",
                    last_reply_at: "2014-10-18T07:47:22.563Z"
                    },
                    reply: {
                    id: "543fb7abae523bbc80412b24",
                    content: "[@alsotang](/user/alsotang) 哈哈",
                    ups: [ ],
                    create_at: "2014-10-16T12:18:51.566Z"
                    }
                    },
                ...
                ]
            }
        }
     */
    messageCount(params) {
        return fetch('get', 'messages', params)
    },

    /**
     * @description 标记全部已读 接收 post 参数
     * @method checkToken
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @example
        return { success: true, marked_msgs: [ { id: '544ce385aeaeb5931556c6f9' } ] }
     */
    markAll(params) {
        return fetch('post', '/message/mark_all', params)
    },

    /**
     * @description 标记全部已读 接收 post 参数
     * @method markSignle
     * @param {obj} params - 请求的参数.
     * @param {String} accesstoken - 用户的 accessToken
     * @example
     *   return  { success: true,marked_msg_id: "58ec7d39da8344a81eee0c14" }
     */
    markSignle(params) {
        return fetch('post', '/message/mark_one/:msg_id', params)
    }
}
