<!-- 进货页面 -->
<template>
  <div>
    <div v-for="o in providerInfo" :key="o[0].providerId" class="text item">
      <el-card class="box-card" >
        <div class="clearfix">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ o[0].providerName }}</p>
            <p>住址: {{ o[0].providerAddr }}</p>
            <p>联系方式: {{ o[0].providerPhone }} </p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ o[0].providerName }}</el-tag>
            </div>
          </el-popover>
          <el-table
            :data="o"
            style="width: 100%">
              <el-table-column
                label="书名"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>书名: {{ scope.row.bookName }}</p>
                    <p>出版社: {{ scope.row.bookInfo }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.bookName }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                label="出版日期"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.bookDate ? scope.row.bookDate.slice(0, 10) : scope.row.bookDate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="价格"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.qPrice }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    align="center"
                    @click="handleDelete(scope.$index, scope.row)">购入</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>    
</template>

<script>
  export default {
    data() {
      return {
        providerInfo: []
			}
		},
		created () {
			this.$http.get('/api/book/getProviderInfo').then((res)=>{
        console.log(res.data);
        this.providerInfo = res.data;
			});
		},
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>