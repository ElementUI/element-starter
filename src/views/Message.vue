<template>
    <h1>
        Message
    </h1>
</template>

<script>

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
            this.axios.get('/topics?tab=' + this.tab + '&page=' + this.currentPage + '&mdrender=false&limit=10')
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
</style>
