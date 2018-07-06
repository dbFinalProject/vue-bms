<!-- 进货页面 -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div> -->
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
            <span>{{ scope.row.bookId }}</span>
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
          label="书名"
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
          label="库存量"
          width="180"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bookNum }}</span>
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
    </el-card>
  </div>
</template>
