import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import querystring from 'querystring'

// axios 配置
// axios.defaults.timeout = 5000;//指定请求超时之前的毫秒数,如果请求的时间超过'timeout'，请求将被中止。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL =  '/api';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = querystring.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

Vue.use(VueAxios, axios)