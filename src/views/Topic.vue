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
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="form.desc" rows=10></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-col>
        <side></side>
    </el-row>
</template>
<script>

import fetch from '../fetch' // 加载axios配置
import Side from '../components/Side'
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
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
