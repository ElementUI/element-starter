<template>
    <el-row :gutter="20">
        <el-col :span="18" :offset="3">
            <el-row :gutter="20" v-if="detailData">
                <el-col :span="16">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-tag type="primary" v-if="detailData.top">置顶</el-tag>
                            <el-tag type="primary" v-else-if="detailData.good">精华</el-tag>
                            <el-tag type="primary" v-else>{{detailData.tab | getCn}}</el-tag>
                            <span style="line-height: 36px;">{{ detailData.title}}</span>
                            <div>
                                发布于 {{ detailData.create_at.split("T")[0] }} 作者 {{ detailData.author.loginname }} {{ detailData.author.visit_count }} 次浏览 最后一次编辑是 {{ detailData.last_reply_at }} {{ detailData.author.visit_count }} 来自
                                <el-tag type="primary">{{ detailData.tab | getCn}}</el-tag>
                            </div>
                        </div>
                        <div class="grid-content">
                            <div v-html="detailData.content" class="content"></div>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-top:20px;">
                        <div class="grid-content" v-for="(replie,index) in detailData.replies" :key="replie.id">
                            <div>{{index}}楼 {{ replie.author.loginname }}</div>
                            <div><img :src="replie.author.avatar_url" style="idth: 30px;height: 30px;border-radius: 3px;"></div>
                            <div v-html="replie.content"></div>
                            <div style="width:100%;height:1px;background:#ddd;"></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card">
                        <div>
                            <p>CNode：Node.js专业中文社区123</p>
                            <p>您可以 登录 或 注册 , 也可以</p>
                            <el-button type="primary">前往github登录</el-button>
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
export default {
    data() {
        return {
            detailData: undefined
        };
    },

    methods: {

    }
    , props: [],
    computed: {
    },
    components: {
    },

    // 生命周期
    beforeCreate() {
        // 配置数据观测（编译模版前）的工作
    },
    created() {
        this.axios.get('/v1/topic/' + this.$route.query.id)
            .then(function (res) {
                this.detailData = res.data.data;
                console.log(this.detailData)
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
   .content {
       width:100%;
        img {
        max-width: 100%;
        }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    //   开发分支
    border-radius: 7px;
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
