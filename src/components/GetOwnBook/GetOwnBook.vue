<!-- 管理员查看图书库存 -->
<template>
  <div>
    <el-input class="searchInput" v-model="searchedBook" auto-complete="off" placeholder="请输入图书名称以检索信息" @keyup.enter.native="handleSearchBook"></el-input>
    <el-table
      :data="tableData"
      style="width: 100%;height: 100%"
      stripe
      >
      <el-table-column
        label="编号"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图书名称"
        width="250"
        align="center">
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
        width="250"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.bookDate ? scope.row.bookDate.slice(0, 10) : scope.row.bookDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="库存量"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="销售价格"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            :disabled="scope.row.price!==0"
            @click="handleChangePrice(scope.$index, scope.row)">修改售价</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item prop="bookName">
          <el-tag size="middle" type="success">{{ form.bookName }}</el-tag>
        </el-form-item>
        <el-form-item prop="price">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" :min="0" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item>
          <span>（请注意：售价仅可修改一次）</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      searchedBook: '',
      dialogFormVisible: false,
      dialogFormTitle: '',
      form: {
        bookId: '',
        price: '0',
        bookName: '',
        count: '0'
      },
      rules: {
        price: [
          {required: true, message: '请输入正确的价格', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.$http.get('/api/book/getBooks')
      .then((res) => {
        this.tableData = res.data
      })
  },
  methods: {
    handleSearchBook () {
      this.$http.get('/api/book/getBooks?bookName=' + this.searchedBook)
        .then((res) => {
          this.tableData = res.data
        })
    },
    handleChangePrice (index, row) {
      this.dialogFormTitle = '修改图书售价'
      this.dialogFormVisible = true
      this.form.bookId = row.bookId
      this.form.bookName = row.bookName
      this.form.price = row.price
    },
    cancel () {
      this.dialogFormVisible = false
    },
    confirm () {
      var that = this
      that.$http.post('/api/book/changePrice', {
        bookId: that.form.bookId,
        price: that.form.price
      }).then((res) => {
        if (res.status === 200 && res.data.status !== false) {
          that.$http.get('/api/book/getBooks')
            .then((res) => {
              that.tableData = res.data
              that.dialogFormVisible = false
              that.$message({
                type: 'success',
                message: '更新成功'
              })
            })
        } else {
          that.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .searchInput{
    position: fixed;
    top: 70px;
    left: 0px;
    width: 100%;
    margin: 0px 10px;
  }

  .el-table{
    margin-top: 45px;
  }
</style>
