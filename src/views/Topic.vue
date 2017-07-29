<template>
    <el-row :gutter="20">
        <el-col :span="16">
            <el-card class="box-card" style="margin-top:20px;">
                <div class="grid-content">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="发布区域">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="分享" value="share"></el-option>
                                <el-option label="问答" value="ask"></el-option>
                                <el-option label="招聘" value="job"></el-option>
                                <el-option label="客户端测试" value="dev"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标题字数">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="form.content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="add()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-col>
        <side></side>
    </el-row>
</template>
<script>

import fetch from '../fetch'
import Side from '../components/Side'
export default {
    data() {
        return {
            form: {
                title: '',
                content: '',
                region: 'dev'
            }
        }
    },
    methods: {
        add() {
            fetch.updateTopic({ 
                "accesstoken": "74c3eaf8-ad2c-4931-b565-abc28702af3d", 
                "title": "22", 
                "tab": "dev", 
                "topic_id":'597b6ffa68aa87c774e5ed32',
                "content": "123232312222222222222222222222222" 
                })
                .then(function (res) {
                    console.log(res.data)
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
                }.bind(this))
        },
    },
    props: [],
    computed: {
    },
    components: {
        Side
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
