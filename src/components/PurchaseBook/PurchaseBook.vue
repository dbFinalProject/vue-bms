<!-- 进货页面 -->
<template>
  <div>
    <div v-for="o in providerInfo" :key="o[0].providerId" class="text item">
      <el-card class="box-card">
        <div class="clearfix">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ o[0].providerName }}</p>
            <p>住址: {{ o[0].providerAddr }}</p>
            <p>联系方式: {{ o[0].providerPhone }} </p>
            <div slot="reference" class="name-wrapper" style="width : 100px; margin: auto">
              <el-tag style="width: 170px; height: 40px; font-size: 25px; line-height: 40px; vertical-align: center">{{ o[0].providerName }}</el-tag>
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
                    @click="handlePurchase(scope.$index, scope.row)">购入</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item label="进购商" :label-width="formLabelWidth" prop="providerName">
          <el-input v-model="form.providerName" auto-complete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="书本名称" :label-width="formLabelWidth" prop="bookName">
          <el-input v-model="form.bookName" auto-complete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="书本单价" :label-width="formLabelWidth" prop="qPrice">
          <el-input v-model="form.qPrice" auto-complete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="进购数量" :label-width="formLabelWidth" prop="count">
          <el-input-number v-model="form.count" :min="1"></el-input-number>
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
      providerInfo: [],
      dialogFormTitle: '进购图书',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        providerName: '',
        bookId: '',
        qPrice: '',
        bookName: '',
        count: ''
      },
      rules: {
        providerName: [
          {required: true, message: '请输入供应商名称', trigger: 'blur'}
        ],
        bookName: [
          {required: true, message: '请输入图书名称', trigger: 'blur'}
        ],
        qbook: [
          {required: true, message: '请输入图书报价', trigger: 'blur'}
        ],
        count: [
          {required: true, message: '请输入图书数量', trigger: 'blur'},
          {validator: checkCount, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.$http.get('/api/book/getProviderInfo').then((res) => {
      this.providerInfo = res.data
      console.log(this.providerInfo)
    })
  },
  methods: {
    handlePurchase (index, row) {
      this.dialogFormVisible = true
      this.form = {
        providerName: row.providerName,
        providerId: row.providerId,
        bookId: row.bookId,
        qPrice: row.qPrice,
        bookName: row.bookName,
        count: 1
      }
    },
    cancel () {
      this.dialogFormVisible = false
      this.form = {
        providerName: '',
        bookId: '',
        qPrice: '',
        bookName: '',
        count: 1
      }
    },
    confirm () {
      this.dialogFormVisible = false
      this.$http.post('/api/book/purchase', {
        providerId: this.form.providerId,
        bookId: this.form.bookId,
        purchaseTime: new Date(),
        purchaseCount: this.form.count,
        purchaseAmount: this.form.count * this.form.qPrice
      }).then(res => {
        this.$router.push('/Dashboard/GetOwnBook')
        this.$message({
          type: res.data.status ? 'success' : 'error',
          message: res.data.message
        })
      })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
    height: 100%;
  }
</style>
