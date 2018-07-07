<template>
  <div>
    <el-menu
      :default-active="this.$route.path.split('/')[2] ? this.$route.path.split('/')[2] : 'CustomerService'"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="CustomerService">用户服务</el-menu-item>
      <el-menu-item index="GetOwnBook">查看库存</el-menu-item>
      <el-menu-item index="PurchaseBook">进购图书</el-menu-item>
      <el-menu-item index="SalesStatistics">营业额</el-menu-item>
      <el-menu-item index="Logout">退出</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // this.$router.replace({path: '/Dashboard/' + this.selected })
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(this.$route.path)
      if (key === 'Logout') {
        this.$router.replace({path: '/login'})
        this.$http.get('/api/user/logout')
      } else {
        this.$router.push({path: '/Dashboard/' + key})
      }
    }
  }
}
</script>

<style scoped>
  .el-menu{
    width: 100%;
    margin: 0px;
  }
</style>
