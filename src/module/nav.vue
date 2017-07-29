<template>
    <el-row :gutter="20">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary" style="width:100%;" v-on:click="getDoubanData()">全部</el-button>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary" style="width:100%;" v-on:click="getDoubanData('good')">精华</el-button>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary" style="width:100%;" v-on:click="getDoubanData('share')">分享</el-button>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary" style="width:100%;" v-on:click="getDoubanData('ask')">回答</el-button>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary" style="width:100%;" v-on:click="getDoubanData('job')">招聘</el-button>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary" style="width:100%;">主要按钮</el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>

export default {
    data() {
        return {
            msg: 'I am Nav.vue',
            tableData: []
        }
    },
    methods: {
        getDoubanData: function (tab) {
            this.axios.get('/v1/topics?tab' + tab + '&page=5&mdrender=false&limit=10')
                .then(function (res) {
                    console.log(res.data);
                    this.tableData = res.data.data
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
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
