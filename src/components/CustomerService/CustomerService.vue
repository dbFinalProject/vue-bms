<!-- 顾客服务页面 -->
<template>
  <div>
    <el-input class="searchInput" v-model="searchedBook" auto-complete="off" placeholder="请输入图书名称以检索信息" @keyup.enter.native="handleSearchBook"></el-input>
    <el-table
      :data="tableData"
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
        label="价格"
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
            @click="handlePurchase(scope.$index, scope.row)">购买</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleReturn(scope.$index, scope.row)">退购</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item label="顾客姓名" :label-width="formLabelWidth" prop="customerName">
          <el-input v-model="form.customerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书本名称" :label-width="formLabelWidth" prop="bookName">
          <el-input v-model="form.bookName" auto-complete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" prop="count">
          <el-input v-model="form.count" auto-complete="off"></el-input>
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
    const checkCount = (rule, count, callback) => {
      if (new RegExp(/^[1-9]\d*$/).test(count) === true) {
        callback()
      } else if (new RegExp(/^[1-9]\d*.[0-9]\d*$/).test(count) === true) {
        callback(new Error('请输入整数'))
      } else if (count <= 0) {
        callback(new Error('图书数量至少为1'))
      } else {
        callback(new Error('请输入正确的图书数量'))
      }
    }
    return {
      tableData: [],
      searchedBook: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFormTitle: '',
      form: {
        bookId: '',
        customerName: '',
        bookName: '',
        count: 1,
        price: ''
      },
      rules: {
        customerName: [
          {required: true, message: '请输入顾客姓名', trigger: 'blur'}
        ],
        bookName: [
          {required: true, message: '请输入图书名称', trigger: 'blur'}
        ],
        count: [
          {required: true, message: '请输入图书数量', trigger: 'blur'},
          {validator: checkCount, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.$http.get('/api/book/getBooks').then((res) => {
      this.tableData = res.data
    })
  },
  methods: {
    handleSearchBook () {
      this.$http.get('/api/book/getBooks?bookName=' + this.searchedBook).then((res) => {
        this.tableData = res.data
      })
    },
    handlePurchase (index, row) {
      this.dialogFormTitle = '购买图书'
      this.dialogFormVisible = true
      this.form = {
        bookId: row.bookId,
        bookName: row.bookName,
        count: 1,
        price: row.price
      }
    },
    handleReturn (index, row) {
      this.dialogFormTitle = '退购图书'
      this.dialogFormVisible = true
      this.form = {
        bookId: row.bookId,
        bookName: row.bookName,
        count: 1,
        price: row.price
      }
    },
    cancel () {
      this.dialogFormVisible = false
    },
    confirm () {
      var that = this
      // 检验表单
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // post表单信息，进行销售操作或者退货操作
          var url = ''
          var params = {
            'bookId': that.form.bookId,
            'count': that.form.count,
            'customerName': that.form.customerName
          }
          if (that.dialogFormTitle === '购买图书') {
            url = '/api/book/sale'
            params['saleAmount'] = that.form.count * that.form.price
          } else {
            url = '/api/book/return'
            params['returnAmount'] = that.form.count * that.form.price
          }
          // console.log(params)
          that.$http.post(url, params).then((res) => {
            // 销售或退货成功之后进行数据更新
            if (res.status === 200 && res.data.status !== false) {
              that.$http.get('/api/book/getBooks')
                .then((res) => {
                  that.tableData = res.data
                  that.dialogFormVisible = false
                  that.$message({
                    type: 'success',
                    message: this.dialogFormTitle === '购买图书' ? '购买成功' : '退订成功'
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
