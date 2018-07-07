<!-- 数据统计页面  -->
<template>
	<div class="container">
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
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item title="销售记录" name="销售记录">
				<el-table 
					:data="sBookData">
					<el-table-column
						label="销售时间"
						width="180"
						align="center">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.saleTime ? scope.row.saleTime.slice(0, 16).replace('T', ' ') : scope.row.saleTime }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="销售书名"
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
						label="销售数量"
						width="250"
						align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.saleCount }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="顾客名字"
						width="180"
						align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.customerName }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="单价"
						width="250"
						align="center">
						<template slot-scope="scope">
        		  <span style="margin-left: 10px">{{ scope.row.price }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="总价"
						width="250"
						align="center">
						<template slot-scope="scope">
        		  <span style="margin-left: 10px">{{ scope.row.saleAmount }}</span>
						</template>
					</el-table-column>

				</el-table>
			</el-collapse-item>

			<el-collapse-item title="进货记录" name="进货记录">
				<el-table 
					:data="pBookData">
					<el-table-column
						label="进货时间"
						width="180"
						align="center">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
        		  <span style="margin-left: 10px">{{ scope.row.purchaseTime ? scope.row.purchaseTime.slice(0, 16).replace('T', ' ') : scope.row.purchaseTime }}</span>
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
						label="进货量"
						width="250"
						align="center">
						<template slot-scope="scope">
        		  <span style="margin-left: 10px">{{ scope.row.purchaseCount }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="进货商"
						width="180"
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
						width="250"
						align="center">
						<template slot-scope="scope">
        		  <span style="margin-left: 10px">{{ scope.row.qPrice }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="总价"
						width="250"
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
						width="180"
						align="center">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.expense }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="总收入"
						width="250"
						align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.income }}</span>
						</template>
					</el-table-column>
					
					<el-table-column
						label="盈利\亏损"
						width="250"
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
	</div>
</template>

<script>
	import Date from '../../util/dateFormat'
  export default {
    data() {
      return {
				dateValue: [new Date((new Date()).getTime() - 3600 * 1000 * 24 * 6), new Date()],
      	pBookData: [],
      	sBookData: [],
      	statisticsData: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
			  			start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
				},
				activeNames: ['销售记录', '进货记录', '营业统计']
			}
		},
		created () {
			this.$http.post('/api/book/getStatistics', {
				startTime: new Date(this.dateValue[0]).format('yyyy-MM-dd'),
				endTime: new Date(this.dateValue[1]).format('yyyy-MM-dd')
			}).then((res)=>{
				console.log(res.data["sBook"])
				this.sBookData = res.data["sBook"]
				this.pBookData = res.data["pBook"]
				this.statisticsData = res.data['sBook']
			});
		},
		methods: {
			handleChangeDate(date){
				if(date === null)
					date = [new Date((new Date()).getTime() - 3600 * 1000 * 24 * 6).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')]
				this.$http.post('/api/book/getStatistics', {
					startTime: date[0],
					endTime: date[1]
				}).then((res)=>{
					this.sBookData = res.data["sBook"]
					this.pBookData = res.data["pBook"]
					this.statisticsData = res.data['sBook']
				})
			},
			handleChange(val) {
				// null
			},
			Search() {
				// null
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container{
		padding-left: 50px;
		padding-right: 50px;
	}

	.el-date-picker{
		width: 1000px;
	}

	.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
