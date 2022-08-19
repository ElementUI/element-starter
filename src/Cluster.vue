<template>
  <div id='app'>
    <title>Cluster Table</title>

    <div>
        <!-- searchable header -->
        <p class="inline_item" > select a cell:</p>
        <el-select class="inline_item" v-model='currentCell' filterable placeholder="" @change="selectCell">
        </el-select>
        <p class="inline_item" > search:</p>
        <el-input  class="inline_item" style='width:150px;' placeholder="Cell ID"></el-input>
        <!-- searchable header end -->

        <!-- cluster table content -->
        <el-table ref="clusterTable" class="table" 
        :show-header='true' 
        @row-click='handleRow' 
        row-key='Cel_ID'
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
            <el-table-column prop='Cell ID' label='Cell ID'></el-table-column>
            <el-table-column prop='nUMI' label='nUMI'></el-table-column>
            <el-table-column prop='nGene' label='nGene'></el-table-column>
            <el-table-column prop='Section' label='Section'></el-table-column>
            <el-table-column prop='FACS_Gate' label='FACS_Gate'></el-table-column>
            <el-table-column prop='Cluster number' label='Cluster number'></el-table-column>
            <el-table-column prop='Cluster ID' label='Cluster ID'></el-table-column>
            <el-table-column prop='Major cluster description' label='Major cluster description'></el-table-column>
            <el-table-column prop='Subcluster Number' label='Subcluster Number'></el-table-column>
            <el-table-column prop='Subcluster ID' label='Subcluster ID'></el-table-column>
        </el-table>
        <el-pagination 
            layout="total,sizes, prev, jumper, next"
            :total="this.tableData.length"
            :current-page="currentPage"
            @current-change="handleCurrentChange" 
            @size-change="handleSizeChange"
            :page-sizes="[10,15,20]" 
            :page-size="pageSize" 
            :current-page.sync="currentPage">
        </el-pagination>
        <!-- cluster table content -->
    </div>


  </div>
</template>

<script>
    import $ from 'jquery';

    // datasets
    var CLUSTER_DATA_URL = "http://49.235.68.146/cluster_data/18_Reddien_Science_SI.s1.json"


    export default {
        data(){
            return {
                currentCell: null,
                tableData: [],
                pageSize:15,
                currentPage:1,
            }; // end of data return
        },
        methods: {
            handleCurrentChange (currentpage){
                this.currentPage = currentpage;
            },
            handleSizeChange (size) {
                this.pageSize = size;
            },
            getRowKey(row){
                return row.Cell_ID
            },
            handleRow(row, event, column){
                console.log(row.nUMI);
                console.log(row);
                console.log(column);
            },
            selectCell(item){
                this.currentCell = '';
            }
        },
        beforeMount(){
            console.log('before mount');
            console.log(CLUSTER_DATA_URL);
            var self = this;
            $.getJSON(CLUSTER_DATA_URL, function(_data){
                self.tableData = _data;
                console.log(self.tableData);
            });
        },
    };
</script>

<style>
.inline_item {
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
}
</style>
