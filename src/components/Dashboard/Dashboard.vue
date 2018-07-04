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
      <el-menu-item index="PurchaseBook">购买图书</el-menu-item>
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
  created() {
    if(this.getCookie("admin") == null){
      this.$router.replace({path: '/login'})
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(this.$route.path);
      if(key === "Logout"){
        this.delCookie("admin")
        //console.log(this.getCookie("admin"))
        this.$router.replace({path: '/login'})
        this.$http.get('/api/user/logout');
      }else{
        this.$router.push({path: '/Dashboard/'+key})
      }
    }
  }
}
</script>

<style lang="scss">
  .el-menu{
    width: 100%;
    margin: 0px;
  }
</style>
