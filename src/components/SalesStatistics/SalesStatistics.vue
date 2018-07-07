<!-- 数据统计页面  -->
<template>
  <div class="container">
    <div class="top-bar">
      <el-date-picker
        v-model="dateValue"
        type="daterange"
        align="right"
        unlink-panels
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions"
        @change="handleChangeDate">
      </el-date-picker>
      <el-button icon="el-icon-search" circle @click="Search"></el-button>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="销售记录" name="销售记录">
        <el-table
          :data="sBookData" style="margin: auto">
          <el-table-column
            label="销售时间"
            align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.saleTime ? scope.row.saleTime.slice(0, 16).replace('T', ' ') : scope.row.saleTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售书名"
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
            label="销售数量"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.saleCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="顾客名字"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.customerName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="单价"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="总价"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.saleAmount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="退购记录" name="退购记录">
        <el-table
          :data="rBookData">
          <el-table-column
            label="退购时间"
            align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.returnTime ? scope.row.returnTime.slice(0, 16).replace('T', ' ') : scope.row.returnTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="图书名称"
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
            label="退购数量"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.returnCount }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="退购顾客"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.customerName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="单价"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="总价"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.returnAmount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="进货记录" name="进货记录">
        <el-table
          :data="pBookData">
          <el-table-column
            label="进货时间"
            align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.purchaseTime ? scope.row.purchaseTime.slice(0, 16).replace('T', ' ') : scope.row.purchaseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="图书名称"
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
            label="进货数量"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.purchaseCount }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="进货商"
            align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.providerName }}</p>
                <p>住址: {{ scope.row.providerAddr }}</p>
                <p>联系方式: {{ scope.row.providerPhone }} </p>
                <div slot="reference" class="name-wrapper" style="width : 100px; margin: auto">
                  <el-tag>{{ scope.row.providerName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            label="单价"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.qPrice }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="总价"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.purchaseAmount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="营业统计" name="营业统计">
        <el-table
          :data="statisticsData">
          <el-table-column
            label="总支出"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.expense }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="总收入"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.income }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="盈利\亏损"
            align="center">
            <template slot-scope="scope">
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.payoff }}</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>

    <span class="demonstration">销售排行榜</span>
    <el-carousel trigger="click" height="200px">
      <el-carousel-item v-for="(item, index) in rankList" v-if="index<5" :key="item.bookId">
        <el-card class="box-card">
          <div class="clearfix">
            <span>第{{ index+1 }}名</span>
            <el-popover trigger="click" placement="top" style="display: inline-block; float: right; z-index: 2">
                <p>图书编号: {{ item.bookId }}</p>
                <p>出版社: {{ item.bookInfo }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-button style="padding: 3px 0" type="text">详细信息</el-button>
                </div>
            </el-popover>
          </div>
          <div>
            <p>名&nbsp;&nbsp;&nbsp;&nbsp;称：{{ item.bookName }}</p>
            <p>销售量：{{ item.saleCount }}</p>
            <p>销售额：{{ item.saleAmount }}</p>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Date from '../../util/dateFormat'
export default {
  data () {
    return {
      dateValue: [new Date((new Date()).getTime() - 3600 * 1000 * 24 * 6), new Date()],
      pBookData: [],
      sBookData: [],
      rBookData: [],
      statisticsData: [],
      rankList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      activeNames: ['销售记录', '退购记录', '进货记录', '营业统计']
    }
  },
  created () {
    this.$http.post('/api/book/getStatistics', {
      startTime: new Date(this.dateValue[0]).format('yyyy-MM-dd'),
      endTime: new Date(this.dateValue[1]).format('yyyy-MM-dd')
    }).then(res => {
      // console.log(res.data["sBook"])
      this.sBookData = res.data['sBook']
      this.pBookData = res.data['pBook']
      this.rBookData = res.data['rBook']
      // this.statisticsData = res.data['sBook']
      var saleAmount = 0
      var returnAmount = 0
      var purchaseAmount = 0
      for (var index1 in this.sBookData) {
        saleAmount += this.sBookData[index1].saleAmount
      }

      for (var index2 in this.rBookData) {
        returnAmount += this.rBookData[index2].returnAmount
      }

      for (var index3 in this.pBookData) {
        purchaseAmount += this.pBookData[index3].purchaseAmount
      }

      this.statisticsData = [{
        expense: returnAmount + purchaseAmount,
        income: saleAmount,
        payoff: saleAmount - returnAmount - purchaseAmount
      }]
      // console.log(this.statisticsData)
    })

    this.$http.post('/api/book/rankList', {
      startTime: this.dateValue[0],
      endTime: this.dateValue[1]
    }).then(res => {
      this.rankList = res.data
    })
  },
  methods: {
    handleChangeDate (date) {
      // null
    },
    handleChange (val) {
      // null
    },
    Search () {
      if (this.dateValue === null) {
        this.dateValue = [new Date((new Date()).getTime() - 3600 * 1000 * 24 * 6).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')]
      }
      this.$http.post('/api/book/getStatistics', {
        startTime: this.dateValue[0],
        endTime: this.dateValue[1]
      }).then(res => {
        this.sBookData = res.data['sBook']
        this.pBookData = res.data['pBook']
        this.rBookData = res.data['rBook']

        var saleAmount = 0
        var returnAmount = 0
        var purchaseAmount = 0
        for (var index1 in this.sBookData) {
          saleAmount += this.sBookData[index1].saleAmount
        }

        for (var index2 in this.rBookData) {
          returnAmount += this.rBookData[index2].returnAmount
        }

        for (var index3 in this.pBookData) {
          purchaseAmount += this.pBookData[index3].purchaseAmount
        }

        this.statisticsData = [{
          expense: returnAmount + purchaseAmount,
          income: saleAmount,
          payoff: saleAmount - returnAmount - purchaseAmount
        }]
      })

      this.$http.post('/api/book/rankList', {
        startTime: this.dateValue[0],
        endTime: this.dateValue[1]
      }).then(res => {
        this.rankList = res.data
      })
    }
  }
}
</script>

<style>
  .container{
    padding-left: 50px;
    padding-right: 50px;
  }
  .top-bar{
    position: fixed;
    top: 70px;
    width: 100%;
    z-index: 10;
  }
  .el-collapse{
    margin-top: 45px;
  }
  .el-collapse-item{
    width: 80%;
    margin: auto;
  }
  .el-table{
    width: 100%;
  }
  .demonstration{
    width: 80%;
    font-size: 14px;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    vertical-align: center;
  }
  .el-carousel{
    margin: auto;
    width: 550px;
    text-align: left;
  }
  .el-card{
    height: 200px;
    background-color: gainsboro;
  }
</style>
