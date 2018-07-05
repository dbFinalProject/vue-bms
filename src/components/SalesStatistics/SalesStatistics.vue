<!-- 数据统计页面  -->
<template>
	<div class="block">
		<el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
			format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
		<el-button icon="el-icon-search" circle></el-button>
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item title="进货记录" name="1">
				<el-table 
					:data="pBookData">
					<el-table-column
						label="进货时间"
						width="180"
						align="center">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
        		  <span style="margin-left: 10px">{{ scope.row.saleTime.slice(0, 10) }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="进货书名"
						width="250"
						align="center">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>书名: {{ scope.row.bookName }}</p>
								<p>出版社: {{ scope.row.bookInfo }}</p>
								<div slot="reference" class="name-wrapper">
									<el-tag size="medium">{{ scope.row.bookInfo }}</el-tag>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column
						label="进货量"
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
						label="进货商"
						width="180"
						align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.bookNum }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-collapse-item>
			<el-collapse-item title="销售记录" name="2">
				<el-table 
					:data="sBookData">
					<el-table-column
						label="销售时间"
						width="180"
						align="center">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.saleTime.slice(0, 10) }}</span>
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
				</el-table>
			</el-collapse-item>
			<el-collapse-item title="营业统计" name="3">
				<el-table 
					:data="statisticsData">
					<el-table-column
						label="进货时间"
						width="180"
						align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.bookId }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="书名"
						width="250"
						align="center">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.bookDate.slice(0, 10) }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="进货量"
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
						label="进货商"
						width="180"
						align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.bookNum }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
			  			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							//  end.setTime(parseInt(end.getTime() / (3600 * 1000 * 24)) * 3600 * 1000 * 24);
							console.log(end.getTime());
							console.log(end.getTime() / (3600 * 1000 * 24));
							console.log((parseInt(end.getTime() / (3600 * 1000 * 24)) * 3600 * 1000 * 24));
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
		},
		value7: '',
		activeNames: []
	  }
	},
	created () {
    this.$http.post('/api/book/getStatistics', {
			startTime: "0000-00-00",
			endTime: "9999-99-99"
		}).then((res)=>{
				this.pBookData = res.data["pBook"]
				this.sBookData = res.data["sBook"]
				this.statisticsData = res.data
    	});
  },
	methods: {
		handleChange(val) {
			console.log(val);
		}
	}
};
</script>
