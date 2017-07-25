<template>
    <el-row :gutter="20">
        <el-col :span="18" :offset="3">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card class="box-card">
                        <div class="grid-content bg-purple">
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                <el-menu-item index="1" v-on:click="handleCurrentTab()">全部</el-menu-item>
                                <el-menu-item index="2" v-on:click="handleCurrentTab('good')">精华</el-menu-item>
                                <el-menu-item index="3" v-on:click="handleCurrentTab('share')">分享</el-menu-item>
                                <el-menu-item index="4" v-on:click="handleCurrentTab('ask')">回答</el-menu-item>
                                <el-menu-item index="5" v-on:click="handleCurrentTab('job')">招聘</el-menu-item>
                            </el-menu>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-top:20px;min-height:700px;">
                        <div class="grid-content bg-purple">
                            <el-table :data="tableData" style="width: 100%" border v-loading="loading" element-loading-text="拼命加载中">
                                <el-table-column label="author" width="85">
                                    <template scope="scope">
                                        <img :src="scope.row.author.avatar_url" style="idth: 30px;height: 30px;border-radius: 3px;">
                                    </template>
                                </el-table-column>
                                <el-table-column label="visit_count">
                                    <template scope="scope">
                                        <el-tag type="primary" v-if="scope.row.top">置顶</el-tag>
                                        <el-tag type="primary" v-else-if="scope.row.good">精华</el-tag>
                                        <el-tag type="primary" v-else>{{scope.row.tab | getCn}}</el-tag>
                                        {{ scope.row.reply_count}}/ {{ scope.row.visit_count }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="title">
                                    <template scope="scope">
                                        {{ scope.row.title }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="time">
                                    <template scope="scope">
                                        {{ scope.row.create_at.split("T")[0] }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="id">
                                    <template scope="scope">
                                        <el-button type="primary" v-on:click="getDetail(scope.row.id)">主题详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block" style="padding-top:20px;">
                                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000" :current-page.sync="currentPage">
                                </el-pagination>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card">
                        <div>
                            <p>CNode：Node.js专业中文社区123</p>
                            <p>您可以 登录 或 注册 , 也可以</p>
                            <el-button type="primary" v-on:click='accessToken'>accesstoken</el-button>
                            <el-button type="primary" v-on:click='buildTopic'>buildTopic</el-button>
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
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    "object|2": {
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
    }
})

console.log(data)

var template = {
    name: 'value1'
}
var data2 = {
    name: 'value2'
}

console.log(Mock.valid(template, data2))
// 输出结果

export default {
    data() {
        return {
            msg: 'I am Demo.vue',
            tableData: [],
            tab: 'good',
            currentPage: 1,
            loading: false,
            activeIndex: '1'
        }
    },
    methods: {
        getDetail: function (id) {
            this.$router.push({ path: 'detail', query: { id: id + '' } })
        },
        getData: function () {
            if (this.tab == null) {
                this.tab = ''
            }
            this.loading = true;
            this.axios.get('/v1/topics?tab=' + this.tab + '&page=' + this.currentPage + '&mdrender=false&limit=10')
                .then(function (res) {
                    setTimeout(() => {
                        this.loading = false;
                        this.tableData = res.data.data;
                    }, 1000);
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
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
        handleCurrentTab(tab) {
            this.currentPage = 1;
            this.tab = tab;
            this.getData();
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        accessToken() {
            this.axios.post('/v1/accesstoken', {
                accesstoken: '74c3eaf8-ad2c-4931-b565-abc28702af3d'
            })
                .then(function (res) {
                    console.log(res)
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

        },
        buildTopic() {
            this.axios.post('/v1//topics', {
                accesstoken: '74c3eaf8-ad2c-4931-b565-abc28702af3d',
                title:'bob huang title',
                tab:'dev',
                content:'test for buildTopic'
            })
                .then(function (res) {
                    console.log(res)
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
    },
    props: [],
    computed: {
    },
    components: {
    },

    // 生命周期
    beforeCreate() {
        // 配置数据观测（编译模版前）的工作
    },
    created() {

    },
    beforeMount() {
        // 挂载实例到DOM之前的工作
    },
    mounted() {
        // 挂载实例到DOM之后的工作
        this.handleCurrentTab()
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
