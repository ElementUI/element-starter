<template>
    <el-col :span="8">
        <el-card class="box-card" style="margin-top:20px;">
            <div>
                <img :src="this.user.avatar_url" class="image" style="width:30%">
                <div v-if="!this.user.name">
                    <p>CNode：Node.js专业中文社区</p>
                    <p>您可以 登录 或 注册 , 也可以</p>
                    <el-button type="primary" v-on:click='login'>通过Github登录</el-button>
                </div>
                <div v-else>
                    <span>{{ this.user.name }}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ this.user.created_at }}</time>
                        <el-button type="text" class="button">个人主页</el-button>
                        <div>
                            <router-link :to="{ name: 'topic'}">
                                <el-button type="primary">
                                    发布话题
                                </el-button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin-top:20px;">
            <div>
                <img src="~assets/images/banner1.png" style="max-width:100%;">
                <img src="~assets/images/banner2.png" style="max-width:100%;">
                <img src="~assets/images/banner3.png" style="max-width:100%;">
                <img src="~assets/images/banner4.png" style="max-width:100%;">
            </div>
        </el-card>
        <el-card class="box-card" style="margin-top:20px;">
            <div>
                <img src="~assets/images/golangtc-logo.png" style="max-width:70%;">
                <img src="~assets/images/TesterHome-logo.png" style="max-width:70%;">
                <img src="~assets/images/phphub-logo.png" style="max-width:70%;">
                <img src="~assets/images/ruby-logo.png" style="max-width:70%;">
            </div>
        </el-card>
    </el-col>
</template>
<script>
var UUID = require('uuid');
export default {
    data() {
        return {
            msg: 'I am Demo.vue',
            state: UUID.v1(),
            user: {
                avatar_url: undefined,
                bio: undefined,
                blog: undefined,
                company: undefined,
                created_at: undefined,
                email: undefined,
                events_url: undefined,
                followers: undefined,
                followers_url: undefined,
                following: undefined,
                following_url: undefined,
                gists_url: undefined,
                gravatar_id: undefined,
                hireable: undefined,
                html_url: undefined,
                id: undefined,
                location: undefined,
                login: undefined,
                name: undefined,
                organizations_url: undefined,
                public_gists: undefined,
                public_repos: undefined,
                received_events_url: undefined,
                repos_url: undefined,
                site_admin: undefined,
                starred_url: undefined,
                subscriptions_url: undefined,
                type: undefined,
                updated_at: undefined,
                url: undefined,
            }
        }
    },
    methods: {
        login() {
            window.location.href = "http://github.com/login/oauth/authorize?client_id=9846fbab6bf76400ef5c&redirect_uri=http://localhost:3000&state=" + this.state;
        }
    },
    props: [],
    computed: {
    },
    components: {
    },

    // 生命周期
    beforeCreate() {
        if (this.$route.query.accessToken !== undefined) {
            window.sessionStorage.setItem("accessToken", this.$route.query.accessToken);
        }
        if (this.$route.query.accessToken) {
            this.axios.get('https://api.github.com/user?access_token=' + this.$route.query.accessToken)
                .then(function (res) {
                    console.log(res.data);
                    this.user = res.data
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
        // 配置数据观测（编译模版前）的工作
    },
    created() {
    },
    beforeMount() {
        // 挂载实例到DOM之前的工作
    },
    mounted() {
        // 挂载实例到DOM之后的工作
        // 挂载实例到DOM之后的工作
    },
    beforeUpdate() {
        // 在数据变化时前的工作 
    },
    updated() {
        // 在数据变化时后的工作 
    },
    beforeDestroy() {
        // 在销毁前的工作
    },
    destory() {
        // 在销毁后的工作
    }
}
</script>

<style lang="sass" scoped>
</style>
