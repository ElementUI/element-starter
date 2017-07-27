var express = require('express');
var axios = require('axios');
// axios 配置 axios.defaults.timeout =
// 5000;//指定请求超时之前的毫秒数,如果请求的时间超过'timeout'，请求将被中止。
axios.defaults.headers.post['Accept'] = 'application/json';
var router = express.Router();

// 定义网站主页的路由
router.get('/', function (req, res) {
    var expressRes = res;
    if (req.query.code) {
        axios.post('https://github.com/login/oauth/access_token', {
            client_id: '9846fbab6bf76400ef5c',
            client_secret: '714ae15bdb0080f09596af5e114a6c4e276715b8',
            code: req.query.code,
            state: req.query.state
        })
            .then(function (res) {
                expressRes.redirect('http://localhost:8010/#/index/?accessToken='+res.data.access_token);
            }.bind(this))
            .catch(function (error) {
                console.log("服务器错误")
                if (error.response) {
                    //请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.header);
                } else {
                    //一些错误是在设置请求的时候触发
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }.bind(this));
    }
});
// 定义 about 页面的路由

module.exports = router;