<template>
  <div id='app'>
    <title>Cluster Table</title>

    <div>
        <!-- searchable header -->
        <p class="inline_item" > select a cell:</p>
        <el-select class="inline_item" v-model='currentCell' filterable placeholder="" @change="selectCell">
          <el-option>
          </el-option>
        </el-select>
        <p class="inline_item" > search:</p>
        <el-input  class="inline_item" style='width:150px;' placeholder="Cell ID"></el-input>
        <!-- searchable header end -->

        <!-- cluster table content -->
        <el-table ref="clusterTable" :show-header='true' class="table" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
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
        <el-pagination layout="total,sizes, prev, jumper, next">
        </el-pagination>
        <!-- cluster table content -->
    </div>


  </div>
</template>

<script>
    import $ from 'jquery';

    // datasets
    var CLUSTER_DATA_URL = "http://49.235.68.146/cluster_data/data1.json"
    //var CLUSTER_DATA_URL = "http://49.235.68.146/celltype/WT/all_tg_smes_apdv_corrected.json"
    
    export default {
        data(){
            return {
            currentCell: null,
            tableData: [{'Cell ID': 'Cells_Trunk_ATCCTGAAAGTT', 'nUMI': 12290, 'nGene': 4239, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'},
            {'Cell ID': 'Cells_Trunk_ACGGCCAACTTA', 'nUMI': 10982, 'nGene': 3904, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 4, 'Subcluster ID': 'dd_6998+'},
            {'Cell ID': 'Cells_Trunk_TCAAACTCATCC', 'nUMI': 8691, 'nGene': 3457, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'},
{'Cell ID': 'Cells_Trunk_TACATTTACTGT', 'nUMI': 10206, 'nGene': 3886, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'},
{'Cell ID': 'Cells_Trunk_TAACAACGAGAN', 'nUMI': 10331, 'nGene': 3742, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'},
{'Cell ID': 'Cells_Trunk_AGGTTATTCAAT', 'nUMI': 8766, 'nGene': 3129, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'},
{'Cell ID': 'Cells_Trunk_CGGAACCCACTA', 'nUMI': 8623, 'nGene': 3306, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 2, 'Subcluster ID': 2},
{'Cell ID': 'Cells_Trunk_CAGAATCTAGTN', 'nUMI': 6230, 'nGene': 2677, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'},
{'Cell ID': 'Cells_Trunk_CAAAAGCGTAAA', 'nUMI': 6315, 'nGene': 2811, 'Section': 'Trunk', 'FACS_Gate': 'No X1', 'Cluster number': 0, 'Cluster ID': 0, 'Major cluster description': 'Neoblast', 'Subcluster Number': 5, 'Subcluster ID': 'Neural 2'}],
            pageSize:15,
            currentPage:1,
            }; // end of data return
        },
        methods: {
            selectCell(item){
                this.currentGene = '';
            }
        },
        created: function(){
            $.getJSON(CLUSTER_DATA_URL, function(_data){
                console.log('xxxxxxxxx');
                this.tableData = _data;
                console.log(this.tableData);
            });
        },
        beforeMount(){
            console.log('before mount');
            console.log(CLUSTER_DATA_URL);
            $.getJSON(CLUSTER_DATA_URL, function(_data){
                console.log('xxxxxxxxx');
                this.tableData = _data;
                console.log(this.tableData);
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
