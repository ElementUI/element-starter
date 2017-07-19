<template>
    <div id="app">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>
        Element React 基础组件 Basic Layout 布局 Color 色彩 Typography 字体 Icon 图标 Button 按钮 Form Radio 单选框 Checkbox 多选框 Input 输入框 InputNumber 计数器 Select 选择器 Cascader 级联选择器 Switch 开关 Slider 滑块 TimePicker 时间选择器 DatePicker 日期选择器 DateTimePicker 日期时间选择器 Upload 上传 Rate 评分 ColorPicker 颜色选择器 Transfer 穿梭框 Form 表单 Data Table 表格 Tag 标签 Progress 进度条 Tree 树形控件 Pagination 分页 Badge 标记 Notice Alert 警告 Loading 加载 Message 消息提示 MessageBox 弹框 Notification 通知 Navigation NavMenu 导航菜单 Tabs 标签页 Breadcrumb 面包屑 Dropdown 下拉菜单 Steps 步骤条 Others Dialog 对话框 Tooltip 文字提示 Popover 弹出框 Card 卡片 Carousel 走马灯 Collapse 折叠面板 ¶ Icon 图标 提供了一套常用的图标集合。 ¶ 使用方法 直接通过设置类名为 el-icon-iconName 来使用即可。例如： 搜索 在线运行
        <i class="el-icon-edit"></i>
        <i class="el-icon-share"></i>
        <i class="el-icon-delete"></i>
        <el-button type="primary" icon="search">搜索</el-button>
    </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data() {
        return {
            msg: 'Use Vue 2.0 Today!',
            value1: true,
            value2: true,
            checkboxGroup1: ['上海'],
            checkboxGroup2: ['北京'],
            checkboxGroup3: ['广州'],
            cities: cityOptions,
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },

    methods: {

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
